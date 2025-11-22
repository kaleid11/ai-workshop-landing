import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { tools, prompts, pillars, membershipTiers } from '../drizzle/schema.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log('🚀 Starting data import...\n');

// Import tools from tools.json
console.log('📦 Importing tools...');
const toolsData = JSON.parse(fs.readFileSync('/home/ubuntu/upload/tools.json', 'utf-8'));
console.log(`Found ${toolsData.length} tools to import`);

let toolsImported = 0;
const toolsBatch = [];

for (const tool of toolsData) {
  // Map tier based on tool complexity/pricing
  let tierRequired = 'free';
  if (tool.pricing_model === 'Paid' || tool.category === 'AI Models') {
    tierRequired = 'starter'; // Paid tools require at least Starter Pass
  }
  
  toolsBatch.push({
    name: tool.name,
    description: tool.description || null,
    category: tool.category || null,
    url: tool.url || null,
    pricingModel: tool.pricing_model || null,
    features: tool.features ? JSON.stringify(tool.features) : null,
    useCase: tool.use_case || null,
    tags: tool.tags ? JSON.stringify(tool.tags) : null,
    logoUrl: tool.logo_url || null,
    status: tool.status || 'approved',
    tierRequired,
    quickStartGuide: tool.quick_start_guide || null,
    documentationUrl: tool.documentation_url || null,
    g2Url: tool.g2_url || null,
  });
  
  toolsImported++;
  
  // Insert in batches of 100
  if (toolsBatch.length >= 100) {
    await db.insert(tools).values(toolsBatch);
    console.log(`  Imported ${toolsImported} tools...`);
    toolsBatch.length = 0;
  }
}

// Insert remaining tools
if (toolsBatch.length > 0) {
  await db.insert(tools).values(toolsBatch);
}

console.log(`✅ Imported ${toolsImported} tools\n`);

// Import prompts from prompts.json
console.log('📝 Importing prompts...');
const promptsData = JSON.parse(fs.readFileSync('/home/ubuntu/upload/prompts.json', 'utf-8'));
console.log(`Found ${promptsData.length} prompts to import`);

let promptsImported = 0;
const promptsBatch = [];

for (const prompt of promptsData) {
  // Map tier based on prompt complexity
  let tierRequired = 'free';
  if (prompt.tags && prompt.tags.includes('atlas')) {
    tierRequired = 'pro'; // Atlas prompts for Pro members
  } else if (prompt.category === 'analysis' || prompt.tags?.includes('4-d')) {
    tierRequired = 'lite'; // Advanced prompts for Lite+
  }
  
  promptsBatch.push({
    title: prompt.title,
    description: prompt.description || null,
    category: prompt.category || null,
    tool: prompt.tool || null,
    useCase: prompt.use_case || null,
    promptText: prompt.prompt_text,
    ripeRole: prompt.ripe_role || null,
    ripeInstructions: prompt.ripe_instructions || null,
    ripeParameters: prompt.ripe_parameters || null,
    ripeExamples: prompt.ripe_examples || null,
    tags: prompt.tags ? JSON.stringify(prompt.tags) : null,
    status: prompt.status || 'approved',
    tierRequired,
    source: prompt.source || 'internal',
    createdBy: null,
  });
  
  promptsImported++;
  
  // Insert in batches of 50
  if (promptsBatch.length >= 50) {
    await db.insert(prompts).values(promptsBatch);
    console.log(`  Imported ${promptsImported} prompts...`);
    promptsBatch.length = 0;
  }
}

// Insert remaining prompts
if (promptsBatch.length > 0) {
  await db.insert(prompts).values(promptsBatch);
}

console.log(`✅ Imported ${promptsImported} prompts\n`);

// Insert 3 pillars (Marketing, Coding, Alignment)
console.log('🎯 Creating pillars...');
await db.insert(pillars).values([
  {
    name: 'Marketing',
    slug: 'marketing',
    description: 'Automate your content, scale your reach. Learn to create posts, videos, and marketing content in minutes using AI tools and proven frameworks.',
    iconUrl: null,
    status: 'active',
    launchDate: new Date('2025-01-13'),
    displayOrder: 1,
  },
  {
    name: 'Coding',
    slug: 'coding',
    description: 'Build apps without code. Use AI coding agents like Manus, Replit, and Lovable to build custom tools and automate workflows.',
    iconUrl: null,
    status: 'active',
    launchDate: new Date('2025-01-13'),
    displayOrder: 2,
  },
  {
    name: 'Alignment',
    slug: 'alignment',
    description: 'Optimize your AI strategy. Choose the right tools, design efficient workflows, and implement AI systems that actually work for your business.',
    iconUrl: null,
    status: 'active',
    launchDate: new Date('2025-01-13'),
    displayOrder: 3,
  },
  {
    name: 'Selling',
    slug: 'selling',
    description: 'Automate your sales process. Build AI-powered lead generation, CRM automation, and sales workflows that convert.',
    iconUrl: null,
    status: 'coming_soon',
    launchDate: null,
    displayOrder: 4,
  },
  {
    name: 'Engineering',
    slug: 'engineering',
    description: 'Master advanced AI implementation. Build complex systems, integrate APIs, and create enterprise-grade AI solutions.',
    iconUrl: null,
    status: 'coming_soon',
    launchDate: null,
    displayOrder: 5,
  },
]);
console.log('✅ Created 5 pillars (3 active, 2 coming soon)\n');

