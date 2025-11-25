import { execSync } from "child_process";
import { getDb } from "./db";
import { emailLogs } from "../drizzle/schema";

type EmailType =
  | "workshop_confirmation"
  | "workshop_reminder_24h"
  | "workshop_followup"
  | "academy_confirmation"
  | "academy_renewal_reminder";

/**
 * Log email send to database
 */
async function logEmail(
  userId: number,
  emailType: EmailType,
  recipientEmail: string,
  subject: string,
  status: "sent" | "failed",
  errorMessage?: string
) {
  try {
    const db = await getDb();
    if (db) {
      await db.insert(emailLogs).values({
        userId,
        emailType,
        recipientEmail,
        subject,
        status,
        errorMessage: errorMessage || null,
      });
    }
  } catch (error) {
    console.error("[Email] Failed to log email:", error);
  }
}

/**
 * Send email via Gmail MCP
 */
async function sendGmailEmail(
  to: string,
  subject: string,
  content: string
): Promise<boolean> {
  try {
    const emailData = {
      messages: [
        {
          to: [to],
          subject,
          content,
        },
      ],
    };

    const result = execSync(
      `manus-mcp-cli tool call gmail_send_messages --server gmail --input '${JSON.stringify(emailData)}'`,
      { encoding: "utf-8", timeout: 30000 }
    );

    console.log("[Email] Email sent to:", to);
    console.log("[Email] Result:", result);

    return true;
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
    return false;
  }
}

/**
 * Send welcome email to workshop purchaser
 * Uses Gmail MCP server to send email
 */
export async function sendWelcomeEmail(
  recipientEmail: string,
  recipientName: string,
  portalUrl: string,
  userId: number
): Promise<boolean> {
  try {
    const subject = "Welcome to the AI Social Media Workshop! 🚀";
    const emailContent = `Hi ${recipientName},

Welcome to the AI Social Media Workshop! 🎉

Your payment has been confirmed and you now have LIFETIME ACCESS to:

✅ Workshop recordings (forever)
✅ All templates & resources (forever)
✅ WhatsApp community group (forever)
✅ 1 month FREE live workshop access

🔗 ACCESS YOUR PORTAL NOW
👉 ${portalUrl}

Your portal contains everything you need:
- Workshop recordings & bonus content
- Downloadable templates & checklists
- WhatsApp community link
- Live workshop calendar
- Tool stack guides

📅 NEXT LIVE WORKSHOP
Date: Wednesday, November 26, 2025
Time: 9:00 AM - 11:00 AM (Brisbane) / 10:00 AM - 12:00 PM (Melbourne)
Duration: 2 hours

What you'll learn:
✓ Automate social media with AI
✓ Create & edit videos using AI tools
✓ Build content workflows that save 10+ hours/week
✓ Master the 7-tool stack that replaces 15+ expensive tools

💬 JOIN THE WHATSAPP GROUP
Connect with other workshop members in our private WhatsApp community (link in your portal). Share wins, ask questions, and get real-time support.

⏰ YOUR 1-MONTH FREE LIVE ACCESS
You have 1 month of FREE access to all live workshops. After that, you'll still have lifetime access to all recordings and resources - you'll just need to renew if you want to join future live sessions.

📧 NEED HELP?
Email us at info@thzn.world anytime.

See you in the portal!

Best regards,
Huxley Peckham
Tech Horizon Labs
https://thzn.world`;

    const success = await sendGmailEmail(recipientEmail, subject, emailContent);

    // Log email send
    await logEmail(
      userId,
      "workshop_confirmation",
      recipientEmail,
      subject,
      success ? "sent" : "failed"
    );

    return success;
  } catch (error) {
    console.error("[Email] Failed to send welcome email:", error);

    // Log failed attempt
    await logEmail(
      userId,
      "workshop_confirmation",
      recipientEmail,
      "Welcome to the AI Social Media Workshop! 🚀",
      "failed",
      error instanceof Error ? error.message : String(error)
    );

    return false;
  }
}

/**
 * Send 24-hour workshop reminder email
 */
