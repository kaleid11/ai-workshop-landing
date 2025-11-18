import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
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

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {
        origin: "https://test.example.com",
      },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("checkout.getProducts", () => {
  it("returns all workshop products", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.checkout.getProducts();

    expect(products).toBeDefined();
    expect(products.length).toBe(3);
    
    const productKeys = products.map(p => p.productKey);
    expect(productKeys).toContain("earlyBird");
    expect(productKeys).toContain("startup");
    expect(productKeys).toContain("referral");

    // Verify product structure
    const earlyBird = products.find(p => p.productKey === "earlyBird");
    expect(earlyBird).toBeDefined();
    expect(earlyBird?.name).toBe("Early Bird Access");
    expect(earlyBird?.price).toBe(9700);
    expect(earlyBird?.currency).toBe("usd");
    expect(earlyBird?.features).toBeInstanceOf(Array);
    expect(earlyBird?.features.length).toBeGreaterThan(0);
  });
});

describe("checkout.createSession", () => {
  it("requires authentication", async () => {
    const unauthCtx: TrpcContext = {
      user: undefined,
      req: {
        protocol: "https",
        headers: { origin: "https://test.example.com" },
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(unauthCtx);

    await expect(
      caller.checkout.createSession({ productId: "earlyBird" })
    ).rejects.toThrow();
  });

  it("validates product ID", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // @ts-expect-error Testing invalid product ID
    await expect(
      caller.checkout.createSession({ productId: "invalid" })
    ).rejects.toThrow();
  });
});
