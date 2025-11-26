import { eq, desc, and, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { adminTokens, InsertPurchase, InsertUser, purchases, users, sessionFeedback, InsertSessionFeedback, assessmentResults, userOnboarding, InsertUserOnboarding, workshops, workshopRegistrations, userSubscriptions, membershipTiers, pillars, tools, prompts } from "../drizzle/schema";
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
 * Get user's purchase details including live access expiry
 */
export async function getUserPurchase(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get purchase: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(purchases)
    .where(eq(purchases.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
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


/**
 * Get all purchases with user information (admin only)
 */
export async function getAllPurchasesWithUsers() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get purchases: database not available");
    return [];
  }

  const result = await db
    .select({
      id: purchases.id,
      userId: purchases.userId,
      stripeSessionId: purchases.stripeSessionId,
      stripePaymentIntentId: purchases.stripePaymentIntentId,
      productId: purchases.productId,
      amount: purchases.amount,
      currency: purchases.currency,
      status: purchases.status,
      purchasedAt: purchases.purchasedAt,
      liveAccessExpiresAt: purchases.liveAccessExpiresAt,
      userName: users.name,
      userEmail: users.email,
    })
    .from(purchases)
    .leftJoin(users, eq(purchases.userId, users.id))
    .orderBy(purchases.purchasedAt);

  return result;
}

/**
 * Manually grant workshop access to a user by email (admin only)
 */
export async function manuallyGrantAccess(email: string, amount: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Find user by email
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (userResult.length === 0) {
    throw new Error(`User with email ${email} not found`);
  }

  const user = userResult[0];

  // Check if user already has access
  const existingPurchase = await getUserPurchase(user.id);
  if (existingPurchase) {
    throw new Error(`User ${email} already has workshop access`);
  }

  // Create purchase record with 1-month free live access
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  await createPurchase({
    userId: user.id,
    stripeSessionId: `manual_${Date.now()}_${user.id}`,
    stripePaymentIntentId: `manual_${Date.now()}`,
    productId: "manual_grant",
    amount,
    currency: "aud",
    status: "completed",
    liveAccessExpiresAt: oneMonthFromNow,
  });

  return {
    success: true,
    message: `Workshop access granted to ${email}`,
    userId: user.id,
  };
}

// ============================================================================
// Session Feedback Functions
// ============================================================================

export async function createSessionFeedback(feedback: InsertSessionFeedback) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create session feedback: database not available");
    return null;
  }

  try {
    await db.insert(sessionFeedback).values(feedback);
    return feedback;
  } catch (error) {
    console.error("[Database] Failed to create session feedback:", error);
    throw error;
  }
}

export async function getAllSessionFeedback() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get session feedback: database not available");
    return [];
  }

  try {
    const results = await db.select().from(sessionFeedback).orderBy(desc(sessionFeedback.createdAt));
    return results;
  } catch (error) {
    console.error("[Database] Failed to get session feedback:", error);
    return [];
  }
}

export async function getAllAssessmentResults() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get assessment results: database not available");
    return [];
  }

  try {
    const results = await db.select().from(assessmentResults).orderBy(desc(assessmentResults.createdAt));
    return results;
  } catch (error) {
    console.error("[Database] Failed to get assessment results:", error);
    return [];
  }
}

/**
 * Get user onboarding progress
 */
export async function getUserOnboarding(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user onboarding: database not available");
    return null;
  }

  try {
    const result = await db.select().from(userOnboarding).where(eq(userOnboarding.userId, userId)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get user onboarding:", error);
    return null;
  }
}

/**
 * Upsert user onboarding progress
 */
export async function upsertUserOnboarding(userId: number, completedItems: string[]) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user onboarding: database not available");
    return;
  }

  try {
    const completedItemsJson = JSON.stringify(completedItems);
    
    await db.insert(userOnboarding).values({
      userId,
      completedItems: completedItemsJson,
    }).onDuplicateKeyUpdate({
      set: {
        completedItems: completedItemsJson,
      },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user onboarding:", error);
    throw error;
  }
}

/**
 * Get all workshops ordered by scheduled date
 */
export async function getWorkshops() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get workshops: database not available");
    return [];
  }

  try {
    const { workshops } = await import("../drizzle/schema");
    const result = await db.select().from(workshops).orderBy(workshops.scheduledAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get workshops:", error);
    return [];
  }
}

