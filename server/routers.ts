import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { hasWorkshopAccess, getUserPurchase, useAdminToken, generateAdminToken, updateWorkshopReplay, getMembershipTiers, getUserSubscription, getTools, getPrompts, getActivePillars, getAllPurchasesWithUsers, manuallyGrantAccess } from "./db";
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
          priceId: z.string(), // Accept any Stripe price ID
        })
      )
      .mutation(async ({ input, ctx }) => {
        const origin = ctx.req.headers.origin || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price: input.priceId, // Use provided Stripe price ID
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/workshop`,
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.openId, // Pass openId so webhook can find user
          metadata: {
            user_id: ctx.user.id.toString(),
            customer_email: ctx.user.email || "",
            customer_name: ctx.user.name || "",
            price_id: input.priceId,
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
      const purchase = await getUserPurchase(ctx.user.id);
      const hasAccess = purchase?.status === "completed";
      
      return {
        hasAccess,
        userId: ctx.user.id,
        userName: ctx.user.name,
        userEmail: ctx.user.email,
        liveAccessExpiresAt: purchase?.liveAccessExpiresAt || null,
        purchasedAt: purchase?.purchasedAt || null,
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
    getAllPurchases: protectedProcedure.query(async ({ ctx }) => {
      // Check if user is admin
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }
      return await getAllPurchasesWithUsers();
    }),
    grantWorkshopAccess: protectedProcedure
      .input(
        z.object({
          email: z.string().email(),
          amount: z.number().int().positive(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Check if user is admin
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        return await manuallyGrantAccess(input.email, input.amount);
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

  scorecard: router({
    generate: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string(),
          company: z.string(),
          phone: z.string().optional(),
          overallScore: z.number(),
          dimensionScores: z.object({
            technology: z.number(),
            process: z.number(),
            people: z.number(),
            security: z.number(),
            roi: z.number(),
          }),
          readinessLevel: z.string(),
          recommendedPath: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // TODO: Generate PDF scorecard and send via email
        // For now, just log the data and return success
        console.log("[Scorecard] Generated for:", input.email, input.name, input.company);
        console.log("[Scorecard] Overall Score:", input.overallScore);
        console.log("[Scorecard] Readiness Level:", input.readinessLevel);
        console.log("[Scorecard] Recommended Path:", input.recommendedPath);
        
        // TODO: Store in database for lead tracking
        // TODO: Generate PDF using reportlab or similar
        // TODO: Send email with PDF attachment
        
        return {
          success: true,
          message: "Scorecard generated successfully",
        };
      }),
  }),

  // Assessment submission and report generation
  assessment: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          company: z.string().optional(),
          assessmentType: z.enum(["quick", "full"]),
          score: z.number(),
          answers: z.record(z.string(), z.any()),
          recommendations: z.array(z.string()),
          source: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { createAssessmentResult, updateAssessmentFlags } = await import("./assessments");
        const { generateAssessmentPDF } = await import("./pdfReport");
        const { sendAssessmentReport } = await import("./resend");
        const { pushAssessmentLead } = await import("./klipy");

        // Store in database
        const result = await createAssessmentResult({
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          assessmentType: input.assessmentType,
          score: input.score,
          answers: JSON.stringify(input.answers),
          recommendations: JSON.stringify(input.recommendations),
          source: input.source,
        });

        const assessmentId = result.insertId;

        // Generate PDF report
        let pdfBase64 = "";
        try {
          pdfBase64 = await generateAssessmentPDF({
            name: input.name,
            assessmentType: input.assessmentType,
            score: input.score,
            recommendations: input.recommendations,
            answers: input.answers,
          });
          await updateAssessmentFlags(assessmentId, { reportGenerated: true });
        } catch (error) {
          console.error("[Assessment] Failed to generate PDF:", error);
        }

        // Send email with PDF attachment
        try {
          await sendAssessmentReport({
            to: input.email,
            name: input.name,
            assessmentType: input.assessmentType,
            score: input.score,
            pdfBase64,
          });
          await updateAssessmentFlags(assessmentId, { emailSent: true });
        } catch (error) {
          console.error("[Assessment] Failed to send email:", error);
        }

        // Push to Klipy CRM
        try {
          await pushAssessmentLead({
            email: input.email,
            name: input.name,
            phone: input.phone,
            assessmentType: input.assessmentType,
            score: input.score,
            recommendations: input.recommendations,
          });
          await updateAssessmentFlags(assessmentId, { crmPushed: true });
        } catch (error) {
          console.error("[Assessment] Failed to push to CRM:", error);
        }

        return {
          success: true,
          assessmentId,
          pdfBase64, // Return PDF for immediate download
        };
      }),

    // Admin: Get all assessment results
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const { getAllAssessmentResults } = await import("./assessments");
      return getAllAssessmentResults();
    }),
  }),
});

export type AppRouter = typeof appRouter;
