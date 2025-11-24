import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { generateHeadshotPrompt, generateImagePrompt, analyzeImage, generateContentVariations } from "../gemini";

/**
 * Academy tools router
 * Lite helper tools for workshop participants
 */
export const academyRouter = router({
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
});
