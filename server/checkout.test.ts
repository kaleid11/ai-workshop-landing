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
    expect(products.length).toBe(1);
    
    const productKeys = products.map(p => p.productKey);
    expect(productKeys).toContain("standard");

    // Verify product structure
    const standard = products.find(p => p.productKey === "standard");
    expect(standard).toBeDefined();
    expect(standard?.name).toBe("Workshop Access");
    expect(standard?.price).toBe(9700);
    expect(standard?.currency).toBe("aud");
    expect(standard?.features).toBeInstanceOf(Array);
    expect(standard?.features.length).toBeGreaterThan(0);
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
      caller.checkout.createSession({ productId: "standard" })
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