/**
 * Request workshop access using tokens
 */
export async function requestWorkshopAccess(userId: number, workshopId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { userSubscriptions, workshopAccessRequests } = await import("../drizzle/schema");
    
    // Get user's subscription and token balance
    const subscription = await db.select().from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId))
      .limit(1);
    
    if (!subscription || subscription.length === 0) {
      throw new Error("No active subscription found. Please upgrade to access workshops.");
    }

    const userSub = subscription[0];
    
    // Check if user has tokens
    if (userSub.workshopTokensRemaining <= 0) {
      throw new Error("No workshop tokens remaining. Tokens reset monthly.");
    }

    // Check if user already requested access to this workshop
    const { and } = await import("drizzle-orm");
    const existingRequest = await db.select().from(workshopAccessRequests)
      .where(and(
        eq(workshopAccessRequests.userId, userId),
        eq(workshopAccessRequests.workshopId, workshopId)
      ))
      .limit(1);
    
    if (existingRequest && existingRequest.length > 0) {
      throw new Error("You have already requested access to this workshop.");
    }

    // Create access request
    await db.insert(workshopAccessRequests).values({
      userId,
      workshopId,
      status: "pending",
      tokensUsed: 1,
    });

    // Deduct token
    await db.update(userSubscriptions)
      .set({
        workshopTokensRemaining: userSub.workshopTokensRemaining - 1,
        workshopTokensUsed: userSub.workshopTokensUsed + 1,
      })
      .where(eq(userSubscriptions.userId, userId));

    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to request workshop access:", error);
    throw error;
  }
}

/**
 * Get user's workshop token balance
 */
export async function getUserTokenBalance(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get token balance: database not available");
    return { tokensRemaining: 0, tokensUsed: 0 };
  }

  try {
    const { userSubscriptions } = await import("../drizzle/schema");
    const result = await db.select().from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId))
      .limit(1);
    
    if (!result || result.length === 0) {
      return { tokensRemaining: 0, tokensUsed: 0 };
    }

    return {
      tokensRemaining: result[0].workshopTokensRemaining,
      tokensUsed: result[0].workshopTokensUsed,
    };
  } catch (error) {
    console.error("[Database] Failed to get token balance:", error);
    return { tokensRemaining: 0, tokensUsed: 0 };
  }
}

/**
 * Get user's membership tier with workshop access info
 */
export async function getUserMembershipTier(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get membership tier: database not available");
    return null;
  }

  try {
    const { userSubscriptions, membershipTiers } = await import("../drizzle/schema");
    
    // Get user's active subscription
    const { and } = await import("drizzle-orm");
    const subscription = await db.select().from(userSubscriptions)
      .where(and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, "active")
      ))
      .limit(1);
    
    if (!subscription || subscription.length === 0) {
      return null;
    }

    // Get tier details
    const tier = await db.select().from(membershipTiers)
      .where(eq(membershipTiers.id, subscription[0].tierId))
      .limit(1);
    
    if (!tier || tier.length === 0) {
      return null;
    }

    return tier[0];
  } catch (error) {
    console.error("[Database] Failed to get membership tier:", error);
    return null;
  }
}

/**
 * Get all workshop access requests with user and workshop details
 */
