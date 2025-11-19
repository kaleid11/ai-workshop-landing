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
