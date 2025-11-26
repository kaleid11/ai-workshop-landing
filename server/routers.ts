import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { hasWorkshopAccess, getUserPurchase, useAdminToken, generateAdminToken, updateWorkshopReplay, getMembershipTiers, getUserSubscription, getTools, getPrompts, getActivePillars, getAllPurchasesWithUsers, manuallyGrantAccess, createSessionFeedback, getAllSessionFeedback, getAllAssessmentResults } from "./db";
import { z } from "zod";
import Stripe from "stripe";
import { academyRouter as academyToolsRouter } from "./routers/academy";
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

        return { url: session.url || undefined };
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

  onboarding: router({
    getProgress: protectedProcedure.query(async ({ ctx }) => {
      const { getUserOnboarding } = await import("./db");
      const progress = await getUserOnboarding(ctx.user.id);
      return {
        completedItems: progress ? JSON.parse(progress.completedItems) : [],
      };
    }),
    updateProgress: protectedProcedure
      .input(
        z.object({
          completedItems: z.array(z.string()),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { upsertUserOnboarding } = await import("./db");
        await upsertUserOnboarding(ctx.user.id, input.completedItems);
        return { success: true };
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
    getAllSubmissions: protectedProcedure.query(async ({ ctx }) => {
      // Check if user is admin
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }
      const [feedback, assessments] = await Promise.all([
        getAllSessionFeedback(),
        getAllAssessmentResults(),
      ]);
      return { feedback, assessments };
    }),
    getWorkshopAccessRequests: protectedProcedure.query(async ({ ctx }) => {
      // Check if user is admin
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }
      const { getWorkshopAccessRequests } = await import("./db");
      return await getWorkshopAccessRequests();
    }),
    reviewWorkshopRequest: protectedProcedure
      .input(
        z.object({
          requestId: z.number().int().positive(),
          status: z.enum(["approved", "rejected"]),
          adminNotes: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Check if user is admin
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        const { reviewWorkshopRequest } = await import("./db");
        return await reviewWorkshopRequest(
          input.requestId,
          input.status,
          ctx.user.id,
          input.adminNotes
        );
      }),
    exportWorkshopAttendees: protectedProcedure
      .input(
        z.object({
          workshopId: z.number().int().positive(),
        })
      )
      .query(async ({ input, ctx }) => {
        // Check if user is admin
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        const { exportWorkshopAttendees } = await import("./db");
        return await exportWorkshopAttendees(input.workshopId);
      }),
    
    // New workshop management procedures
    getAllWorkshops: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }
      const { getAllWorkshops } = await import("./db");
      return await getAllWorkshops();
    }),
    
    createWorkshop: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          pillarId: z.number().int().positive(),
          scheduledAt: z.string().datetime(),
          durationMinutes: z.number().int().positive(),
          maxAttendees: z.number().int().positive().optional(),
          sessionType: z.enum(["lite", "pro"]).default("lite"),
          googleMeetUrl: z.string().url().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        const { createWorkshop } = await import("./db");
        return await createWorkshop(input);
      }),
    
    updateWorkshop: protectedProcedure
      .input(
        z.object({
          id: z.number().int().positive(),
          title: z.string().min(1).optional(),
          description: z.string().optional(),
          pillarId: z.number().int().positive().optional(),
          scheduledAt: z.string().datetime().optional(),
          durationMinutes: z.number().int().positive().optional(),
          maxAttendees: z.number().int().positive().optional(),
          sessionType: z.enum(["lite", "pro"]).optional(),
          googleMeetUrl: z.string().url().optional(),
          status: z.enum(["scheduled", "completed", "cancelled"]).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        const { updateWorkshop } = await import("./db");
        return await updateWorkshop(input);
      }),
    
    deleteWorkshop: protectedProcedure
      .input(
        z.object({
          id: z.number().int().positive(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        const { deleteWorkshop } = await import("./db");
        return await deleteWorkshop(input.id);
      }),
    
    getWorkshopAttendees: protectedProcedure
      .input(
        z.object({
          workshopId: z.number().int().positive(),
        })
      )
      .query(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        const { getWorkshopAttendees } = await import("./db");
        return await getWorkshopAttendees(input.workshopId);
      }),
  }),

  feedback: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          company: z.string().optional(),
          currentChallenges: z.string().min(1),
          topicsInterested: z.string().min(1),
          preferredFormat: z.enum(["live", "recorded", "both"]),
          additionalComments: z.string().optional(),
          source: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createSessionFeedback(input);
        return { success: true };
      }),
  }),

  // Academy router for membership tiers, tools, prompts, etc.
  academy: router({
    // Academy tools (headshot generator, brand artifacts, etc.)
    tools: academyToolsRouter.tools,
    getTiers: publicProcedure.query(async () => {
      return await getMembershipTiers();
    }),
    getUserSubscription: protectedProcedure.query(async ({ ctx }) => {
      return await getUserSubscription(ctx.user.id);
    }),
    createCheckoutSession: protectedProcedure
      .input(
        z.object({
          tierSlug: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const origin = ctx.req.headers.origin || "http://localhost:3000";
        const tiers = await getMembershipTiers();
        const tier = tiers.find((t: any) => t.slug === input.tierSlug);

        if (!tier) {
          throw new Error("Tier not found");
        }

        // Determine which price ID to use (one-time or monthly)
        const isOneTime = (tier.priceOneTime ?? 0) > 0 || (tier.foundingPriceOneTime ?? 0) > 0;
        const priceId = isOneTime ? tier.stripePriceIdOneTime : tier.stripePriceIdMonthly;

        if (!priceId) {
          throw new Error("Stripe price ID not configured for this tier");
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          mode: isOneTime ? "payment" : "subscription",
          success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/pricing`,
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.openId,
          metadata: {
            user_id: ctx.user.id.toString(),
            tier_id: tier.id.toString(),
            tier_slug: tier.slug,
            customer_email: ctx.user.email || "",
            customer_name: ctx.user.name || "",
          },
          allow_promotion_codes: true,
        });

        return { url: session.url || undefined };
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

    // Workshop booking procedures
    getUpcomingWorkshops: protectedProcedure.query(async ({ ctx }) => {
      const { getUpcomingWorkshops, getUserSubscriptionWithTier } = await import("./db");
      
      // Get user's subscription to filter workshops by tier
      const subscription = await getUserSubscriptionWithTier(ctx.user.id);
      const workshops = await getUpcomingWorkshops();
      
      // Filter workshops based on user's tier
      if (!subscription || !subscription.tier) {
        return [];
      }
      
      const tierHierarchy: Record<string, number> = {
        'free': 0,
        'starter': 1,
        'lite': 2,
        'pro': 3,
        'enterprise': 4,
      };
      
      const userTierLevel = tierHierarchy[subscription.tier.slug] || 0;
      
      return workshops.filter((w: any) => {
        const workshopTierLevel = tierHierarchy[w.tierRequired] || 0;
        return userTierLevel >= workshopTierLevel;
      });
    }),

    getUserTokens: protectedProcedure.query(async ({ ctx }) => {
      const { getUserSubscriptionWithTier } = await import("./db");
      const subscription = await getUserSubscriptionWithTier(ctx.user.id);
      
      if (!subscription || !subscription.tier) {
        return {
          tokensRemaining: 0,
          tokensUsed: 0,
          tokensPerMonth: 0,
          lastReset: null,
          nextReset: null,
          isUnlimited: false,
        };
      }
      
      // Calculate next reset date (1 month from last reset)
      const nextReset = new Date(subscription.lastTokenReset);
      nextReset.setMonth(nextReset.getMonth() + 1);
      
      const isUnlimited = subscription.tier.workshopTokensPerMonth === -1;
      
      return {
        tokensRemaining: isUnlimited ? -1 : subscription.workshopTokensRemaining,
        tokensUsed: subscription.workshopTokensUsed,
        tokensPerMonth: subscription.tier.workshopTokensPerMonth,
        lastReset: subscription.lastTokenReset,
        nextReset,
        isUnlimited,
      };
    }),

    bookWorkshop: protectedProcedure
      .input(
        z.object({
          workshopId: z.number(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { createWorkshopRegistration, getUpcomingWorkshops } = await import("./db");
        
        // Create the registration
        await createWorkshopRegistration(ctx.user.id, input.workshopId);
        
        // Get workshop details for email
        const workshops = await getUpcomingWorkshops();
        const workshop = workshops.find((w: any) => w.id === input.workshopId);
        
        // Send confirmation email with calendar invite
        if (workshop && ctx.user.email) {
          try {
            const { sendWorkshopBookingEmail } = await import("./utils/workshopEmail");
            await sendWorkshopBookingEmail({
              to: ctx.user.email,
              userName: ctx.user.name || "there",
              workshopTitle: workshop.title,
              workshopDescription: workshop.description || "",
              scheduledAt: new Date(workshop.scheduledAt),
              durationMinutes: workshop.durationMinutes,
              googleMeetUrl: workshop.googleMeetUrl || undefined,
            });
          } catch (emailError) {
            console.error("Failed to send booking confirmation email:", emailError);
            // Don't fail the booking if email fails
          }
        }
        
        return { success: true };
      }),

    getUserBookings: protectedProcedure.query(async ({ ctx }) => {
      const { getUserWorkshopRegistrations } = await import("./db");
      return await getUserWorkshopRegistrations(ctx.user.id);
    }),

    cancelBooking: protectedProcedure
      .input(
        z.object({
          registrationId: z.number(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { cancelWorkshopRegistration } = await import("./db");
        await cancelWorkshopRegistration(ctx.user.id, input.registrationId);
        return { success: true };
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

  // Workshops router for workshop calendar and token-based access
  workshops: router({ list: publicProcedure.query(async () => {
      const { getWorkshops } = await import("./db");
      return await getWorkshops();
    }),
    requestAccess: protectedProcedure
      .input(
        z.object({
          workshopId: z.number().int().positive(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { requestWorkshopAccess } = await import("./db");
        return await requestWorkshopAccess(ctx.user.id, input.workshopId);
      }),
    getTokenBalance: protectedProcedure.query(async ({ ctx }) => {
      const { getUserTokenBalance } = await import("./db");
      return await getUserTokenBalance(ctx.user.id);
    }),
  }),

  // Membership router for tier information
  membership: router({
    getUserTier: protectedProcedure.query(async ({ ctx }) => {
      const { getUserMembershipTier } = await import("./db");
      return await getUserMembershipTier(ctx.user.id);
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
