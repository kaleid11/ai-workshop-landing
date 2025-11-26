import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

// Seed the 4 rotating monthly workshops
const workshops = [
  {
    title: "Vibe Marketing Session",
    description: "Master Gemini, ViralWave & Captions.ai to create a week of content in 3 hours. Learn the 4-part prompt formula, brand alignment, and social media automation workflows.",
    pillarId: 1, // Marketing pillar
    tierRequired: "starter",
    sessionType: "lite",
    durationMinutes: 120,
    scheduledAt: new Date("2025-11-26T10:00:00Z"), // Last Tuesday of month
    status: "completed",
    recordingUrl: null, // Will be added by admin
    materialsUrl: null,
    maxAttendees: 50,
  },
  {
    title: "Vibe Coding Session",
    description: "Build AI-powered applications without traditional coding. Learn to use Cursor, Replit, Lovable, and Bolt.new to create functional apps, websites, and automation tools.",
    pillarId: 2, // Coding pillar
    tierRequired: "starter",
    sessionType: "lite",
    durationMinutes: 120,
    scheduledAt: new Date("2025-12-03T10:00:00Z"), // First Tuesday of December
    status: "scheduled",
    googleMeetUrl: null, // Will be sent to approved attendees
    maxAttendees: 50,
  },
  {
    title: "Vibe Alignment for Business",
    description: "Align your business strategy with AI capabilities. Learn to define your brand voice, identify automation opportunities, and create custom workflows that match your business goals.",
    pillarId: 3, // Alignment pillar
    tierRequired: "starter",
    sessionType: "lite",
    durationMinutes: 120,
    scheduledAt: new Date("2025-12-10T10:00:00Z"), // Second Tuesday of December
    status: "scheduled",
    googleMeetUrl: null,
    maxAttendees: 50,
  },
  {
    title: "Business Workflows with AI Agents",
    description: "Design and deploy AI agents that handle repetitive tasks. Learn to build custom agents for customer service, content creation, data analysis, and business automation.",
    pillarId: 4, // Workflows pillar
    tierRequired: "starter",
    sessionType: "lite",
    durationMinutes: 120,
    scheduledAt: new Date("2025-12-17T10:00:00Z"), // Third Tuesday of December
    status: "scheduled",
    googleMeetUrl: null,
    maxAttendees: 50,
  },
];

console.log("Seeding workshops...");

for (const workshop of workshops) {
  try {
    await db.execute(`
      INSERT INTO workshops (title, description, pillarId, tierRequired, sessionType, durationMinutes, scheduledAt, status, googleMeetUrl, recordingUrl, materialsUrl, maxAttendees)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        description = VALUES(description),
        scheduledAt = VALUES(scheduledAt),
        status = VALUES(status)
    `, [
      workshop.title,
      workshop.description,
      workshop.pillarId,
      workshop.tierRequired,
      workshop.sessionType,
      workshop.durationMinutes,
      workshop.scheduledAt,
      workshop.status,
      workshop.googleMeetUrl,
      workshop.recordingUrl,
      workshop.materialsUrl,
      workshop.maxAttendees,
    ]);
    console.log(`✓ Seeded: ${workshop.title}`);
  } catch (error) {
    console.error(`✗ Failed to seed ${workshop.title}:`, error.message);
  }
}

console.log("\n✅ Workshop seeding complete!");
await connection.end();
