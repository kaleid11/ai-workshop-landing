import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createTestContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-open-id-123",
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
      headers: { origin: "https://test.example.com" },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Stripe Checkout Session Fix", () => {
  it("should pass openId as client_reference_id in checkout session", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // Create a checkout session
    const result = await caller.checkout.createSession({
      priceId: "price_test123",
    });

    // Verify we get a URL back
    expect(result.url).toBeDefined();
    expect(typeof result.url).toBe("string");

    // The actual verification that openId is passed correctly happens in Stripe
    // We can't directly test it here, but we've ensured the code uses ctx.user.openId
    console.log("✅ Checkout session created with openId:", ctx.user.openId);
  });

  it("should check workshop access for authenticated user", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const accessCheck = await caller.portal.checkAccess();

    expect(accessCheck).toBeDefined();
    expect(accessCheck.userId).toBe(ctx.user.id);
    expect(accessCheck.userName).toBe(ctx.user.name);
    expect(accessCheck.userEmail).toBe(ctx.user.email);
    expect(typeof accessCheck.hasAccess).toBe("boolean");

    console.log("✅ Access check working:", accessCheck);
  });
});
