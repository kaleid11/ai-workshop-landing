import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { assessmentResults, InsertAssessmentResult } from "../drizzle/schema";

/**
 * Create a new assessment result
 */
export async function createAssessmentResult(data: InsertAssessmentResult) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(assessmentResults).values(data);
  return { insertId: Number(result[0].insertId) };
}

/**
 * Get assessment result by ID
 */
export async function getAssessmentResult(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const [result] = await db
    .select()
    .from(assessmentResults)
    .where(eq(assessmentResults.id, id))
    .limit(1);

  return result;
}

/**
 * Get all assessment results (for admin)
 */
export async function getAllAssessmentResults() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db
    .select()
    .from(assessmentResults)
    .orderBy(assessmentResults.createdAt);
}

/**
 * Update assessment result flags (email sent, CRM pushed, etc.)
 */
export async function updateAssessmentFlags(
  id: number,
  flags: {
    reportGenerated?: boolean;
    emailSent?: boolean;
    crmPushed?: boolean;
  }
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const updateData: any = {};
  if (flags.reportGenerated !== undefined) {
    updateData.reportGenerated = flags.reportGenerated ? 1 : 0;
  }
  if (flags.emailSent !== undefined) {
    updateData.emailSent = flags.emailSent ? 1 : 0;
  }
  if (flags.crmPushed !== undefined) {
    updateData.crmPushed = flags.crmPushed ? 1 : 0;
  }

  await db
    .update(assessmentResults)
    .set(updateData)
    .where(eq(assessmentResults.id, id));
}
