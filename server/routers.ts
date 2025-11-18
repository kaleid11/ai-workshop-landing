import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import Stripe from "stripe";
import { WORKSHOP_PRODUCTS } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-10-29.clover",
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  checkout: router({
    createSession: protectedProcedure
      .input(
        z.object({
          productId: z.enum(["earlyBird", "startup", "referral"]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const product = WORKSHOP_PRODUCTS[input.productId];
        if (!product) {
          throw new Error("Invalid product ID");
        }

        const origin = ctx.req.headers.origin || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: product.currency,
                product_data: {
                  name: product.name,
                  description: product.description,
                },
                unit_amount: product.price,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/checkout`,
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            user_id: ctx.user.id.toString(),
            customer_email: ctx.user.email || "",
            customer_name: ctx.user.name || "",
            product_id: input.productId,
          },
          allow_promotion_codes: true,
        });

        return { url: session.url };
      }),

    getProducts: publicProcedure.query(() => {
      return Object.entries(WORKSHOP_PRODUCTS).map(([key, product]) => ({
        ...product,
        productKey: key,
      }));
    }),
  }),
});

export type AppRouter = typeof appRouter;
