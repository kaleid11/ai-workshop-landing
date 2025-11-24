import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Workshop purchases table
 * Tracks who has purchased workshop access
 */
export const purchases = mysqlTable("purchases", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).notNull().unique(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  productId: varchar("productId", { length: 64 }).notNull(),
  amount: int("amount").notNull(), // in cents
  currency: varchar("currency", { length: 3 }).notNull(),
  status: mysqlEnum("status", ["pending", "completed", "refunded"]).default("pending").notNull(),
  purchasedAt: timestamp("purchasedAt").defaultNow().notNull(),
  liveAccessExpiresAt: timestamp("liveAccessExpiresAt"), // 1 month free live workshop access
});

export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = typeof purchases.$inferInsert;

/**
 * Admin tokens table
 * One-time use tokens for granting admin access
 */
export const adminTokens = mysqlTable("adminTokens", {
  id: int("id").autoincrement().primaryKey(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  used: int("used").default(0).notNull(), // 0 = unused, 1 = used
  usedBy: int("usedBy"), // userId who used the token
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  usedAt: timestamp("usedAt"),
});

export type AdminToken = typeof adminTokens.$inferSelect;
export type InsertAdminToken = typeof adminTokens.$inferInsert;

/**
 * Membership tiers table
 * Defines the 5 academy tiers with pricing and features
 */
export const membershipTiers = mysqlTable("membershipTiers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique(), // Free, Starter, Lite, Pro, Elite
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  priceMonthly: int("priceMonthly").notNull(), // in cents, 0 for free
  priceAnnual: int("priceAnnual").notNull(), // in cents, 0 for free
  foundingPriceMonthly: int("foundingPriceMonthly"), // founding member discount
  foundingPriceAnnual: int("foundingPriceAnnual"),
  stripePriceIdMonthly: varchar("stripePriceIdMonthly", { length: 255 }),
  stripePriceIdAnnual: varchar("stripePriceIdAnnual", { length: 255 }),
  features: text("features").notNull(), // JSON array of features
  maxWorkshopsPerMonth: int("maxWorkshopsPerMonth").default(0).notNull(),
  forumAccess: int("forumAccess").default(0).notNull(), // 0 = no, 1 = yes
  prioritySupport: int("prioritySupport").default(0).notNull(),
  displayOrder: int("displayOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MembershipTier = typeof membershipTiers.$inferSelect;
export type InsertMembershipTier = typeof membershipTiers.$inferInsert;

/**
 * User subscriptions table
 * Tracks active subscriptions for each user
 */
export const userSubscriptions = mysqlTable("userSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tierId: int("tierId").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }).unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  status: mysqlEnum("status", ["active", "cancelled", "past_due", "trialing"]).default("active").notNull(),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  cancelAtPeriodEnd: int("cancelAtPeriodEnd").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserSubscription = typeof userSubscriptions.$inferSelect;
export type InsertUserSubscription = typeof userSubscriptions.$inferInsert;

/**
 * Pillars table
 * The 5 Vibe Pillars (Marketing, Coding, Alignment, Selling, Engineering)
 */
export const pillars = mysqlTable("pillars", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  description: text("description").notNull(),
  iconUrl: varchar("iconUrl", { length: 255 }),
  status: mysqlEnum("status", ["active", "coming_soon"]).default("active").notNull(),
  launchDate: timestamp("launchDate"),
  displayOrder: int("displayOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Pillar = typeof pillars.$inferSelect;
export type InsertPillar = typeof pillars.$inferInsert;

/**
 * Tools database table
 * Imported from tools.json (1,620 tools)
 */
export const tools = mysqlTable("tools", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }),
  url: varchar("url", { length: 500 }),
  pricingModel: varchar("pricingModel", { length: 64 }), // Free, Freemium, Paid
  features: text("features"), // JSON array
  useCase: text("useCase"),
  tags: text("tags"), // JSON array
  logoUrl: varchar("logoUrl", { length: 500 }),
  status: mysqlEnum("status", ["approved", "pending", "archived"]).default("approved").notNull(),
  tierRequired: mysqlEnum("tierRequired", ["free", "starter", "lite", "pro", "elite"]).default("free").notNull(),
  quickStartGuide: text("quickStartGuide"),
  documentationUrl: varchar("documentationUrl", { length: 500 }),
  g2Url: varchar("g2Url", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Tool = typeof tools.$inferSelect;
export type InsertTool = typeof tools.$inferInsert;

/**
 * Prompts library table
 * Imported from prompts.json (118+ prompts)
 */
export const prompts = mysqlTable("prompts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }), // analysis, marketing, coding, business, creative
  tool: varchar("tool", { length: 64 }), // chatgpt, claude, gemini
  useCase: text("useCase"),
  promptText: text("promptText").notNull(),
  ripeRole: text("ripeRole"),
  ripeInstructions: text("ripeInstructions"),
  ripeParameters: text("ripeParameters"),
  ripeExamples: text("ripeExamples"),
  tags: text("tags"), // JSON array
  status: mysqlEnum("status", ["approved", "pending", "archived"]).default("approved").notNull(),
  tierRequired: mysqlEnum("tierRequired", ["free", "starter", "lite", "pro", "elite"]).default("free").notNull(),
  source: varchar("source", { length: 64 }), // internal, community, github
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  createdBy: int("createdBy"), // userId, nullable
});

export type Prompt = typeof prompts.$inferSelect;
export type InsertPrompt = typeof prompts.$inferInsert;

/**
 * Workshops table
 * Live workshop sessions for Lite, Pro, Elite members
 */
export const workshops = mysqlTable("workshops", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  pillarId: int("pillarId").notNull(),
  tierRequired: mysqlEnum("tierRequired", ["lite", "pro", "elite"]).default("lite").notNull(),
  sessionType: mysqlEnum("sessionType", ["lite", "pro"]).default("lite").notNull(),
  durationMinutes: int("durationMinutes").notNull(),
  scheduledAt: timestamp("scheduledAt").notNull(),
  googleMeetUrl: varchar("googleMeetUrl", { length: 500 }),
  recordingUrl: varchar("recordingUrl", { length: 500 }),
  materialsUrl: varchar("materialsUrl", { length: 500 }),
  maxAttendees: int("maxAttendees"),
  status: mysqlEnum("status", ["scheduled", "completed", "cancelled"]).default("scheduled").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Workshop = typeof workshops.$inferSelect;
export type InsertWorkshop = typeof workshops.$inferInsert;

/**
 * Workshop registrations table
 * Tracks who registered for which workshops
 */
export const workshopRegistrations = mysqlTable("workshopRegistrations", {
  id: int("id").autoincrement().primaryKey(),
  workshopId: int("workshopId").notNull(),
  userId: int("userId").notNull(),
  status: mysqlEnum("status", ["registered", "attended", "no_show"]).default("registered").notNull(),
  registeredAt: timestamp("registeredAt").defaultNow().notNull(),
  attendedAt: timestamp("attendedAt"),
});

export type WorkshopRegistration = typeof workshopRegistrations.$inferSelect;
export type InsertWorkshopRegistration = typeof workshopRegistrations.$inferInsert;

/**
 * Resources table
 * Playbooks, cheatsheets, templates, workflows, videos
 */
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["playbook", "cheatsheet", "template", "workflow", "video"]).notNull(),
  pillarId: int("pillarId"), // nullable, can be general resource
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  tierRequired: mysqlEnum("tierRequired", ["free", "starter", "lite", "pro", "elite"]).default("free").notNull(),
  downloadCount: int("downloadCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

/**
 * Forum posts table
 * Member discussions organized by pillar
 */
export const forumPosts = mysqlTable("forumPosts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  pillarId: int("pillarId"), // nullable, can be general discussion
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  isPinned: int("isPinned").default(0).notNull(),
  isLocked: int("isLocked").default(0).notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = typeof forumPosts.$inferInsert;

/**
 * Forum comments table
 * Replies to forum posts
 */
export const forumComments = mysqlTable("forumComments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumComment = typeof forumComments.$inferSelect;
export type InsertForumComment = typeof forumComments.$inferInsert;

/**
 * Assessment results table
 * Stores quiz and scorecard assessment results for lead generation
 */
export const assessmentResults = mysqlTable("assessmentResults", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  assessmentType: mysqlEnum("assessmentType", ["quick", "full"]).notNull(),
  score: int("score").notNull(),
  answers: text("answers").notNull(), // JSON string of all answers
  recommendations: text("recommendations").notNull(), // JSON array of recommended tools
  reportGenerated: int("reportGenerated").default(0).notNull(), // 0 = no, 1 = yes
  emailSent: int("emailSent").default(0).notNull(), // 0 = no, 1 = yes
  crmPushed: int("crmPushed").default(0).notNull(), // 0 = no, 1 = yes
  source: varchar("source", { length: 100 }), // Where they came from (homepage, quiz page, etc.)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AssessmentResult = typeof assessmentResults.$inferSelect;
export type InsertAssessmentResult = typeof assessmentResults.$inferInsert;
