import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { prompts } from '../drizzle/schema';
import * as fs from 'fs';
import * as path from 'path';

// Pillar categorization keywords
const pillarKeywords = {
  marketing: ['marketing', 'advertiser', 'social media', 'content', 'copywriter', 'seo', 'brand', 'campaign', 'sales', 'email', 'storyteller', 'influencer'],
  coding: ['developer', 'programmer', 'code', 'software', 'web', 'app', 'javascript', 'python', 'debug', 'algorithm', 'database', 'api', 'frontend', 'backend', 'fullstack'],
  alignment: ['coach', 'motivational', 'mental health', 'life coach', 'career', 'relationship', 'self-help', 'productivity', 'mindfulness', 'meditation', 'therapist', 'counselor'],
};

// Tier assignment based on complexity
const complexityKeywords = {
  pro: ['advanced', 'expert', 'professional', 'comprehensive', 'detailed', 'complex', 'sophisticated', 'enterprise'],
  lite: ['intermediate', 'practical', 'business', 'strategic', 'analysis', 'planning'],
  starter: ['basic', 'simple', 'beginner', 'introduction', 'getting started', 'quick'],
};

function categorizePillar(title: string, promptText: string): string {
  const combined = (title + ' ' + promptText).toLowerCase();
  
  let scores = {
    marketing: 0,
    coding: 0,
    alignment: 0,
  };

  for (const [pillar, keywords] of Object.entries(pillarKeywords)) {
    for (const keyword of keywords) {
      if (combined.includes(keyword)) {
        scores[pillar as keyof typeof scores]++;
      }
    }
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return 'General';

  return Object.keys(scores).find(k => scores[k as keyof typeof scores] === maxScore) || 'General';
}

function assignTier(title: string, promptText: string): string {
  const combined = (title + ' ' + promptText).toLowerCase();

  // Check for pro keywords first
  for (const keyword of complexityKeywords.pro) {
    if (combined.includes(keyword)) return 'pro';
  }

  // Then lite
  for (const keyword of complexityKeywords.lite) {
    if (combined.includes(keyword)) return 'lite';
  }

  // Check prompt length as complexity indicator
  if (promptText.length > 500) return 'lite';
  if (promptText.length > 800) return 'pro';

  return 'starter';
}

function extractTechStack(promptText: string): string | null {
  const techKeywords = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js',
    'Python', 'Django', 'Flask', 'Java', 'Spring', 'C#', '.NET', 'PHP', 'Laravel',
    'Ruby', 'Rails', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure',
    'Three.js', 'WebSocket', 'GraphQL', 'REST API', 'TensorFlow', 'PyTorch'
  ];

  const found = techKeywords.filter(tech => 
    promptText.toLowerCase().includes(tech.toLowerCase())
  );

  return found.length > 0 ? found.join(', ') : null;
}

async function parseAwesomePrompts(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').slice(1); // Skip header
  
  const parsed = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Parse CSV (handle quoted fields with commas)
    const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
    if (!matches || matches.length < 2) continue;
    
    const title = matches[0]?.replace(/^,?"?|"?$/g, '').trim();
    const promptText = matches[1]?.replace(/^,?"?|"?$/g, '').replace(/""/g, '"').trim();
    
    if (!title || !promptText) continue;

    const pillar = categorizePillar(title, promptText);
    const tier = assignTier(title, promptText);
    const techStack = extractTechStack(promptText);

    parsed.push({
      title,
      description: promptText.substring(0, 200) + (promptText.length > 200 ? '...' : ''),
      promptText,
      category: pillar,
      tool: 'ChatGPT',
      tierRequired: tier,
      techStack,
      status: 'approved' as const,
      source: 'awesome-chatgpt-prompts',
    });
  }
  
  return parsed;
}

async function parseVibePrompts(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').slice(1); // Skip header
  
  const parsed = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
    if (!matches || matches.length < 4) continue;
    
    const app = matches[0]?.replace(/^,?"?|"?$/g, '').trim();
    const promptText = matches[1]?.replace(/^,?"?|"?$/g, '').replace(/""/g, '"').trim();
    const contributor = matches[2]?.replace(/^,?"?|"?$/g, '').trim();
    const techStack = matches[3]?.replace(/^,?"?|"?$/g, '').trim();
    
    if (!app || !promptText) continue;

    // Vibe prompts are mostly coding-related
    const tier = assignTier(app, promptText);

    parsed.push({
      title: app,
      description: promptText.substring(0, 200) + (promptText.length > 200 ? '...' : ''),
      promptText,
      category: 'Coding',
      tool: 'Cursor/Windsurf',
      tierRequired: tier,
      techStack,
      status: 'approved' as const,
      source: 'vibe-marketing',
      featured: true, // Mark vibe prompts as featured
    });
  }
  
  return parsed;
}

async function importPrompts() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  console.log('🔄 Parsing prompts from GitHub repos...\n');

  // Parse awesome-chatgpt-prompts
  const awesomePromptsPath = '/home/ubuntu/upload/awesome-chatgpt-prompts-main/prompts.csv';
  const awesomePrompts = await parseAwesomePrompts(awesomePromptsPath);
  console.log(`✅ Parsed ${awesomePrompts.length} prompts from awesome-chatgpt-prompts`);

  // Parse vibe prompts
  const vibePromptsPath = '/home/ubuntu/upload/awesome-chatgpt-prompts-main/vibeprompts.csv';
  const vibePrompts = await parseVibePrompts(vibePromptsPath);
  console.log(`✅ Parsed ${vibePrompts.length} prompts from vibe-marketing`);

  // Combine and insert
  const allPrompts = [...awesomePrompts, ...vibePrompts];
  
  console.log('\n📊 Categorization Summary:');
  const pillarCounts = {
    Marketing: allPrompts.filter(p => p.category === 'Marketing').length,
    Coding: allPrompts.filter(p => p.category === 'Coding').length,
    Alignment: allPrompts.filter(p => p.category === 'Alignment').length,
    General: allPrompts.filter(p => p.category === 'General').length,
  };
  console.log(`  Marketing: ${pillarCounts.Marketing}`);
  console.log(`  Coding: ${pillarCounts.Coding}`);
  console.log(`  Alignment: ${pillarCounts.Alignment}`);
  console.log(`  General: ${pillarCounts.General}`);

  const tierCounts = {
    starter: allPrompts.filter(p => p.tierRequired === 'starter').length,
    lite: allPrompts.filter(p => p.tierRequired === 'lite').length,
    pro: allPrompts.filter(p => p.tierRequired === 'pro').length,
  };
  console.log(`\n  Starter: ${tierCounts.starter}`);
  console.log(`  Lite: ${tierCounts.lite}`);
  console.log(`  Pro: ${tierCounts.pro}`);

  const withTechStack = allPrompts.filter(p => p.techStack).length;
  console.log(`\n  With Tech Stack: ${withTechStack}`);
  console.log(`  Featured: ${allPrompts.filter(p => p.featured).length}`);

  // Insert in batches of 100
  console.log('\n🔄 Inserting prompts into database...');
  const batchSize = 100;
  for (let i = 0; i < allPrompts.length; i += batchSize) {
    const batch = allPrompts.slice(i, i + batchSize);
    await db.insert(prompts).values(batch);
    console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allPrompts.length / batchSize)}`);
  }

  console.log(`\n✅ Successfully imported ${allPrompts.length} prompts!`);

  await connection.end();
}

importPrompts().catch(console.error);
