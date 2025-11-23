/**
 * Generate PDF report for assessment results
 * Returns base64 encoded PDF
 */
export async function generateAssessmentPDF({
  name,
  assessmentType,
  score,
  recommendations,
  answers,
}: {
  name: string;
  assessmentType: "quick" | "full";
  score: number;
  recommendations: string[];
  answers: Record<string, any>;
}): Promise<string> {
  // For now, we'll use a simple HTML-to-PDF approach
  // In production, you might want to use a library like PDFKit or Puppeteer
  
  const html = generateReportHTML({
    name,
    assessmentType,
    score,
    recommendations,
    answers,
  });

  // Convert HTML to PDF using a simple approach
  // This is a placeholder - in production you'd use a proper PDF library
  const pdfBuffer = Buffer.from(html);
  return pdfBuffer.toString("base64");
}

function generateReportHTML({
  name,
  assessmentType,
  score,
  recommendations,
  answers,
}: {
  name: string;
  assessmentType: "quick" | "full";
  score: number;
  recommendations: string[];
  answers: Record<string, any>;
}): string {
  const title =
    assessmentType === "quick"
      ? "AI Tool Stack Audit Report"
      : "AI Readiness Scorecard Report";

  const scoreLabel = assessmentType === "full" ? `${score}/100` : score;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 40px;
    }
    .header {
      background: linear-gradient(135deg, #7C3AED 0%, #2563EB 100%);
      color: white;
      padding: 40px;
      text-align: center;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .header h1 { font-size: 32px; margin-bottom: 10px; }
    .header p { font-size: 18px; opacity: 0.9; }
    .score-section {
      background: #f9fafb;
      padding: 30px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 30px;
    }
    .score { font-size: 72px; font-weight: bold; color: #7C3AED; margin: 20px 0; }
    .section {
      margin-bottom: 30px;
      padding: 20px;
      border-left: 4px solid #7C3AED;
      background: #f9fafb;
    }
    .section h2 {
      font-size: 24px;
      color: #7C3AED;
      margin-bottom: 15px;
    }
    .recommendation {
      background: white;
      padding: 15px;
      margin: 10px 0;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
    }
    .recommendation h3 {
      font-size: 18px;
      color: #2563EB;
      margin-bottom: 8px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #666;
    }
    .cta {
      background: #F97316;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 8px;
      display: inline-block;
      margin: 20px 0;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${title}</h1>
    <p>Prepared for ${name}</p>
    <p>${new Date().toLocaleDateString("en-AU", { dateStyle: "long" })}</p>
  </div>

  <div class="score-section">
    <h2>Your Score</h2>
    <div class="score">${scoreLabel}</div>
    <p>${getScoreDescription(assessmentType, score)}</p>
  </div>

  <div class="section">
    <h2>Recommended Tools & Actions</h2>
    <p>Based on your assessment, here are the top tools and actions we recommend:</p>
    ${recommendations
      .map(
        (rec, i) => `
      <div class="recommendation">
        <h3>${i + 1}. ${rec}</h3>
        <p>${getToolDescription(rec)}</p>
      </div>
    `
      )
      .join("")}
  </div>

  <div class="section">
    <h2>Next Steps</h2>
    <ol style="padding-left: 20px; line-height: 2;">
      <li><strong>Book your free 15-minute AI audit</strong> to discuss these recommendations in detail</li>
      <li><strong>Prioritize 3-5 tools</strong> that will have the biggest impact on your business</li>
      <li><strong>Create a 90-day implementation plan</strong> with clear milestones</li>
      <li><strong>Start with quick wins</strong> to build momentum and demonstrate ROI</li>
    </ol>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://app.klipy.ai/book/pre-discovery/free-pre-discovery" class="cta">
        Book Your Free AI Audit
      </a>
    </div>
  </div>

  <div class="section">
    <h2>Potential Savings & Impact</h2>
    <p>Based on businesses similar to yours, implementing these recommendations could result in:</p>
    <ul style="padding-left: 20px; line-height: 2; margin-top: 10px;">
      <li><strong>$5,000 - $15,000</strong> in annual tool cost savings</li>
      <li><strong>10-20 hours per week</strong> saved through automation</li>
      <li><strong>30-50% faster</strong> content creation and marketing</li>
      <li><strong>Improved team productivity</strong> and reduced manual errors</li>
    </ul>
  </div>

  <div class="footer">
    <h3 style="color: #7C3AED; margin-bottom: 10px;">Tech Horizon Labs</h3>
    <p>AI Implementation for Queensland SMBs</p>
    <p>Sunshine Coast, Queensland</p>
    <p style="margin-top: 10px;">
      <strong>Email:</strong> info@thzn.world<br>
      <strong>Website:</strong> aisocialwork-e9rjae3t.manus.space
    </p>
    <p style="margin-top: 20px; font-size: 12px; color: #999;">
      This report was generated on ${new Date().toLocaleString("en-AU")}
    </p>
  </div>
</body>
</html>
  `;
}

function getScoreDescription(
  assessmentType: "quick" | "full",
  score: number
): string {
  if (assessmentType === "quick") {
    return "Tools identified for immediate cost savings and productivity gains";
  }

  if (score >= 80) {
    return "Excellent! You're well-positioned to leverage AI in your business.";
  } else if (score >= 60) {
    return "Good foundation. Focus on the recommendations below to maximize your AI potential.";
  } else if (score >= 40) {
    return "Moderate readiness. Implementing these recommendations will significantly improve your AI capabilities.";
  } else {
    return "Early stage. These recommendations will help you build a strong AI foundation.";
  }
}

function getToolDescription(tool: string): string {
  const descriptions: Record<string, string> = {
    ChatGPT:
      "Essential AI assistant for content creation, customer support, and business operations. Free tier available with Plus at $20 USD/month.",
    Manus:
      "Complete AI development platform for building custom AI applications without code. This academy runs on Manus!",
    Gamma:
      "AI-powered presentation creation tool that turns ideas into beautiful slides in minutes.",
    "Captions.ai":
      "AI video editing and captioning tool for social media content creation.",
    "Viralwave Studio":
      "AI content studio for creating viral social media content at scale.",
    Replit:
      "Cloud-based coding environment with AI assistance for building web applications.",
    ElevenLabs:
      "AI voice generation and cloning for professional voiceovers and audio content.",
  };

  return (
    descriptions[tool] ||
    "Recommended based on your business needs and current tool stack."
  );
}
