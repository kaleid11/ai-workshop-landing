import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { prompts } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function getPillarPrompts() {
  // Get Marketing prompts
  const marketingPrompts = await db
    .select()
    .from(prompts)
    .where(eq(prompts.pillarId, 1))
    .limit(100);

  // Get Coding prompts
  const codingPrompts = await db
    .select()
    .from(prompts)
    .where(eq(prompts.pillarId, 2))
    .limit(100);

  // Get Alignment prompts
  const alignmentPrompts = await db
    .select()
    .from(prompts)
    .where(eq(prompts.pillarId, 3))
    .limit(100);

  console.log("=== MARKETING PROMPTS ===");
  console.log(JSON.stringify(marketingPrompts, null, 2));
  console.log("\n=== CODING PROMPTS ===");
  console.log(JSON.stringify(codingPrompts, null, 2));
  console.log("\n=== ALIGNMENT PROMPTS ===");
  console.log(JSON.stringify(alignmentPrompts, null, 2));
}

getPillarPrompts().catch(console.error);
