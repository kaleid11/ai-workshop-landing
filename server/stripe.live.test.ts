import { describe, expect, it } from "vitest";
import Stripe from "stripe";

/**
 * Test to validate live Stripe credentials
 * This ensures the live secret key and price ID are correctly configured
 */
describe("Stripe Live Mode", () => {
  it("should successfully initialize Stripe with live credentials", () => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    
    expect(secretKey).toBeDefined();
    expect(secretKey).toMatch(/^sk_live_/);
    
    const stripe = new Stripe(secretKey!, {
      apiVersion: "2025-10-29.clover",
    });
    
    expect(stripe).toBeDefined();
  });

  it("should validate live price ID exists in Stripe", async () => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const stripe = new Stripe(secretKey!, {
      apiVersion: "2025-10-29.clover",
    });

    const livePriceId = "price_1SV19BCii5zXCZr6M8Lln2Se";
    
    // Attempt to retrieve the price to validate it exists
    const price = await stripe.prices.retrieve(livePriceId);
    
    expect(price).toBeDefined();
    expect(price.id).toBe(livePriceId);
    expect(price.currency).toBe("aud");
    expect(price.unit_amount).toBe(9700); // $97 AUD in cents
    expect(price.livemode).toBe(true); // Ensure it's a live mode price
  });

  it("should validate webhook secret is configured", () => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    expect(webhookSecret).toBeDefined();
    expect(webhookSecret).toMatch(/^whsec_/);
  });
});
