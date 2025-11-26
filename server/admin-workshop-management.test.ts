import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AdminUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
  const user: AdminUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
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

describe("Admin Workshop Management", () => {
  it("should get all workshops for admin", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const workshops = await caller.admin.getAllWorkshops();

    expect(Array.isArray(workshops)).toBe(true);
    // Workshops may be empty if none created yet
  });

  it("should create a new workshop", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const scheduledAt = new Date();
    scheduledAt.setDate(scheduledAt.getDate() + 7); // 7 days from now

    const result = await caller.admin.createWorkshop({
      title: "Test Workshop",
      description: "Test workshop description",
      pillarId: 1,
      scheduledAt: scheduledAt.toISOString(),
      durationMinutes: 120,
      maxAttendees: 20,
      sessionType: "lite",
      googleMeetUrl: "https://meet.google.com/test-123",
    });

    expect(result.success).toBe(true);
  });

  it("should get workshop attendees", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Get all workshops first
    const workshops = await caller.admin.getAllWorkshops();
    
    if (workshops.length > 0) {
      const attendees = await caller.admin.getWorkshopAttendees({
        workshopId: workshops[0]!.id,
      });

      expect(Array.isArray(attendees)).toBe(true);
      // Attendees may be empty if no one registered
    }
  });

  it("should update workshop details", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Get all workshops first
    const workshops = await caller.admin.getAllWorkshops();
    
    if (workshops.length > 0) {
      const result = await caller.admin.updateWorkshop({
        id: workshops[0]!.id,
        title: "Updated Workshop Title",
        description: "Updated description",
      });

      expect(result.success).toBe(true);
    }
  });

  it("should fail to create workshop without admin role", async () => {
    const { ctx } = createAdminContext();
    // Change role to regular user
    ctx.user!.role = "user";
    const caller = appRouter.createCaller(ctx);

    const scheduledAt = new Date();
    scheduledAt.setDate(scheduledAt.getDate() + 7);

    await expect(
      caller.admin.createWorkshop({
        title: "Test Workshop",
        pillarId: 1,
        scheduledAt: scheduledAt.toISOString(),
        durationMinutes: 120,
        sessionType: "lite",
      })
    ).rejects.toThrow("Unauthorized");
  });

  it("should fail to get workshops without admin role", async () => {
    const { ctx } = createAdminContext();
    // Change role to regular user
    ctx.user!.role = "user";
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.getAllWorkshops()).rejects.toThrow("Unauthorized");
  });
});

describe("Workshop Database Helpers", () => {
  it("should validate workshop creation with all required fields", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const scheduledAt = new Date();
    scheduledAt.setDate(scheduledAt.getDate() + 14);

    const result = await caller.admin.createWorkshop({
      title: "Complete Workshop",
      description: "Full workshop with all fields",
      pillarId: 1,
      scheduledAt: scheduledAt.toISOString(),
      durationMinutes: 90,
      maxAttendees: 15,
      sessionType: "pro",
      googleMeetUrl: "https://meet.google.com/complete-test",
    });

    expect(result.success).toBe(true);
  });

  it("should create workshop without optional fields", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const scheduledAt = new Date();
    scheduledAt.setDate(scheduledAt.getDate() + 10);

    const result = await caller.admin.createWorkshop({
      title: "Minimal Workshop",
      pillarId: 1,
      scheduledAt: scheduledAt.toISOString(),
      durationMinutes: 60,
      sessionType: "lite",
    });

    expect(result.success).toBe(true);
  });
});
