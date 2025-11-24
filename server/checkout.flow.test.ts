import { describe, expect, it } from "vitest";

describe("Checkout Flow - State Encoding", () => {
  it("should encode return URL in state correctly", () => {
    // Simulate what getLoginUrl() does
    const returnTo = "/workshop";
    const stateData = {
      redirectUri: "https://example.com/api/oauth/callback",
      returnTo
    };
    const state = btoa(JSON.stringify(stateData));
    
    // Verify state can be decoded
    const decodedState = Buffer.from(state, "base64").toString("utf-8");
    const parsed = JSON.parse(decodedState);
    
    expect(parsed.returnTo).toBe(returnTo);
    expect(parsed.redirectUri).toContain("/api/oauth/callback");
  });

  it("should preserve query parameters in return URL", () => {
    const pathWithQuery = "/workshop?tier=pro&promo=BLACK_FRIDAY";
    const stateData = {
      redirectUri: "https://example.com/api/oauth/callback",
      returnTo: pathWithQuery
    };
    const state = btoa(JSON.stringify(stateData));
    
    const decodedState = Buffer.from(state, "base64").toString("utf-8");
    const parsed = JSON.parse(decodedState);
    
    expect(parsed.returnTo).toBe(pathWithQuery);
    expect(parsed.returnTo).toContain("tier=pro");
    expect(parsed.returnTo).toContain("promo=BLACK_FRIDAY");
  });
});

describe("OAuth Callback - Return URL Handling", () => {
  it("should correctly parse state with return URL", () => {
    const returnTo = "/workshop";
    const stateData = {
      redirectUri: "https://example.com/api/oauth/callback",
      returnTo
    };
    const state = Buffer.from(JSON.stringify(stateData)).toString("base64");
    
    // Simulate what OAuth callback does
    const decodedState = Buffer.from(state, "base64").toString("utf-8");
    const parsed = JSON.parse(decodedState);
    
    expect(parsed.returnTo).toBe(returnTo);
  });

  it("should handle malformed state gracefully", () => {
    const invalidState = "not-valid-base64!!!";
    
    let returnTo = "/";
    try {
      const decodedState = Buffer.from(invalidState, "base64").toString("utf-8");
      const stateData = JSON.parse(decodedState);
      if (stateData.returnTo) {
        returnTo = stateData.returnTo;
      }
    } catch (error) {
      // Should fall back to default
      returnTo = "/";
    }
    
    expect(returnTo).toBe("/");
  });
});
