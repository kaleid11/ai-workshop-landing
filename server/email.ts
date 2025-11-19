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

Thank you for joining us. You're all set for the workshop on Wednesday, November 26th at 9:00 AM Brisbane time (10:00 AM Melbourne time).

Here's what you need to know:

🔗 ACCESS YOUR PORTAL
Visit your member portal here: ${portalUrl}

In the portal, you'll find:
- WhatsApp community link
- Facebook community resources
- Add-to-calendar button for the workshop
- All workshop materials and templates
- Email support access

📅 WORKSHOP DETAILS
Date: Wednesday, November 26, 2025
Time: 9:00 AM - 11:00 AM (Brisbane) / 10:00 AM - 12:00 PM (Melbourne)
Duration: 2 hours

What you'll learn:
✓ Automate social media posts
✓ Create videos with AI tools
✓ Edit videos using your own likeness
✓ Optional: Clone yourself with AI

💬 JOIN THE COMMUNITY
Connect with other workshop attendees in our WhatsApp group (link in portal). Share ideas, ask questions, and network with fellow operators.

📧 NEED HELP?
Email us at info@thzn.world anytime.

See you at the workshop!

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
