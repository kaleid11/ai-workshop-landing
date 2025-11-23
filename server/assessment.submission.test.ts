import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("Assessment Submission", () => {
  it("should accept valid assessment submission", async () => {
    const ctx: TrpcContext = {
      user: null, // Public procedure
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);

    const result = await caller.assessment.submit({
      name: "Test User",
      email: "test@example.com",
      phone: "+61400000000",
      company: "Test Company",
      assessmentType: "quick",
      score: 5,
      answers: {
        teamSize: "small",
        industry: "tech",
        toolCount: "6-10",
        budget: "500-1000",
        technical: "some-technical",
      },
      recommendations: ["ChatGPT", "Manus", "Gamma"],
      source: "test",
    });

    expect(result.success).toBe(true);
    expect(result.assessmentId).toBeGreaterThan(0);
    // PDF generation might fail in test environment, that's ok
  });

  it("should accept full scorecard assessment", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);

    const result = await caller.assessment.submit({
      name: "Test User",
      email: "test@example.com",
      assessmentType: "full",
      score: 75,
      answers: {
        question1: 100,
        question2: 75,
        question3: 50,
        dimensionScores: {
          technology: 80,
          process: 70,
          people: 75,
          security: 60,
          roi: 90,
        },
        readinessLevel: "moderate",
      },
      recommendations: ["Implement AI governance framework"],
      source: "scorecard-page",
    });

    expect(result.success).toBe(true);
    expect(result.assessmentId).toBeGreaterThan(0);
  });

  it("should require valid email", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.assessment.submit({
        name: "Test User",
        email: "invalid-email",
        assessmentType: "quick",
        score: 5,
        answers: {},
        recommendations: [],
      })
    ).rejects.toThrow();
  });

  it("should require name", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.assessment.submit({
        name: "",
        email: "test@example.com",
        assessmentType: "quick",
        score: 5,
        answers: {},
        recommendations: [],
      })
    ).rejects.toThrow();
  });
});
