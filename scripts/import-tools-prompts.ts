import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { tools, prompts } from '../drizzle/schema';
import fs from 'fs';

async function importData() {
  // Database connection
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  console.log('🚀 Starting data import...\n');

  // Import tools from tools.json
  console.log('📦 Importing tools...');
  const toolsData = JSON.parse(fs.readFileSync('/home/ubuntu/upload/tools.json', 'utf-8'));
  console.log(`Found ${toolsData.length} tools to import`);

  let toolsImported = 0;
  const toolsBatch: any[] = [];

  for (const tool of toolsData) {
    // Map tier based on tool complexity/pricing
    let tierRequired: 'free' | 'starter' | 'lite' | 'pro' | 'elite' = 'free';
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
  const promptsBatch: any[] = [];

  for (const prompt of promptsData) {
    // Map tier based on prompt complexity
    let tierRequired: 'free' | 'starter' | 'lite' | 'pro' | 'elite' = 'free';
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

  console.log('🎉 Data import complete!');
  console.log('\nSummary:');
  console.log(`  - ${toolsImported} tools imported`);
  console.log(`  - ${promptsImported} prompts imported`);

  await connection.end();
}

importData().catch(console.error);