export async function getWorkshopAccessRequests() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get workshop access requests: database not available");
    return [];
  }

  try {
    const { workshopAccessRequests, users, workshops } = await import("../drizzle/schema");
    
    // Get all requests with joins
    const requests = await db
      .select({
        id: workshopAccessRequests.id,
        userId: workshopAccessRequests.userId,
        workshopId: workshopAccessRequests.workshopId,
        status: workshopAccessRequests.status,
        tokensUsed: workshopAccessRequests.tokensUsed,
        requestedAt: workshopAccessRequests.requestedAt,
        reviewedAt: workshopAccessRequests.reviewedAt,
        reviewedBy: workshopAccessRequests.reviewedBy,
        adminNotes: workshopAccessRequests.adminNotes,
        userName: users.name,
        userEmail: users.email,
        workshopTitle: workshops.title,
        workshopScheduledAt: workshops.scheduledAt,
      })
      .from(workshopAccessRequests)
      .leftJoin(users, eq(workshopAccessRequests.userId, users.id))
      .leftJoin(workshops, eq(workshopAccessRequests.workshopId, workshops.id))
      .orderBy(workshopAccessRequests.requestedAt);

    return requests;
  } catch (error) {
    console.error("[Database] Failed to get workshop access requests:", error);
    return [];
  }
}

/**
 * Review a workshop access request (approve or reject)
 */
export async function reviewWorkshopRequest(
  requestId: number,
  status: "approved" | "rejected",
  reviewedBy: number,
  adminNotes?: string
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { workshopAccessRequests } = await import("../drizzle/schema");
    
    await db
      .update(workshopAccessRequests)
      .set({
        status,
        reviewedAt: new Date(),
        reviewedBy,
        adminNotes: adminNotes || null,
      })
      .where(eq(workshopAccessRequests.id, requestId));

    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to review workshop request:", error);
    throw error;
  }
}

/**
 * Export approved attendees for a workshop
 */
export async function exportWorkshopAttendees(workshopId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const { workshopAccessRequests, workshops, users } = await import("../drizzle/schema");
    const { and } = await import("drizzle-orm");
    
    // Get workshop details
    const workshop = await db.select().from(workshops)
      .where(eq(workshops.id, workshopId))
      .limit(1);
    
    if (!workshop || workshop.length === 0) {
      throw new Error("Workshop not found");
    }

    // Get approved attendees
    const attendees = await db
      .select({
        email: users.email,
        name: users.name,
        requestedAt: workshopAccessRequests.requestedAt,
        approvedAt: workshopAccessRequests.reviewedAt,
      })
      .from(workshopAccessRequests)
      .innerJoin(users, eq(workshopAccessRequests.userId, users.id))
      .where(and(
        eq(workshopAccessRequests.workshopId, workshopId),
        eq(workshopAccessRequests.status, "approved")
      ));

    return {
      workshopTitle: workshop[0].title,
      workshopDate: workshop[0].scheduledAt,
      attendees: attendees.map(a => ({
        email: a.email || "No email",
        name: a.name || "No name",
        requestedAt: a.requestedAt,
        approvedAt: a.approvedAt,
      })),
    };
  } catch (error) {
    console.error("[Database] Failed to export workshop attendees:", error);
    throw error;
  }
}

// Workshop-related database helpers
// Note: workshops, workshopRegistrations, userSubscriptions, membershipTiers, pillars need to be imported at top
// Note: and, gte, sql need to be imported at top with eq, desc

/**
 * Get upcoming workshops filtered by minimum tier requirement
 */
export async function getUpcomingWorkshops(minTierSlug?: string) {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  
  const result = await db
    .select({
      workshop: workshops,
      pillar: pillars,
    })
    .from(workshops)
    .leftJoin(pillars, eq(workshops.pillarId, pillars.id))
    .where(
      and(
        gte(workshops.scheduledAt, now),
        eq(workshops.status, "scheduled")
      )
    )
    .orderBy(workshops.scheduledAt);

  return result.map(r => ({
    ...r.workshop,
    pillar: r.pillar,
  }));
}

/**
 * Get user's subscription with tier details and token information
 */
export async function getUserSubscriptionWithTier(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select({
      subscription: userSubscriptions,
      tier: membershipTiers,
    })
    .from(userSubscriptions)
    .leftJoin(membershipTiers, eq(userSubscriptions.tierId, membershipTiers.id))
    .where(
      and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, "active")
      )
    )
    .limit(1);

  if (result.length === 0) return null;

  return {
    ...result[0].subscription,
    tier: result[0].tier,
  };
}

