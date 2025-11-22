import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { hasWorkshopAccess, useAdminToken, generateAdminToken, updateWorkshopReplay, getMembershipTiers, getUserSubscription, getTools, getPrompts, getActivePillars } from "./db";
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
          productId: z.enum(["standard"]),
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
              price: product.stripePriceId, // Use live Stripe price ID
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

  portal: router({
    checkAccess: protectedProcedure.query(async ({ ctx }) => {
      const hasAccess = await hasWorkshopAccess(ctx.user.id);
      return {
        hasAccess,
        userId: ctx.user.id,
        userName: ctx.user.name,
        userEmail: ctx.user.email,
      };
    }),
  }),

  admin: router({
    bindToken: protectedProcedure
      .input(
        z.object({
          token: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const success = await useAdminToken(input.token, ctx.user.id);
        if (!success) {
          throw new Error("Invalid or expired token");
        }
        return { success: true };
      }),
    generateToken: protectedProcedure.mutation(async ({ ctx }) => {
      // Check if user is admin
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }
      const token = await generateAdminToken();
      return { token };
    }),
    uploadReplay: protectedProcedure
      .input(
        z.object({
          videoUrl: z.string().url(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Check if user is admin
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        await updateWorkshopReplay(input.videoUrl);
        return { success: true };
      }),
  }),

  // Academy router for membership tiers, tools, prompts, etc.
  academy: router({
    getTiers: publicProcedure.query(async () => {
      return await getMembershipTiers();
    }),
    getUserSubscription: protectedProcedure.query(async ({ ctx }) => {
      return await getUserSubscription(ctx.user.id);
    }),
    getTools: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          pricingModel: z.string().optional(),
          search: z.string().optional(),
          tierRequired: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        return await getTools(input);
      }),
    getPrompts: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          tool: z.string().optional(),
          search: z.string().optional(),
          tierRequired: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        return await getPrompts(input);
      }),
    getPillars: publicProcedure.query(async () => {
      return await getActivePillars();
    }),
  }),
});

export type AppRouter = typeof appRouter;
