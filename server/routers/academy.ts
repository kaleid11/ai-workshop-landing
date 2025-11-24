import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { generateHeadshotPrompt, generateImagePrompt, analyzeImage, generateContentVariations } from "../gemini";

/**
 * Academy tools router
 * Lite helper tools for workshop participants
 */
export const academyRouter = router({
  tools: router({
  /**
   * Generate professional headshot prompt
   */
  generateHeadshot: protectedProcedure
    .input(
      z.object({
        style: z.enum(["professional", "casual", "creative"]),
        background: z.string().optional().default("neutral"),
      })
    )
    .mutation(async ({ input }) => {
      const prompt = await generateHeadshotPrompt(input.style, input.background);
      return {
        prompt,
        style: input.style,
        background: input.background,
        instructions: `Use this prompt with an AI image generator like:
- Midjourney
- DALL-E
- Stable Diffusion
- Leonardo.ai

Copy the prompt and generate your professional headshot!`,
      };
    }),

  /**
   * Analyze uploaded image and generate description
   */
  analyzeHeadshot: protectedProcedure
    .input(
      z.object({
        imageData: z.string(), // base64 encoded
        mimeType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const analysis = await analyzeImage(input.imageData, input.mimeType);
      return {
        analysis,
        suggestions: [
          "Ensure good lighting (natural light or softbox)",
          "Use a clean, uncluttered background",
          "Dress professionally for your industry",
          "Make eye contact with the camera",
          "Show genuine expression (slight smile works best)",
        ],
      };
    }),

  /**
   * Generate brand artifact prompt (logo, banner, social media graphics)
   */
  generateBrandArtifact: protectedProcedure
    .input(
      z.object({
        type: z.enum(["logo", "banner", "social_post", "thumbnail"]),
        description: z.string(),
        brandColors: z.string().optional(),
        style: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const fullDescription = `${input.type} for ${input.description}${
        input.brandColors ? ` with brand colors: ${input.brandColors}` : ""
      }${input.style ? ` in ${input.style} style` : ""}`;

      const prompt = await generateImagePrompt(fullDescription);
      
      const dimensions = {
        logo: "1024x1024 (square)",
        banner: "1920x1080 (16:9)",
        social_post: "1080x1080 (Instagram) or 1200x630 (Facebook)",
        thumbnail: "1280x720 (YouTube)",
      };

      return {
        prompt,
        type: input.type,
        recommendedDimensions: dimensions[input.type],
        tools: [
          "Canva (easiest for beginners)",
          "Adobe Express",
          "Midjourney (AI-powered)",
          "DALL-E (AI-powered)",
        ],
      };
      }),

  /**
   * Generate brand guidelines prompt from completed template
   */
  generateBrandGuidelines: protectedProcedure
    .input(
      z.object({
        brandVoice: z.string(),
        targetAudience: z.string(),
        contentTopics: z.array(z.string()),
        keywords: z.array(z.string()),
        avoidKeywords: z.array(z.string()),
        platforms: z.array(z.string()),
        postingFrequency: z.string(),
        problems: z.array(z.string()).optional(),
        results: z.array(z.string()).optional(),
        postTypes: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Generate comprehensive brand guidelines prompt
      const prompt = `# Brand Guidelines for AI Content Generation

## Brand Voice & Personality
${input.brandVoice}

## Target Audience
${input.targetAudience}

${input.problems && input.problems.length > 0 ? `### Audience Pain Points
${input.problems.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n` : ''}${input.results && input.results.length > 0 ? `### Desired Outcomes
${input.results.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\n` : ''}## Content Topics
${input.contentTopics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

${input.postTypes && input.postTypes.length > 0 ? `## Post Types That Perform Well
${input.postTypes.map(pt => `- ${pt}`).join('\n')}\n\n` : ''}## Keywords to Include
${input.keywords.map(k => `- ${k}`).join('\n')}

## Keywords to Avoid
${input.avoidKeywords.map(k => `- ${k}`).join('\n')}

## Social Media Platforms
${input.platforms.map(p => `- ${p}`).join('\n')}

## Posting Frequency
${input.postingFrequency}

---

## How to Use This Prompt

1. **Copy this entire prompt** and save it in a new chat with your AI tool (ChatGPT, Claude, Gemini, etc.)
2. **Start your conversation** by saying: "Use these brand guidelines for all content you create for me"
3. **Generate content** by asking: "Create a LinkedIn post about [topic]" or "Write 3 Instagram captions about [topic]"
4. **The AI will remember** your brand voice, audience, and guidelines throughout the conversation
5. **For ViralWave Studio**: Paste this prompt into your Brand Authority setup to train the AI on your voice

## Example Prompts to Try

- "Create 5 social media posts about [topic] following my brand guidelines"
- "Write a LinkedIn article about [topic] in my brand voice"
- "Generate 10 Instagram captions with hashtags about [topic]"
- "Create a week's worth of content for [platform] following these guidelines"
- "Repurpose this blog post into social media content for all my platforms"

Remember: The AI works best when you reference specific topics, pain points, and desired outcomes from your brand guidelines!`;

      return {
        prompt,
        downloadFilename: `brand-guidelines-${Date.now()}.txt`,
        instructions: `This prompt is ready to use with:
- ChatGPT (paste in a new chat)
- Claude (paste in a new conversation)
- Gemini (paste in a new chat)
- ViralWave Studio (paste in Brand Authority setup)
- HuxleyGPT (paste to refine your persona)

Save this prompt and reuse it whenever you need AI-generated content that matches your brand!`,
      };
    }),

  /**
   * Generate content variations for different platforms
   */
  repurposeContent: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
        platform: z.enum(["instagram", "facebook", "linkedin", "twitter", "tiktok", "youtube"]),
        count: z.number().min(1).max(5).optional().default(3),
      })
    )
    .mutation(async ({ input }) => {
      const variations = await generateContentVariations(
        input.content,
        input.platform,
        input.count
      );

      const platformTips = {
        instagram: "Use hashtags (5-10), emojis, and visual storytelling",
        facebook: "Longer form content, community engagement, questions",
        linkedin: "Professional tone, industry insights, thought leadership",
        twitter: "Concise (280 chars), trending topics, conversation starters",
        tiktok: "Short, punchy, trend-focused, call-to-action",
        youtube: "Detailed descriptions, timestamps, SEO keywords",
      };

      return {
        variations,
        platform: input.platform,
        tips: platformTips[input.platform],
        originalContent: input.content,
      };
    }),
  }),
});
