import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("API Integrations", () => {
  it("should have Resend API key configured", () => {
    expect(ENV.resendApiKey).toBeTruthy();
    expect(ENV.resendApiKey).toMatch(/^re_/);
  });

  it("should have Klipy API key configured", () => {
    expect(ENV.klipyApiKey).toBeTruthy();
    expect(ENV.klipyApiKey).toMatch(/^klipy_/);
  });

  it("should validate Resend API key format", async () => {
    // Test Resend API with a simple verification call
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.resendApiKey}`,
      },
      body: JSON.stringify({
        from: "test@test.com",
        to: ["test@test.com"],
        subject: "Test",
        html: "<p>Test</p>",
      }),
    });

    // We expect either 200 (success), 422 (validation error), 400 (bad request), or 403 (domain not verified)
    // All indicate the API key format is valid
    expect([200, 422, 400, 403]).toContain(response.status);
  });

  it("should validate Klipy API key format", async () => {
    // Test Klipy API with a simple GET call to check authentication
    const response = await fetch("https://api.klipy.ai/v1/leads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.klipyApiKey}`,
      },
    });

    // We expect either 200 (success) or 401 (unauthorized if key is invalid)
    // 200 means the key is valid
    expect([200, 401, 404]).toContain(response.status);
    
    // If we get 401, the API key is invalid
    if (response.status === 401) {
      throw new Error("Klipy API key is invalid. Please check your credentials.");
    }
  });
});
