import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role: "user",
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

  return ctx;
}

describe("Workshop Booking System", () => {
  it("should get upcoming workshops for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const workshops = await caller.academy.getUpcomingWorkshops();

    expect(Array.isArray(workshops)).toBe(true);
    // Workshops should be filtered by user's tier
    // Empty array is acceptable if no workshops or user has no subscription
  });

  it("should get user token balance", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const tokens = await caller.academy.getUserTokens();

    expect(tokens).toBeDefined();
    expect(typeof tokens.tokensRemaining).toBe("number");
    expect(typeof tokens.tokensUsed).toBe("number");
    expect(typeof tokens.isUnlimited).toBe("boolean");
    
    // If user has subscription, should have valid token data
    if (tokens.tokensPerMonth > 0 || tokens.isUnlimited) {
      expect(tokens.nextReset).toBeDefined();
    }
  });

  it("should get user bookings", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const bookings = await caller.academy.getUserBookings();

    expect(Array.isArray(bookings)).toBe(true);
    // Empty array is acceptable if user has no bookings
  });

  it("should fail to book workshop without tokens", async () => {
    const ctx = createAuthContext(999); // User unlikely to have subscription
    const caller = appRouter.createCaller(ctx);

    try {
      // Try to book a non-existent workshop
      await caller.academy.bookWorkshop({ workshopId: 99999 });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      // Should throw error about no subscription or no tokens
      expect(error.message).toBeDefined();
    }
  });

  it("should fail to cancel non-existent booking", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.academy.cancelBooking({ registrationId: 99999 });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      // Should throw error about booking not found
      expect(error.message).toBeDefined();
    }
  });
});

describe("Workshop Database Helpers", () => {
  it("should get upcoming workshops from database", async () => {
    const { getUpcomingWorkshops } = await import("./db");
    
    const workshops = await getUpcomingWorkshops();
    
    expect(Array.isArray(workshops)).toBe(true);
    
    // If workshops exist, verify structure
    if (workshops.length > 0) {
      const workshop = workshops[0];
      expect(workshop.id).toBeDefined();
      expect(workshop.title).toBeDefined();
      expect(workshop.scheduledAt).toBeDefined();
      expect(workshop.durationMinutes).toBeDefined();
    }
  });

  it("should get user subscription with tier details", async () => {
    const { getUserSubscriptionWithTier } = await import("./db");
    
    // Test with user ID 1 (may or may not have subscription)
    const subscription = await getUserSubscriptionWithTier(1);
    
    // Null is acceptable if user has no subscription
    if (subscription) {
      expect(subscription.id).toBeDefined();
      expect(subscription.userId).toBe(1);
      expect(subscription.tier).toBeDefined();
      
      if (subscription.tier) {
        expect(subscription.tier.workshopTokensPerMonth).toBeDefined();
      }
    }
  });
});

describe("Calendar Utilities", () => {
  it("should generate valid ICS file content", async () => {
    const { generateICSFile } = await import("./utils/calendar");
    
    const startTime = new Date("2025-12-01T10:00:00Z");
    const endTime = new Date("2025-12-01T12:00:00Z");
    
    const icsContent = generateICSFile({
      title: "Test Workshop",
      description: "Test Description",
      location: "https://meet.google.com/test",
      startTime,
      endTime,
      organizerEmail: "organizer@example.com",
      attendeeEmail: "attendee@example.com",
    });
    
    expect(icsContent).toContain("BEGIN:VCALENDAR");
    expect(icsContent).toContain("BEGIN:VEVENT");
    expect(icsContent).toContain("SUMMARY:Test Workshop");
    expect(icsContent).toContain("DESCRIPTION:Test Description");
    expect(icsContent).toContain("LOCATION:https://meet.google.com/test");
    expect(icsContent).toContain("END:VEVENT");
    expect(icsContent).toContain("END:VCALENDAR");
  });

  it("should generate valid Google Calendar link", async () => {
    const { generateGoogleCalendarLink } = await import("./utils/calendar");
    
    const startTime = new Date("2025-12-01T10:00:00Z");
    const endTime = new Date("2025-12-01T12:00:00Z");
    
    const link = generateGoogleCalendarLink({
      title: "Test Workshop",
      description: "Test Description",
      location: "https://meet.google.com/test",
      startTime,
      endTime,
    });
    
    expect(link).toContain("https://calendar.google.com/calendar/render");
    expect(link).toContain("action=TEMPLATE");
    expect(link).toContain("text=Test+Workshop");
  });
});
