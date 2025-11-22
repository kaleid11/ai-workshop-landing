import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { adminTokens, InsertPurchase, InsertUser, purchases, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new purchase record
 */
export async function createPurchase(purchase: InsertPurchase) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create purchase: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(purchases).values(purchase);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create purchase:", error);
    throw error;
  }
}

/**
 * Check if user has purchased workshop access
 */
export async function hasWorkshopAccess(userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot check access: database not available");
    return false;
  }

  const result = await db
    .select()
    .from(purchases)
    .where(eq(purchases.userId, userId))
    .limit(1);

  return result.length > 0 && result[0]?.status === "completed";
}

/**
 * Get user's purchase by session ID
 */
export async function getPurchaseBySessionId(sessionId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get purchase: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(purchases)
    .where(eq(purchases.stripeSessionId, sessionId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new admin token
 */
export async function createAdminToken(token: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create admin token: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(adminTokens).values({ token });
    return result;
  } catch (error) {
    console.error("[Database] Failed to create admin token:", error);
    throw error;
  }
}

/**
 * Verify and use an admin token
 */
export async function useAdminToken(token: string, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot use admin token: database not available");
    return false;
  }

  try {
    // Check if token exists and is unused
    const result = await db
      .select()
      .from(adminTokens)
      .where(eq(adminTokens.token, token))
      .limit(1);

    if (result.length === 0 || result[0]?.used === 1) {
      return false;
    }

    // Mark token as used
    await db
      .update(adminTokens)
      .set({ used: 1, usedBy: userId, usedAt: new Date() })
      .where(eq(adminTokens.token, token));

    // Update user role to admin
    await db
      .update(users)
      .set({ role: "admin" })
      .where(eq(users.id, userId));

    return true;
  } catch (error) {
    console.error("[Database] Failed to use admin token:", error);
    return false;
  }
}

/**
 * Generate a new admin token
 */
export async function generateAdminToken(): Promise<string> {
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  await createAdminToken(token);
  return token;
}

/**
 * Update workshop replay video URL
 * For now, this is a placeholder - in a real implementation, you'd store this in a config table
 */
export async function updateWorkshopReplay(videoUrl: string): Promise<void> {
  // TODO: Store this in a workshop_config table
  // For now, just log it
  console.log("[Workshop] Replay URL updated:", videoUrl);
  // In a real implementation, you'd do:
  // await db.insert(workshopConfig).values({ key: 'replay_url', value: videoUrl })
  //   .onDuplicateKeyUpdate({ set: { value: videoUrl } });
}

// ============================================================================
// Academy Database Queries
// ============================================================================

import { membershipTiers, userSubscriptions, tools, prompts, pillars } from "../drizzle/schema";

/**
 * Get all membership tiers ordered by display order
 */
export async function getMembershipTiers() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get tiers: database not available");
    return [];
  }

  const result = await db
    .select()
    .from(membershipTiers)
    .orderBy(membershipTiers.displayOrder);

  return result;
}

/**
 * Get user's active subscription
 */
export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get subscription: database not available");
    return null;
  }

  const result = await db
    .select({
      subscription: userSubscriptions,
      tier: membershipTiers,
    })
    .from(userSubscriptions)
    .leftJoin(membershipTiers, eq(userSubscriptions.tierId, membershipTiers.id))
    .where(eq(userSubscriptions.userId, userId))
    .orderBy(userSubscriptions.createdAt)
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Get all tools with optional filtering
 */
export async function getTools(filters?: {
  category?: string;
  pricingModel?: string;
  search?: string;
  tierRequired?: string;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get tools: database not available");
    return [];
  }

  let query = db.select().from(tools).where(eq(tools.status, 'approved'));

  // Note: Drizzle doesn't support dynamic where clauses easily, so we'll filter in memory for now
  // In production, you'd want to build the query dynamically
  const result = await query;

  let filtered = result;

  if (filters?.category) {
    filtered = filtered.filter(t => t.category === filters.category);
  }

  if (filters?.pricingModel) {
    filtered = filtered.filter(t => t.pricingModel === filters.pricingModel);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(searchLower) ||
      t.description?.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.tierRequired) {
    filtered = filtered.filter(t => t.tierRequired === filters.tierRequired);
  }

  return filtered;
}

/**
 * Get all prompts with optional filtering
 */
export async function getPrompts(filters?: {
  category?: string;
  tool?: string;
  search?: string;
  tierRequired?: string;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get prompts: database not available");
    return [];
  }

  let query = db.select().from(prompts).where(eq(prompts.status, 'approved'));

  const result = await query;

  let filtered = result;

  if (filters?.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters?.tool) {
    filtered = filtered.filter(p => p.tool === filters.tool);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.tierRequired) {
    filtered = filtered.filter(p => p.tierRequired === filters.tierRequired);
  }

  return filtered;
}

/**
 * Get all active pillars
 */
export async function getActivePillars() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get pillars: database not available");
    return [];
  }

  const result = await db
    .select()
    .from(pillars)
    .where(eq(pillars.status, 'active'))
    .orderBy(pillars.displayOrder);

  return result;
}
