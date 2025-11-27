import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { getMembershipTiers } from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {
        origin: "https://test.example.com",
      },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Current Checkout Implementation", () => {
  it("should list all membership tiers with price IDs", async () => {
    const tiers = await getMembershipTiers();
    
    console.log("\n=== Membership Tiers ===");
    tiers.forEach((tier: any) => {
      console.log(`\n${tier.name} (${tier.slug}):`);
      console.log(`  Monthly Price ID: ${tier.stripePriceIdMonthly || "NOT SET"}`);
      console.log(`  One-Time Price ID: ${tier.stripePriceIdOneTime || "NOT SET"}`);
      console.log(`  Price Monthly: $${tier.priceMonthly}`);
      console.log(`  Price One-Time: $${tier.priceOneTime}`);
      console.log(`  Founding Price One-Time: $${tier.foundingPriceOneTime || "N/A"}`);
    });

    expect(tiers.length).toBeGreaterThan(0);
  });

  it("should create checkout session for Starter tier", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.academy.createCheckoutSession({
        tierSlug: "starter",
      });

      expect(result).toHaveProperty("url");
      console.log("\n✅ Starter tier checkout: SUCCESS");
      console.log(`   URL: ${result.url?.substring(0, 50)}...`);
    } catch (error: any) {
      console.log("\n❌ Starter tier checkout FAILED:", error.message);
      throw error;
    }
  });

  it("should create checkout session for Lite tier", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.academy.createCheckoutSession({
        tierSlug: "lite",
      });

      expect(result).toHaveProperty("url");
      console.log("\n✅ Lite tier checkout: SUCCESS");
    } catch (error: any) {
      console.log("\n❌ Lite tier checkout FAILED:", error.message);
      throw error;
    }
  });

  it("should create checkout session for Pro tier", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.academy.createCheckoutSession({
        tierSlug: "pro",
      });

      expect(result).toHaveProperty("url");
      console.log("\n✅ Pro tier checkout: SUCCESS");
    } catch (error: any) {
      console.log("\n❌ Pro tier checkout FAILED:", error.message);
      throw error;
    }
  });

  it("should create checkout session for Access Pass", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.academy.createCheckoutSession({
        tierSlug: "access_pass",
      });

      expect(result).toHaveProperty("url");
      console.log("\n✅ Access Pass checkout: SUCCESS");
    } catch (error: any) {
      console.log("\n❌ Access Pass checkout FAILED:", error.message);
      throw error;
    }
  });

  it("should create checkout session for Workshop tier", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.academy.createCheckoutSession({
        tierSlug: "workshop",
      });

      expect(result).toHaveProperty("url");
      console.log("\n✅ Workshop tier checkout: SUCCESS");
    } catch (error: any) {
      console.log("\n❌ Workshop tier checkout FAILED:", error.message);
      throw error;
    }
  });

  it("should create generic checkout session with price ID", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.checkout.createSession({
        priceId: "price_1SWqfaCii5zXCZr60lffDWXy",
      });

      expect(result).toHaveProperty("url");
      console.log("\n✅ Generic checkout (Workshop Credit): SUCCESS");
    } catch (error: any) {
      console.log("\n❌ Generic checkout FAILED:", error.message);
      throw error;
    }
  });
});
