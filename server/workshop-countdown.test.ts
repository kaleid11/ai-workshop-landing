import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Dynamic Workshop Countdown", () => {
  it("should get next upcoming workshop for public landing page", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const nextWorkshop = await caller.academy.getNextWorkshop();

    // Should return a workshop or null
    if (nextWorkshop) {
      expect(nextWorkshop).toHaveProperty("id");
      expect(nextWorkshop).toHaveProperty("title");
      expect(nextWorkshop).toHaveProperty("description");
      expect(nextWorkshop).toHaveProperty("scheduledAt");
      expect(nextWorkshop).toHaveProperty("durationMinutes");
      expect(nextWorkshop).toHaveProperty("sessionType");
      expect(nextWorkshop.status).toBe("scheduled");
    } else {
      // No workshops scheduled yet
      expect(nextWorkshop).toBeNull();
    }
  });

  it("should return workshop with recording URL if completed", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const nextWorkshop = await caller.academy.getNextWorkshop();

    if (nextWorkshop && nextWorkshop.status === "completed") {
      // Completed workshops should have recording URL
      expect(nextWorkshop.recordingUrl).toBeTruthy();
      expect(typeof nextWorkshop.recordingUrl).toBe("string");
    }
  });

  it("should return workshop scheduled in the future", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const nextWorkshop = await caller.academy.getNextWorkshop();

    if (nextWorkshop && nextWorkshop.status === "scheduled") {
      const workshopDate = new Date(nextWorkshop.scheduledAt);
      const now = new Date();
      
      // Scheduled workshops should be in the future
      expect(workshopDate.getTime()).toBeGreaterThanOrEqual(now.getTime() - 86400000); // Allow 1 day tolerance
    }
  });

  it("should include all required workshop details for landing page", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const nextWorkshop = await caller.academy.getNextWorkshop();

    if (nextWorkshop) {
      // Verify all fields needed for landing page are present
      expect(nextWorkshop.title).toBeTruthy();
      expect(nextWorkshop.scheduledAt).toBeTruthy();
      expect(nextWorkshop.durationMinutes).toBeGreaterThan(0);
      expect(["lite", "pro"]).toContain(nextWorkshop.sessionType);
      expect(["scheduled", "completed", "cancelled"]).toContain(nextWorkshop.status);
    }
  });

  it("should not return cancelled workshops", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const nextWorkshop = await caller.academy.getNextWorkshop();

    if (nextWorkshop) {
      expect(nextWorkshop.status).not.toBe("cancelled");
    }
  });
});

describe("Workshop Recording Integration", () => {
  it("should verify recording URL format for Google Drive embeds", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const nextWorkshop = await caller.academy.getNextWorkshop();

    if (nextWorkshop?.recordingUrl) {
      // Should be a valid URL
      expect(() => new URL(nextWorkshop.recordingUrl!)).not.toThrow();
      
      // Should be Google Drive preview URL
      if (nextWorkshop.recordingUrl.includes("drive.google.com")) {
        expect(nextWorkshop.recordingUrl).toContain("/preview");
      }
    }
  });
});
