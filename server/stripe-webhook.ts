import type { Request, Response } from "express";
import Stripe from "stripe";
import { createPurchase, getUserByOpenId } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendWelcomeEmail } from "./email";
import { getDb } from "./db";
import { userSubscriptions, membershipTiers } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-10-29.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Stripe webhook handler for checkout.session.completed events
 * This runs when a customer successfully completes payment
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error("[Stripe Webhook] No signature found");
    return res.status(400).send("No signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("[Stripe Webhook] Processing completed session:", session.id);

    try {
      // Get user info from session metadata
      const userOpenId = session.client_reference_id;
      const customerEmail = session.customer_details?.email || session.metadata?.customer_email;
      const customerName = session.customer_details?.name || session.metadata?.customer_name;
      const tierSlug = session.metadata?.tier_slug;
      const tierId = session.metadata?.tier_id;

      console.log("[Stripe Webhook] Session details:", {
        sessionId: session.id,
        userOpenId,
        customerEmail,
        amount: session.amount_total,
        currency: session.currency,
        mode: session.mode,
        tierSlug,
        tierId,
      });

      if (!userOpenId) {
        console.error("[Stripe Webhook] No user reference in session - client_reference_id is missing");
        return res.status(400).send("No user reference");
      }

      // Find user in database
      const user = await getUserByOpenId(userOpenId);
      if (!user) {
        console.error("[Stripe Webhook] User not found:", userOpenId);
        return res.status(404).send("User not found");
      }

      const db = await getDb();
      if (!db) {
        console.error("[Stripe Webhook] Database not available");
        return res.status(500).send("Database error");
      }

      // Determine if this is a subscription or one-time payment
      const isSubscription = session.mode === "subscription";

      if (isSubscription && tierId) {
        // Handle subscription payment - create userSubscription record
        const tier = await db.select().from(membershipTiers).where(eq(membershipTiers.id, parseInt(tierId))).limit(1);
        
        if (!tier || tier.length === 0) {
          console.error("[Stripe Webhook] Tier not found:", tierId);
          return res.status(404).send("Tier not found");
        }

        const tierData = tier[0];

        // Create user subscription with workshop tokens
        await db.insert(userSubscriptions).values({
          userId: user.id,
          tierId: tierData.id,
          stripeSubscriptionId: session.subscription as string,
          stripeCustomerId: session.customer as string,
          status: "active",
          workshopTokensRemaining: tierData.workshopTokensPerMonth,
          workshopTokensUsed: 0,
          lastTokenReset: new Date(),
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        });

        console.log("[Stripe Webhook] Subscription created for user:", user.id, "Tier:", tierData.name);

        // Send notification to owner
        await notifyOwner({
          title: "New Academy Subscription!",
          content: `${customerName || customerEmail} just subscribed to ${tierData.name} for $${((session.amount_total || 0) / 100).toFixed(2)} ${session.currency?.toUpperCase()}/month`,
        });

      } else {
        // Handle one-time payment (workshop or access pass)
        // Create purchase record with 1-month free live access for workshop tier
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

        await createPurchase({
          userId: user.id,
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent as string,
          productId: tierSlug || session.metadata?.product_id || "standard",
          amount: session.amount_total || 0,
          currency: session.currency || "aud",
          status: "completed",
          liveAccessExpiresAt: tierSlug === "workshop" ? oneMonthFromNow : null,
        });

        // If this is a one-time tier purchase (access_pass or workshop), create subscription record too
        if (tierId) {
          const tier = await db.select().from(membershipTiers).where(eq(membershipTiers.id, parseInt(tierId))).limit(1);
          
          if (tier && tier.length > 0) {
            const tierData = tier[0];
            
            await db.insert(userSubscriptions).values({
              userId: user.id,
              tierId: tierData.id,
              stripeSubscriptionId: null, // One-time purchase, no subscription ID
              stripeCustomerId: session.customer as string || null,
              status: "active",
              workshopTokensRemaining: tierData.workshopTokensPerMonth,
              workshopTokensUsed: 0,
              lastTokenReset: new Date(),
              currentPeriodStart: new Date(),
              currentPeriodEnd: null, // Lifetime access for one-time purchases
            });

            console.log("[Stripe Webhook] One-time purchase subscription created for user:", user.id, "Tier:", tierData.name);
          }
        }

        console.log("[Stripe Webhook] Purchase recorded for user:", user.id);

        // Send notification to owner
        await notifyOwner({
          title: "New Purchase!",
          content: `${customerName || customerEmail} just purchased ${tierSlug || "workshop"} for $${((session.amount_total || 0) / 100).toFixed(2)} ${session.currency?.toUpperCase()}`,
        });
      }

      // Send welcome email to customer with portal link
      if (customerEmail) {
        const portalUrl = `${process.env.VITE_APP_URL || "https://aisocialwork-e9rjae3t.manus.space"}/portal`;
        await sendWelcomeEmail(customerEmail, customerName || "there", portalUrl, user.id);
        console.log("[Stripe Webhook] Welcome email sent to:", customerEmail);
      }

      return res.json({ received: true });
    } catch (error) {
      console.error("[Stripe Webhook] Error processing session:", error);
      return res.status(500).send("Processing error");
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
}