export async function sendWorkshopReminder(
  recipientEmail: string,
  recipientName: string,
  workshopDate: string,
  meetingUrl: string,
  portalUrl: string,
  userId: number
): Promise<boolean> {
  try {
    const subject = "Workshop Tomorrow! ⏰";
    const emailContent = `Hi ${recipientName},

Your AI Social Media Workshop is tomorrow! 🎉

📅 ${workshopDate}
Wednesday, Nov 26 • 9-11am Brisbane / 10am-12pm Melbourne

🔗 JOIN THE WORKSHOP
👉 ${meetingUrl}

🔗 ACCESS YOUR PORTAL
👉 ${portalUrl}

✅ FINAL CHECKLIST
☐ Tools signed up (ViralWave, Captions.ai, Higgsfield.ai)
☐ Brand materials prepared (use Gemini GEM)
☐ WhatsApp community joined
☐ Portal access tested

💡 PRO TIP
Have 2-3 recent photos of yourself ready for creating your AI Twin during the workshop!

📹 CAN'T MAKE IT?
No worries - the recording will be available in your Portal within 24 hours.

See you tomorrow!

Best regards,
Huxley Peckham
Tech Horizon Labs`;

    const success = await sendGmailEmail(recipientEmail, subject, emailContent);

    // Log email send
    await logEmail(
      userId,
      "workshop_reminder_24h",
      recipientEmail,
      subject,
      success ? "sent" : "failed"
    );

    return success;
  } catch (error) {
    console.error("[Email] Failed to send workshop reminder:", error);

    // Log failed attempt
    await logEmail(
      userId,
      "workshop_reminder_24h",
      recipientEmail,
      "Workshop Tomorrow! ⏰",
      "failed",
      error instanceof Error ? error.message : String(error)
    );

    return false;
  }
}

/**
 * Send post-workshop follow-up email
 */
export async function sendWorkshopFollowup(
  recipientEmail: string,
  recipientName: string,
  portalUrl: string,
  recordingUrl: string,
  userId: number
): Promise<boolean> {
  try {
    const subject = "Workshop Recording & Next Steps 🎓";
    const emailContent = `Hi ${recipientName},

Thanks for attending the AI Social Media Workshop! 🎉

📹 WORKSHOP RECORDING
👉 ${recordingUrl}

🚀 YOUR NEXT STEPS

1. Keep using your Portal access
   You have 1 month FREE to create content with all the tools

2. Create your first 10 posts
   Use the Post Generator to build your content library

3. Set up your AI Twin
   Follow the guide in the Portal to create your digital clone

4. Join monthly webinars
   Upgrade to Pro for ongoing training and support

💎 UPGRADE TO ACADEMY PRO
Want to keep going after your free month? Upgrade to Pro and get:

✅ Unlimited workshops every month
✅ 15min strategy calls
✅ Full Portal access forever
✅ Priority support

🔗 UPGRADE NOW
👉 ${portalUrl}#upgrade

Questions about upgrading or need help? Reply to this email or book a free 15-min call.

Keep creating!

Best regards,
Huxley Peckham
Tech Horizon Labs`;

    const success = await sendGmailEmail(recipientEmail, subject, emailContent);

    // Log email send
    await logEmail(
      userId,
      "workshop_followup",
      recipientEmail,
      subject,
      success ? "sent" : "failed"
    );

    return success;
  } catch (error) {
    console.error("[Email] Failed to send workshop followup:", error);

    // Log failed attempt
    await logEmail(
      userId,
      "workshop_followup",
      recipientEmail,
      "Workshop Recording & Next Steps 🎓",
      "failed",
      error instanceof Error ? error.message : String(error)
    );

    return false;
  }
}

/**
 * Send Academy membership confirmation email
 */
export async function sendAcademyConfirmation(
  recipientEmail: string,
  recipientName: string,
  tierName: string,
  portalUrl: string,
  userId: number
): Promise<boolean> {
  try {
    const subject = "Welcome to Tech Horizon Academy! 🎉";
    const emailContent = `Hi ${recipientName},

Your ${tierName} membership is now active! 🎉

You have full access to:

✅ All Academy Portal tools
✅ Monthly live workshops
✅ Community WhatsApp group
✅ Workshop recordings library
✅ Priority support

🔗 ACCESS YOUR PORTAL
👉 ${portalUrl}

🚀 GET STARTED

1. Explore the Portal and test all the tools
2. Check the calendar for upcoming workshops
3. Join the WhatsApp community
4. Create your first AI-generated content

Need help getting started? Reply to this email or book a free 15-min onboarding call.

Welcome aboard!

Best regards,
Huxley Peckham
Tech Horizon Labs`;

    const success = await sendGmailEmail(recipientEmail, subject, emailContent);

    // Log email send
    await logEmail(
      userId,
      "academy_confirmation",
      recipientEmail,
      subject,
      success ? "sent" : "failed"
    );

    return success;
  } catch (error) {
    console.error("[Email] Failed to send academy confirmation:", error);

    // Log failed attempt
    await logEmail(
      userId,
      "academy_confirmation",
      recipientEmail,
      "Welcome to Tech Horizon Academy! 🎉",
      "failed",
      error instanceof Error ? error.message : String(error)
    );

    return false;
  }
}
