import { describe, expect, it } from "vitest";
import { generateText, testGeminiConnection } from "./gemini";

describe("Gemini API Integration", () => {
  it("should have Gemini API key configured", () => {
    expect(process.env.GEMINI_API_KEY).toBeDefined();
    expect(process.env.GEMINI_API_KEY).not.toBe("");
  });

  it("should successfully connect to Gemini API", async () => {
    const isConnected = await testGeminiConnection();
    expect(isConnected).toBe(true);
  }, 30000); // 30 second timeout for API call

  it("should generate text from prompt", async () => {
    const result = await generateText("What is 2+2? Answer with just the number.");
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("4");
  }, 30000);
});
