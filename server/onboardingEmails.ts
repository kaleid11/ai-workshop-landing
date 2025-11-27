import { getDb } from "./db";
import { emailLogs, userSubscriptions, users } from "../drizzle/schema";
import { eq, and, lt, isNull } from "drizzle-orm";

/**
 * Onboarding Email Service
 * Sends automated welcome emails on Day 1, 3, and 7 after purchase
 */

interface EmailTemplate {
  subject: string;
  html: string;
}

// Day 1: Portal Tour Email
function getDay1Email(userName: string): EmailTemplate {
  return {
    subject: "Welcome to Tech Horizon Academy! 🎉 Your Portal Tour",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .section { background: white; padding: 20px; margin: 20px 0; border-radius: 6px; border-left: 4px solid #f97316; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Tech Horizon Academy!</h1>
            <p>Your AI Learning Journey Starts Now</p>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            
            <p>Congratulations on joining Tech Horizon Academy! You've just unlocked access to everything you need to master AI before your competitors do.</p>
            
            <div class="section">
              <h2>🚀 Quick Start Guide</h2>
              <p><strong>Step 1:</strong> Access your member portal and explore the dashboard</p>
              <p><strong>Step 2:</strong> Browse 1,620+ AI tools in the Tools Database</p>
              <p><strong>Step 3:</strong> Check out 118+ battle-tested prompts in the Prompt Library</p>
              <p><strong>Step 4:</strong> Read the 21 comprehensive guides in the Wiki</p>
              <p><strong>Step 5:</strong> Join the WhatsApp community to connect with other pioneers</p>
            </div>
            
            <div class="section">
              <h2>📚 What You Get Access To:</h2>
              <ul>
                <li><strong>Tools Database:</strong> 1,620+ curated AI tools with referral links</li>
                <li><strong>Prompt Library:</strong> 118+ prompts for every AI use case</li>
                <li><strong>Knowledge Base:</strong> 21 guides on Manus, Gemini, NotebookLM, and more</li>
                <li><strong>Live Workshops:</strong> Monthly sessions based on your tier</li>
                <li><strong>Private Community:</strong> WhatsApp and Facebook groups</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="https://aisocialwork-e9rjae3t.manus.space/portal" class="button">Access Your Portal Now</a>
            </div>
            
            <p>Questions? Reply to this email or reach out at <a href="mailto:info@thzn.world">info@thzn.world</a></p>
            
            <p>Excited to see you inside!</p>
            <p><strong>Huxley & The Tech Horizon Team</strong></p>
          </div>
          <div class="footer">
            <p>Tech Horizon Academy | Master AI Before Your Competitors Do</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

// Day 3: Workshop Reminder Email
function getDay3Email(userName: string): EmailTemplate {
  return {
    subject: "Ready to Book Your First Workshop? 📅",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .section { background: white; padding: 20px; margin: 20px 0; border-radius: 6px; border-left: 4px solid #3b82f6; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Time to Book Your First Workshop! 🎯</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            
            <p>You've been exploring the portal for a few days now - awesome! Let's take your learning to the next level with our live workshops.</p>
            
            <div class="section">
              <h2>🎓 How Workshops Work:</h2>
              <p><strong>1. Browse Available Workshops:</strong> Visit the Workshop Calendar to see upcoming sessions across Marketing, Coding, and Alignment pillars.</p>
              <p><strong>2. Use Your Workshop Credits:</strong> Each tier includes monthly workshop credits (check your portal for your balance).</p>
              <p><strong>3. Request Access:</strong> Click "Request Access" on any workshop you want to attend.</p>
              <p><strong>4. Get Approved:</strong> We'll review your request and send you the Google Meet link.</p>
              <p><strong>5. Attend Live:</strong> Join the session, learn, and ask questions in real-time!</p>
            </div>
            
            <div class="section">
              <h2>📅 Upcoming Workshops:</h2>
              <p>Check out our rotating schedule covering:</p>
              <ul>
                <li><strong>Vibe Marketing:</strong> Social media automation, content creation</li>
                <li><strong>Vibe Coding:</strong> Manus, Replit, Cursor, app development</li>
                <li><strong>Vibe Alignment:</strong> AI governance, training, processes</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="https://aisocialwork-e9rjae3t.manus.space/workshops" class="button">View Workshop Calendar</a>
            </div>
            
            <p><strong>Pro Tip:</strong> Workshops fill up fast! Book early to secure your spot.</p>
            
            <p>See you in the next session!</p>
            <p><strong>Huxley & The Tech Horizon Team</strong></p>
          </div>
          <div class="footer">
            <p>Tech Horizon Academy | Master AI Before Your Competitors Do</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

// Day 7: Community Engagement Email
function getDay7Email(userName: string): EmailTemplate {
  return {
    subject: "Join the Community & Unlock Hidden Resources 🌟",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .section { background: white; padding: 20px; margin: 20px 0; border-radius: 6px; border-left: 4px solid #10b981; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>You're Missing Out on the Community! 💬</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>
            
            <p>You've been a member for a week now - that's amazing! But have you joined the community yet?</p>
            
            <div class="section">
              <h2>🤝 Why Join the Community:</h2>
              <ul>
                <li><strong>Get Help Fast:</strong> Ask questions and get answers from other AI pioneers</li>
                <li><strong>Share Your Wins:</strong> Celebrate your AI automation successes</li>
                <li><strong>Network:</strong> Connect with business owners solving similar challenges</li>
                <li><strong>Early Access:</strong> Be first to know about new tools and workshops</li>
                <li><strong>Exclusive Tips:</strong> Huxley shares bonus content in the groups</li>
              </ul>
            </div>
            
            <div class="section">
              <h2>📚 Hidden Resources You Might Have Missed:</h2>
              <p><strong>1. Downloadable Wiki Guides:</strong> Save guides as markdown to use in Gemini/ChatGPT as context</p>
              <p><strong>2. Workshop Recordings:</strong> Lite+ members get access to past session recordings</p>
              <p><strong>3. Referral Links:</strong> Get discounts on tools like Google Workspace (10% off)</p>
              <p><strong>4. Academy Tools:</strong> Use our Headshot Generator, Brand Artifact Generator, and Content Repurposer</p>
            </div>
            
            <div style="text-align: center;">
              <a href="https://aisocialwork-e9rjae3t.manus.space/portal" class="button">Access Community Links</a>
            </div>
            
            <p><strong>Action Item:</strong> Head to your portal and click the WhatsApp or Facebook community links. Introduce yourself and share what you're working on!</p>
            
            <p>Looking forward to seeing you in the community!</p>
            <p><strong>Huxley & The Tech Horizon Team</strong></p>
          </div>
          <div class="footer">
            <p>Tech Horizon Academy | Master AI Before Your Competitors Do</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

/**
 * Send onboarding email via Gmail MCP
 */
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    const { execSync } = await import('child_process');
    
    // Escape special characters in HTML for shell
    const escapedHtml = html.replace(/'/g, "'\\''");
    
    const command = `manus-mcp-cli tool call send_email --server gmail --input '${JSON.stringify({
      to,
      subject,
      body: html,
      is_html: true
    })}'`;
    
    execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

/**
 * Process onboarding emails for users
 * Call this function daily (e.g., via cron job or scheduled task)
 */
export async function processOnboardingEmails() {
  const db = await getDb();
  if (!db) {
    console.log('[Onboarding] Database not available');
    return;
  }

  try {
    const now = new Date();
    
    // Get all active subscriptions
    const subscriptions = await db
      .select({
        userId: userSubscriptions.userId,
        userName: users.name,
        userEmail: users.email,
        createdAt: userSubscriptions.createdAt,
      })
      .from(userSubscriptions)
      .innerJoin(users, eq(users.id, userSubscriptions.userId))
      .where(eq(userSubscriptions.status, 'active'));

    for (const sub of subscriptions) {
      if (!sub.userEmail || !sub.userName) continue;

      const daysSinceJoin = Math.floor((now.getTime() - sub.createdAt.getTime()) / (1000 * 60 * 60 * 24));

      // Day 1 email (send within first 24 hours)
      if (daysSinceJoin === 0) {
        const alreadySent = await db
          .select()
          .from(emailLogs)
          .where(
            and(
              eq(emailLogs.userId, sub.userId),
              eq(emailLogs.emailType, 'onboarding_day1')
            )
          )
          .limit(1);

        if (alreadySent.length === 0) {
          const template = getDay1Email(sub.userName);
          const success = await sendEmail(sub.userEmail, template.subject, template.html);
          
          await db.insert(emailLogs).values({
            userId: sub.userId,
            emailType: 'onboarding_day1',
            recipientEmail: sub.userEmail,
            subject: template.subject,
            status: success ? 'sent' : 'failed',
            errorMessage: success ? null : 'Failed to send via Gmail MCP',
          });
          
          console.log(`[Onboarding] Day 1 email ${success ? 'sent' : 'failed'} to ${sub.userEmail}`);
        }
      }

      // Day 3 email
      if (daysSinceJoin === 3) {
        const alreadySent = await db
          .select()
          .from(emailLogs)
          .where(
            and(
              eq(emailLogs.userId, sub.userId),
              eq(emailLogs.emailType, 'onboarding_day3')
            )
          )
          .limit(1);

        if (alreadySent.length === 0) {
          const template = getDay3Email(sub.userName);
          const success = await sendEmail(sub.userEmail, template.subject, template.html);
          
          await db.insert(emailLogs).values({
            userId: sub.userId,
            emailType: 'onboarding_day3',
            recipientEmail: sub.userEmail,
            subject: template.subject,
            status: success ? 'sent' : 'failed',
            errorMessage: success ? null : 'Failed to send via Gmail MCP',
          });
          
          console.log(`[Onboarding] Day 3 email ${success ? 'sent' : 'failed'} to ${sub.userEmail}`);
        }
      }

      // Day 7 email
      if (daysSinceJoin === 7) {
        const alreadySent = await db
          .select()
          .from(emailLogs)
          .where(
            and(
              eq(emailLogs.userId, sub.userId),
              eq(emailLogs.emailType, 'onboarding_day7')
            )
          )
          .limit(1);

        if (alreadySent.length === 0) {
          const template = getDay7Email(sub.userName);
          const success = await sendEmail(sub.userEmail, template.subject, template.html);
          
          await db.insert(emailLogs).values({
            userId: sub.userId,
            emailType: 'onboarding_day7',
            recipientEmail: sub.userEmail,
            subject: template.subject,
            status: success ? 'sent' : 'failed',
            errorMessage: success ? null : 'Failed to send via Gmail MCP',
          });
          
          console.log(`[Onboarding] Day 7 email ${success ? 'sent' : 'failed'} to ${sub.userEmail}`);
        }
      }
    }
  } catch (error) {
    console.error('[Onboarding] Error processing emails:', error);
  }
}
