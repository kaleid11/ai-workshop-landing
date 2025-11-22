import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { membershipTiers } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

async function updateTiers() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  console.log('🔄 Updating membership tier features...\n');

  // Update Starter tier
  await db.update(membershipTiers)
    .set({
      features: JSON.stringify([
        'Access to private Facebook group',
        'Full tools database (1,620 tools)',
        'Full prompts library (118+ prompts)',
        'THL Tool Picker GPT (AI-powered tool recommendations)',
        'Resource library (playbooks, cheatsheets)',
        '20+ workflow templates',
        'Recorded workshop replays (past only)',
        'Monthly Q&A webinar access',
      ])
    })
    .where(eq(membershipTiers.slug, 'starter'));

  // Update Lite tier
  await db.update(membershipTiers)
    .set({
      features: JSON.stringify([
        'Everything in Starter Pass',
        '6 live workshops per month (2 per pillar)',
        'Expanded prompt library (150+ prompts)',
        'Monthly Q&A webinar (small group, 20-30 people)',
        'Monthly office hours',
        'Exclusive tool discounts',
      ])
    })
    .where(eq(membershipTiers.slug, 'lite'));

  // Update Pro tier (remove email support mention)
  await db.update(membershipTiers)
    .set({
      features: JSON.stringify([
        'Everything in Lite Academy',
        '12 live Pro workshops per month (4 per pillar)',
        '1-on-1 strategy call quarterly (30 min)',
        'Custom GPT library (Atlas, Lead Gen GPT)',
        'Private channel with direct instructor access',
        'Weekly co-working sessions',
        'Early access to new tools and features',
      ])
    })
    .where(eq(membershipTiers.slug, 'pro'));

  console.log('✅ Updated Starter, Lite, and Pro tier features\n');

  await connection.end();
}

updateTiers().catch(console.error);
