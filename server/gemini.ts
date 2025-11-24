import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Generate text using Gemini language models
 */
export async function generateText(prompt: string, model: string = "gemini-2.5-flash"): Promise<string> {
  const geminiModel = genAI.getGenerativeModel({ model });
  const result = await geminiModel.generateContent(prompt);
  const response = result.response;
  return response.text();
}

/**
 * Generate image using Gemini Imagen models
 * Note: As of Nov 2024, Gemini doesn't have direct image generation.
 * This is a placeholder for when the feature becomes available.
 * For now, we'll use text-to-image description generation.
 */
export async function generateImagePrompt(description: string): Promise<string> {
  const prompt = `Create a detailed, professional image generation prompt for: ${description}
  
Include:
- Visual style and composition
- Lighting and atmosphere
- Color palette
- Technical details (resolution, aspect ratio)
- Artistic style

Return only the prompt, no explanations.`;

  return await generateText(prompt);
}

/**
 * Analyze image and generate description
 * Uses Gemini's vision capabilities
 */
export async function analyzeImage(imageData: string, mimeType: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const result = await model.generateContent([
    {
      inlineData: {
        data: imageData,
        mimeType,
      },
    },
    "Analyze this image and provide a detailed description including: subject, composition, style, colors, and mood.",
  ]);
  
  return result.response.text();
}

/**
 * Generate brand content variations
 */
export async function generateContentVariations(
  originalContent: string,
  platform: string,
  count: number = 3
): Promise<string[]> {
  const prompt = `Given this content: "${originalContent}"

Generate ${count} variations optimized for ${platform}.

Requirements:
- Maintain core message and brand voice
- Adapt tone and format for ${platform}
- Include relevant hashtags/emojis where appropriate
- Keep within platform character limits

Return as JSON array of strings.`;

  const response = await generateText(prompt);
  
  try {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = response.match(/```json\s*([\s\S]*?)```/) || response.match(/```\s*([\s\S]*?)```/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[1].trim());
      return Array.isArray(parsed) ? parsed : [response];
    }
    
    // Try to parse as direct JSON
    const parsed = JSON.parse(response);
    return Array.isArray(parsed) ? parsed : [response];
  } catch {
    // If not valid JSON, split by newlines and filter empty lines
    const lines = response.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0 && 
             !trimmed.startsWith('```') && 
             !trimmed.startsWith('[') && 
             !trimmed.startsWith(']') &&
             !trimmed.startsWith('{') &&
             !trimmed.startsWith('}');
    });
    return lines.slice(0, count);
  }
}

/**
 * Generate professional headshot description/prompt
 */
export async function generateHeadshotPrompt(
  style: "professional" | "casual" | "creative",
  background: string = "neutral"
): Promise<string> {
  const styleDescriptions = {
    professional: "Business professional attire, confident pose, clean lighting, corporate headshot style",
    casual: "Smart casual attire, relaxed pose, natural lighting, approachable and friendly",
    creative: "Artistic composition, unique styling, creative lighting, expressive and dynamic"
  };

  const prompt = `Create a detailed prompt for generating a ${style} headshot with ${background} background.

Style: ${styleDescriptions[style]}
Background: ${background}

Include specific details about:
- Pose and expression
- Lighting setup
- Camera angle
- Background elements
- Overall mood

Return only the image generation prompt.`;

  return await generateText(prompt);
}

/**
 * Test Gemini API connection
 */
export async function testGeminiConnection(): Promise<boolean> {
  try {
    const result = await generateText("Say 'Hello from Gemini API'");
    return result.toLowerCase().includes("hello");
  } catch (error) {
    console.error("Gemini API test failed:", error);
    return false;
  }
}
