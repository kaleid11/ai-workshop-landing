import { drizzle } from "drizzle-orm/mysql2";
import { tools, prompts } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function updateTierAccess() {
  console.log("Updating tier access for tools and prompts...");
  
  // Update all tools to require only Starter tier
  await db.update(tools).set({ tierRequired: "starter" });
  console.log("✅ Updated all tools to require Starter tier");
  
  // Update all prompts to require only Starter tier
  await db.update(prompts).set({ tierRequired: "starter" });
  console.log("✅ Updated all prompts to require Starter tier");
  
  console.log("Done!");
  process.exit(0);
}

updateTierAccess().catch((error) => {
  console.error("Error updating tier access:", error);
  process.exit(1);
});