/**
 * Create a workshop registration and deduct token
 */
export async function createWorkshopRegistration(userId: number, workshopId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if user already registered
  const existing = await db
    .select()
    .from(workshopRegistrations)
    .where(
      and(
        eq(workshopRegistrations.userId, userId),
        eq(workshopRegistrations.workshopId, workshopId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Already registered for this workshop");
  }

  // Get user subscription
  const subscription = await getUserSubscriptionWithTier(userId);
  if (!subscription) {
    throw new Error("No active subscription found");
  }

  // Check if user has tokens (unlimited for Pro/Enterprise = -1)
  if (subscription.workshopTokensRemaining === 0 && subscription.tier?.workshopTokensPerMonth !== -1) {
    throw new Error("No workshop tokens remaining");
  }

  // Create registration
  await db.insert(workshopRegistrations).values({
    workshopId,
    userId,
    status: "registered",
  });

  // Deduct token if not unlimited
  if (subscription.tier?.workshopTokensPerMonth !== -1) {
    await db
      .update(userSubscriptions)
      .set({
        workshopTokensRemaining: sql`${userSubscriptions.workshopTokensRemaining} - 1`,
        workshopTokensUsed: sql`${userSubscriptions.workshopTokensUsed} + 1`,
      })
      .where(eq(userSubscriptions.id, subscription.id));
  }

  return true;
}

/**
 * Get user's workshop registrations
 */
export async function getUserWorkshopRegistrations(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select({
      registration: workshopRegistrations,
      workshop: workshops,
      pillar: pillars,
    })
    .from(workshopRegistrations)
    .leftJoin(workshops, eq(workshopRegistrations.workshopId, workshops.id))
    .leftJoin(pillars, eq(workshops.pillarId, pillars.id))
    .where(eq(workshopRegistrations.userId, userId))
    .orderBy(sql`${workshops.scheduledAt} DESC`);

  return result.map(r => ({
    ...r.registration,
    workshop: r.workshop,
    pillar: r.pillar,
  }));
}

/**
 * Cancel workshop registration and refund token
 */
export async function cancelWorkshopRegistration(userId: number, registrationId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Get registration
  const registration = await db
    .select()
    .from(workshopRegistrations)
    .where(
      and(
        eq(workshopRegistrations.id, registrationId),
        eq(workshopRegistrations.userId, userId)
      )
    )
    .limit(1);

  if (registration.length === 0) {
    throw new Error("Registration not found");
  }

  // Delete registration
  await db
    .delete(workshopRegistrations)
    .where(eq(workshopRegistrations.id, registrationId));

  // Refund token
  const subscription = await getUserSubscriptionWithTier(userId);
  if (subscription && subscription.tier?.workshopTokensPerMonth !== -1) {
    await db
      .update(userSubscriptions)
      .set({
        workshopTokensRemaining: sql`${userSubscriptions.workshopTokensRemaining} + 1`,
        workshopTokensUsed: sql`${userSubscriptions.workshopTokensUsed} - 1`,
      })
      .where(eq(userSubscriptions.id, subscription.id));
  }

  return true;
}

/**
 * Reset workshop tokens for a user subscription (called monthly)
 */
export async function resetWorkshopTokens(subscriptionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const subscription = await db
    .select({
      subscription: userSubscriptions,
      tier: membershipTiers,
    })
    .from(userSubscriptions)
    .leftJoin(membershipTiers, eq(userSubscriptions.tierId, membershipTiers.id))
    .where(eq(userSubscriptions.id, subscriptionId))
    .limit(1);

  if (subscription.length === 0) return;

  const tokensPerMonth = subscription[0].tier?.workshopTokensPerMonth || 0;

  await db
    .update(userSubscriptions)
    .set({
      workshopTokensRemaining: tokensPerMonth,
      workshopTokensUsed: 0,
      lastTokenReset: new Date(),
    })
    .where(eq(userSubscriptions.id, subscriptionId));
}
