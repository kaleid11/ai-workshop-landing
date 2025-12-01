import { ENV } from "./env";

/**
 * Send welcome email with AI Quick Start Guide resource pack
 */
export async function sendWelcomeEmail(email: string, weeklyNews: boolean) {
  if (!ENV.resendApiKey) {
    console.warn("[Email] Resend API key not configured, skipping welcome email");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.resendApiKey}`,
    },
    body: JSON.stringify({
      from: "Tech Horizon Academy <noreply@techhorizonlabs.com>",
      to: [email],
      subject: "🎁 Your AI Quick Start Guide is Here!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; }
              .button { display: inline-block; background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
              .resource-box { background: #f9fafb; border-left: 4px solid #9333ea; padding: 20px; margin: 20px 0; border-radius: 4px; }
              .footer { text-align: center; padding: 30px 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Welcome to Tech Horizon Academy!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Your AI Quick Start Guide is ready</p>
              </div>
              
              <div class="content">
                <p>Hi there,</p>
                
                <p>Thanks for joining Tech Horizon Academy! You're now part of a community of pioneers who refuse to fall behind in the AI revolution.</p>
                
                <div class="resource-box">
                  <h2 style="margin-top: 0; color: #9333ea;">📚 Your Free Resource Pack Includes:</h2>
                  <ul style="margin: 0; padding-left: 20px;">
                    <li><strong>AI Quick Start Guide</strong> - Step-by-step guide to get started with AI tools today</li>
                    <li><strong>Top 20 AI Tools Cheat Sheet</strong> - Curated list of must-have tools for every business</li>
                    <li><strong>Prompt Templates Library</strong> - 10 battle-tested prompts you can use right away</li>
                    ${weeklyNews ? '<li><strong>Weekly AI News</strong> - Stay ahead with curated updates every week</li>' : ''}
                  </ul>
                </div>
                
                <p style="text-align: center;">
                  <a href="https://techhorizonlabs.com/resources" class="button">Access Your Resources →</a>
                </p>
                
                <p><strong>What's Next?</strong></p>
                <ul>
                  <li>Explore our <a href="https://techhorizonlabs.com/tools">1,620+ AI Tools Database</a></li>
                  <li>Browse <a href="https://techhorizonlabs.com/prompts">Expert-Curated Prompts</a></li>
                  <li>Join our <a href="https://techhorizonlabs.com/workshops">Weekly Live Workshops</a></li>
                </ul>
                
                <p>Ready to master AI before your competitors do? <a href="https://techhorizonlabs.com/pricing">Explore our Academy membership</a> for full access to everything.</p>
                
                <p>See you inside!<br>
                <strong>The Tech Horizon Team</strong></p>
              </div>
              
              <div class="footer">
                <p>Tech Horizon Academy | Mastering AI, One Tool at a Time</p>
                <p style="font-size: 12px; color: #9ca3af;">
                  ${weeklyNews ? 'You\'re subscribed to weekly AI news. ' : ''}
                  <a href="https://techhorizonlabs.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #9ca3af;">Unsubscribe</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send welcome email: ${error}`);
  }

  return await response.json();
}
