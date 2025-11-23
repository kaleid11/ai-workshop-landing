import { ENV } from "./_core/env";

/**
 * Send email using Resend API
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML email content
 * @param from - Sender email (defaults to noreply@thzn.world)
 * @returns Response from Resend API
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = "Tech Horizon Labs <noreply@thzn.world>",
  attachments = [],
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  attachments?: Array<{
    filename: string;
    content: string; // base64 encoded
  }>;
}) {
  const apiKey = ENV.resendApiKey;

  if (!apiKey) {
    console.error("[Resend] API key not configured");
    throw new Error("Resend API key not configured");
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        attachments,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Resend] API error:", error);
      throw new Error(`Resend API error: ${response.status} ${error}`);
    }

    const data = await response.json();
    console.log("[Resend] Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("[Resend] Failed to send email:", error);
    throw error;
  }
}

/**
 * Send assessment report email with PDF attachment
 */
export async function sendAssessmentReport({
  to,
  name,
  assessmentType,
  score,
  pdfBase64,
}: {
  to: string;
  name: string;
  assessmentType: "quick" | "full";
  score: number;
  pdfBase64: string;
}) {
  const subject =
    assessmentType === "quick"
      ? "Your AI Tool Stack Audit Results"
      : "Your AI Readiness Scorecard Results";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #7C3AED 0%, #2563EB 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .score { font-size: 48px; font-weight: bold; color: #7C3AED; text-align: center; margin: 20px 0; }
    .cta { background: #F97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your AI ${assessmentType === "quick" ? "Tool Audit" : "Readiness"} Results</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      
      <p>Thank you for completing your ${assessmentType === "quick" ? "Quick Tool Stack Audit" : "AI Readiness Scorecard"}!</p>
      
      <div class="score">${score}${assessmentType === "full" ? "/100" : ""}</div>
      
      <p><strong>Your personalized report is attached to this email.</strong></p>
      
      <p>Based on your assessment, we've identified specific opportunities to:</p>
      <ul>
        <li>Reduce tool costs by $5K-$15K annually</li>
        <li>Automate 10-20 hours of manual work per week</li>
        <li>Improve team productivity with the right AI tools</li>
      </ul>
      
      <p style="text-align: center;">
        <a href="https://app.klipy.ai/book/pre-discovery/free-pre-discovery" class="cta">
          Book Your Free 15-Min AI Audit
        </a>
      </p>
      
      <p>During your audit, we'll:</p>
      <ul>
        <li>Review your specific assessment results</li>
        <li>Identify your top 3-5 priority tools</li>
        <li>Create a 90-day implementation roadmap</li>
        <li>Show you exactly how much you can save</li>
      </ul>
      
      <p>Looking forward to helping you implement these recommendations!</p>
      
      <p>Best regards,<br>
      <strong>Huxley Peckham</strong><br>
      Founder, Tech Horizon Labs</p>
      
      <div class="footer">
        <p>Tech Horizon Labs | Sunshine Coast, Queensland<br>
        <a href="mailto:info@thzn.world">info@thzn.world</a> | 
        <a href="https://aisocialwork-e9rjae3t.manus.space">aisocialwork-e9rjae3t.manus.space</a></p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({
    to,
    subject,
    html,
    attachments: [
      {
        filename: `${assessmentType === "quick" ? "tool-audit" : "ai-readiness"}-report.pdf`,
        content: pdfBase64,
      },
    ],
  });
}
