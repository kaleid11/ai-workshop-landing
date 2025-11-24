import { describe, expect, it } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

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
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Academy Tools", () => {
  it("should generate headshot prompt", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.academy.tools.generateHeadshot({
      style: "professional",
      background: "neutral",
    });

    expect(result).toBeDefined();
    expect(result.prompt).toBeDefined();
    expect(result.prompt.length).toBeGreaterThan(0);
    expect(result.style).toBe("professional");
    expect(result.background).toBe("neutral");
    expect(result.instructions).toContain("Midjourney");
  }, 30000);

  it("should generate brand artifact prompt", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.academy.tools.generateBrandArtifact({
      type: "logo",
      description: "Modern tech startup",
      brandColors: "blue, purple",
      style: "minimalist",
    });

    expect(result).toBeDefined();
    expect(result.prompt).toBeDefined();
    expect(result.prompt.length).toBeGreaterThan(0);
    expect(result.type).toBe("logo");
    expect(result.recommendedDimensions).toContain("1024x1024");
    expect(result.tools).toBeInstanceOf(Array);
    expect(result.tools.length).toBeGreaterThan(0);
  }, 30000);

  it("should repurpose content for Instagram", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.academy.tools.repurposeContent({
      content: "Join our AI workshop to learn automation!",
      platform: "instagram",
      count: 3,
    });

    expect(result).toBeDefined();
    expect(result.variations).toBeInstanceOf(Array);
    expect(result.variations.length).toBeGreaterThan(0);
    expect(result.platform).toBe("instagram");
    expect(result.tips).toContain("hashtags");
    expect(result.originalContent).toBe("Join our AI workshop to learn automation!");
  }, 30000);

  it("should repurpose content for LinkedIn", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.academy.tools.repurposeContent({
      content: "AI is transforming business operations",
      platform: "linkedin",
      count: 2,
    });

    expect(result).toBeDefined();
    expect(result.variations).toBeInstanceOf(Array);
    expect(result.platform).toBe("linkedin");
    expect(result.tips).toContain("Professional");
  }, 30000);
});
