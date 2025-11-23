import { ENV } from "./_core/env";

/**
 * Push lead to Klipy CRM
 * @param lead - Lead data to push to CRM
 * @returns Response from Klipy API
 */
export async function pushLeadToKlipy({
  email,
  name,
  phone = "",
  source = "AI Assessment",
  notes = "",
  customFields = {},
}: {
  email: string;
  name: string;
  phone?: string;
  source?: string;
  notes?: string;
  customFields?: Record<string, any>;
}) {
  const apiKey = ENV.klipyApiKey;

  if (!apiKey) {
    console.error("[Klipy] API key not configured");
    throw new Error("Klipy API key not configured");
  }

  try {
    const response = await fetch("https://api.klipy.ai/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        source,
        notes,
        custom_fields: customFields,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Klipy] API error:", error);
      throw new Error(`Klipy API error: ${response.status} ${error}`);
    }

    const data = await response.json();
    console.log("[Klipy] Lead pushed successfully:", data);
    return data;
  } catch (error) {
    console.error("[Klipy] Failed to push lead:", error);
    throw error;
  }
}

/**
 * Push assessment lead to Klipy CRM with assessment details
 */
export async function pushAssessmentLead({
  email,
  name,
  phone = "",
  assessmentType,
  score,
  recommendations,
}: {
  email: string;
  name: string;
  phone?: string;
  assessmentType: "quick" | "full";
  score: number;
  recommendations: string[];
}) {
  const notes = `
Assessment Type: ${assessmentType === "quick" ? "Quick Tool Audit" : "Full AI Readiness Scorecard"}
Score: ${score}${assessmentType === "full" ? "/100" : ""}
Recommended Tools: ${recommendations.join(", ")}
  `.trim();

  return pushLeadToKlipy({
    email,
    name,
    phone,
    source: `AI Assessment - ${assessmentType === "quick" ? "Quick" : "Full"}`,
    notes,
    customFields: {
      assessment_type: assessmentType,
      assessment_score: score,
      recommended_tools: recommendations.join(", "),
      assessment_date: new Date().toISOString(),
    },
  });
}
