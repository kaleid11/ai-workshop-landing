import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { createPurchase, hasWorkshopAccess } from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Portal Access Control", () => {
  it("returns hasAccess false for user without purchase", async () => {
    const ctx = createAuthContext(999999); // User ID that doesn't have a purchase
    const caller = appRouter.createCaller(ctx);

    const result = await caller.portal.checkAccess();

    expect(result.hasAccess).toBe(false);
    expect(result.userId).toBe(999999);
  });

  it("correctly identifies workshop access", async () => {
    // This test verifies the hasWorkshopAccess function works
    const hasAccess = await hasWorkshopAccess(999999);
    expect(hasAccess).toBe(false);
  });
});

describe("Purchase Creation", () => {
  it("can create a purchase record", async () => {
    const testPurchase = {
      userId: 1,
      stripeSessionId: `test_session_${Date.now()}`,
      stripePaymentIntentId: "pi_test_123",
      productId: "standard",
      amount: 9700,
      currency: "aud",
      status: "completed" as const,
    };

    const result = await createPurchase(testPurchase);
    expect(result).toBeDefined();
  });
});
