import { describe, expect, it, beforeEach } from "vitest";
import { upsertUser, getUserByOpenId } from "./db";
import { ENV } from "./_core/env";
import { getDb } from "./db";
import { userSubscriptions, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Admin Auto-Subscription", () => {
  const testAdminOpenId = ENV.ownerOpenId;

  beforeEach(async () => {
    // Clean up test data
    const db = await getDb();
    if (!db) return;

    const existingUser = await db.select().from(users).where(eq(users.openId, testAdminOpenId)).limit(1);
    if (existingUser.length > 0) {
      await db.delete(userSubscriptions).where(eq(userSubscriptions.userId, existingUser[0].id));
      await db.delete(users).where(eq(users.openId, testAdminOpenId));
    }
  });

  it("should set admin role for owner OpenID", async () => {
    await upsertUser({
      openId: testAdminOpenId,
      name: "Test Admin",
      email: "admin@test.com",
      loginMethod: "manus",
    });

    const user = await getUserByOpenId(testAdminOpenId);
    expect(user).toBeDefined();
    expect(user?.role).toBe("admin");
  });

  it("should auto-create Pro subscription for admin", async () => {
    await upsertUser({
      openId: testAdminOpenId,
      name: "Test Admin",
      email: "admin@test.com",
      loginMethod: "manus",
    });

    const user = await getUserByOpenId(testAdminOpenId);
    expect(user).toBeDefined();

    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const subscription = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, user!.id))
      .limit(1);

    expect(subscription.length).toBe(1);
    expect(subscription[0].status).toBe("active");
    expect(subscription[0].workshopTokensRemaining).toBe(999999);
  });

  it("should not create duplicate subscriptions on subsequent logins", async () => {
    // First login
    await upsertUser({
      openId: testAdminOpenId,
      name: "Test Admin",
      email: "admin@test.com",
      loginMethod: "manus",
    });

    // Second login
    await upsertUser({
      openId: testAdminOpenId,
      name: "Test Admin Updated",
      email: "admin@test.com",
      loginMethod: "manus",
    });

    const user = await getUserByOpenId(testAdminOpenId);
    expect(user).toBeDefined();

    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const subscriptions = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, user!.id));

    expect(subscriptions.length).toBe(1); // Should only have one subscription
  });
});
