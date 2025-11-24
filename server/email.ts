import { execSync } from "child_process";

/**
 * Send welcome email to workshop purchaser
 * Uses Gmail MCP server to send email
 */
export async function sendWelcomeEmail(
  recipientEmail: string,
  recipientName: string,
  portalUrl: string
): Promise<boolean> {
  try {
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

    const emailData = {
      messages: [
        {
          to: [recipientEmail],
          subject: "Welcome to the AI Social Media Workshop! 🚀",
          content: emailContent,
        },
      ],
    };

    // Call Gmail MCP to send email
    const result = execSync(
      `manus-mcp-cli tool call gmail_send_messages --server gmail --input '${JSON.stringify(emailData)}'`,
      { encoding: "utf-8", timeout: 30000 }
    );

    console.log("[Email] Welcome email sent to:", recipientEmail);
    console.log("[Email] Result:", result);

    return true;
  } catch (error) {
    console.error("[Email] Failed to send welcome email:", error);
    return false;
  }
}
