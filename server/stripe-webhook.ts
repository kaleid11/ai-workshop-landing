import type { Request, Response } from "express";
import Stripe from "stripe";
import { createPurchase, getUserByOpenId } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendWelcomeEmail } from "./email";

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

      console.log("[Stripe Webhook] Session details:", {
        sessionId: session.id,
        userOpenId,
        customerEmail,
        amount: session.amount_total,
        currency: session.currency,
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

      // Create purchase record with 1-month free live access
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

      await createPurchase({
        userId: user.id,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        productId: session.metadata?.product_id || "standard",
        amount: session.amount_total || 0,
        currency: session.currency || "aud",
        status: "completed",
        liveAccessExpiresAt: oneMonthFromNow, // 1 month free live workshop access
      });

      console.log("[Stripe Webhook] Purchase recorded for user:", user.id);

      // Send notification to owner
      await notifyOwner({
        title: "New Workshop Purchase!",
        content: `${customerName || customerEmail} just purchased the workshop for $${((session.amount_total || 0) / 100).toFixed(2)} ${session.currency?.toUpperCase()}`,
      });

      // Send welcome email to customer with portal link
      if (customerEmail) {
        const portalUrl = `${process.env.VITE_APP_URL || "https://aisocialwork-e9rjae3t.manus.space"}/portal`;
        await sendWelcomeEmail(customerEmail, customerName || "there", portalUrl);
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
