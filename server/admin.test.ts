import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
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

  return ctx;
}

function createNonAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
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

  return ctx;
}

describe("admin.generateToken", () => {
  it("allows admin to generate token", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.generateToken();

    expect(result).toHaveProperty("token");
    expect(typeof result.token).toBe("string");
    expect(result.token.length).toBeGreaterThan(0);
  });

  it("prevents non-admin from generating token", async () => {
    const ctx = createNonAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.generateToken()).rejects.toThrow(
      "Unauthorized: Admin access required"
    );
  });
});

describe("admin.uploadReplay", () => {
  it("allows admin to upload replay URL", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.uploadReplay({
      videoUrl: "https://www.youtube.com/watch?v=test123",
    });

    expect(result).toEqual({ success: true });
  });

  it("prevents non-admin from uploading replay", async () => {
    const ctx = createNonAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.uploadReplay({
        videoUrl: "https://www.youtube.com/watch?v=test123",
      })
    ).rejects.toThrow("Unauthorized: Admin access required");
  });

  it("validates video URL format", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.uploadReplay({
        videoUrl: "not-a-valid-url",
      })
    ).rejects.toThrow();
  });
});

describe("admin.bindToken", () => {
  it("successfully binds valid token to user", async () => {
    const ctx = createNonAdminContext();
    const caller = appRouter.createCaller(ctx);

    // First generate a token as admin
    const adminCtx = createAdminContext();
    const adminCaller = appRouter.createCaller(adminCtx);
    const { token } = await adminCaller.admin.generateToken();

    // Then bind it as regular user
    const result = await caller.admin.bindToken({ token });

    expect(result).toEqual({ success: true });
  });

  it("rejects invalid token", async () => {
    const ctx = createNonAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.bindToken({ token: "invalid-token-xyz" })
    ).rejects.toThrow("Invalid or expired token");
  });
});