// Insert membership tiers
console.log('💎 Creating membership tiers...');
await db.insert(membershipTiers).values([
  {
    name: 'Free',
    slug: 'free',
    priceMonthly: 0,
    priceAnnual: 0,
    foundingPriceMonthly: null,
    foundingPriceAnnual: null,
    stripePriceIdMonthly: null,
    stripePriceIdAnnual: null,
    features: JSON.stringify([
      'Access to public Facebook group',
      'Weekly tips and challenges',
      '10 free prompts',
      'Tool comparison guides',
      'Monthly live Q&A (100+ attendees)',
    ]),
    maxWorkshopsPerMonth: 0,
    forumAccess: 0,
    prioritySupport: 0,
    displayOrder: 1,
  },
  {
    name: 'Starter',
    slug: 'starter',
    priceMonthly: 4700, // $47 AUD (one-time, but stored as monthly equivalent)
    priceAnnual: 4700,
    foundingPriceMonthly: 2700, // $27 AUD founding member price
    foundingPriceAnnual: 2700,
    stripePriceIdMonthly: null, // To be added when Stripe products created
    stripePriceIdAnnual: null,
    features: JSON.stringify([
      'Access to private Facebook group',
      'Full tools database (1,620 tools)',
      'Full prompts library (118+ prompts)',
      'Resource library (playbooks, cheatsheets)',
      '20+ workflow templates',
      'Recorded workshop replays (past only)',
      'Email support (48-hour response)',
    ]),
    maxWorkshopsPerMonth: 0,
    forumAccess: 1,
    prioritySupport: 0,
    displayOrder: 2,
  },
  {
    name: 'Lite',
    slug: 'lite',
    priceMonthly: 9700, // $97 AUD/month
    priceAnnual: 97000, // $970 AUD/year
    foundingPriceMonthly: 7700, // $77 AUD/month founding
    foundingPriceAnnual: 77000, // $770 AUD/year founding
    stripePriceIdMonthly: null,
    stripePriceIdAnnual: null,
    features: JSON.stringify([
      'Everything in Starter Pass',
      '6 live workshops per month (2 per pillar)',
      'Expanded prompt library (150+ prompts)',
      'Priority email support (24-hour response)',
      'Monthly office hours (20-30 people)',
      'Exclusive tool discounts',
    ]),
    maxWorkshopsPerMonth: 6,
    forumAccess: 1,
    prioritySupport: 1,
    displayOrder: 3,
  },
  {
    name: 'Pro',
    slug: 'pro',
    priceMonthly: 29700, // $297 AUD/month
    priceAnnual: 297000, // $2,970 AUD/year
    foundingPriceMonthly: 24700, // $247 AUD/month founding
    foundingPriceAnnual: 247000, // $2,470 AUD/year founding
    stripePriceIdMonthly: null,
    stripePriceIdAnnual: null,
    features: JSON.stringify([
      'Everything in Lite Academy',
      '12 live Pro workshops per month (4 per pillar)',
      '1-on-1 strategy call quarterly (30 min)',
      'Custom GPT library (Atlas, Lead Gen GPT)',
      'Private channel with direct instructor access',
      'Weekly co-working sessions',
      'Early access to new tools and features',
    ]),
    maxWorkshopsPerMonth: 18, // 6 Lite + 12 Pro
    forumAccess: 1,
    prioritySupport: 1,
    displayOrder: 4,
  },
  {
    name: 'Elite',
    slug: 'elite',
    priceMonthly: 99700, // $997 AUD/month
    priceAnnual: 997000, // $9,970 AUD/year
    foundingPriceMonthly: 79700, // $797 AUD/month founding
    foundingPriceAnnual: 797000, // $7,970 AUD/year founding
    stripePriceIdMonthly: null,
    stripePriceIdAnnual: null,
    features: JSON.stringify([
      'Everything in Pro Academy',
      'Weekly 1-on-1 coaching (60 min/month)',
      'Custom automation builds (5 hours/month)',
      'Direct WhatsApp access to Huxley',
      'Quarterly strategy reviews with ROI tracking',
      'Access to Replit Advanced Coding Lab (future)',
      'Exclusive mastermind group (10-15 members)',
      'Speaking/content collaboration opportunities',
      'Lifetime access to all future courses',
    ]),
    maxWorkshopsPerMonth: 18,
    forumAccess: 1,
    prioritySupport: 1,
    displayOrder: 5,
  },
]);
console.log('✅ Created 5 membership tiers\n');

console.log('🎉 Data import complete!');
console.log('\nSummary:');
console.log(`  - ${toolsImported} tools imported`);
console.log(`  - ${promptsImported} prompts imported`);
console.log(`  - 5 pillars created`);
console.log(`  - 5 membership tiers created`);

await connection.end();
