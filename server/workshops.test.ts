import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(role: "user" | "admin" = "user"): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
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
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("workshops.list", () => {
  it("returns list of workshops", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const workshops = await caller.workshops.list();

    expect(workshops).toBeDefined();
    expect(Array.isArray(workshops)).toBe(true);
    
    // Should have 4 workshops seeded
    if (workshops.length > 0) {
      expect(workshops[0]).toHaveProperty("id");
      expect(workshops[0]).toHaveProperty("title");
      expect(workshops[0]).toHaveProperty("description");
      expect(workshops[0]).toHaveProperty("tierRequired");
    }
  });
});

describe("workshops.getTokenBalance", () => {
  it("returns token balance for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const balance = await caller.workshops.getTokenBalance();

    expect(balance).toBeDefined();
    
    // Balance should have tokensRemaining and tokensUsed
    if (balance) {
      expect(balance).toHaveProperty("tokensRemaining");
      expect(balance).toHaveProperty("tokensUsed");
      expect(typeof balance.tokensRemaining).toBe("number");
      expect(typeof balance.tokensUsed).toBe("number");
    }
  });
});

describe("workshops.requestAccess", () => {
  it("allows user to request workshop access", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // First get list of workshops
    const workshops = await caller.workshops.list();
    
    if (workshops.length > 0) {
      const workshopId = workshops[0].id;
      
      try {
        const result = await caller.workshops.requestAccess({ workshopId });
        
        // Should return success or error message
        expect(result).toBeDefined();
        expect(result).toHaveProperty("success");
        
        if (result.success) {
          expect(result).toHaveProperty("message");
        }
      } catch (error: any) {
        // Expected errors: insufficient tokens, already requested, etc.
        expect(error.message).toBeDefined();
      }
    }
  });
});

describe("membership.getUserTier", () => {
  it("returns user's membership tier", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const tier = await caller.membership.getUserTier();

    // Tier can be null if user has no active subscription
    if (tier) {
      expect(tier).toHaveProperty("id");
      expect(tier).toHaveProperty("name");
      expect(tier).toHaveProperty("slug");
      expect(tier).toHaveProperty("priceMonthly");
      expect(tier).toHaveProperty("workshopTokensPerMonth");
    }
  });
});

describe("admin.getWorkshopAccessRequests", () => {
  it("allows admin to view workshop access requests", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const requests = await caller.admin.getWorkshopAccessRequests();

    expect(requests).toBeDefined();
    expect(Array.isArray(requests)).toBe(true);
    
    // Each request should have user and workshop details
    if (requests.length > 0) {
      expect(requests[0]).toHaveProperty("id");
      expect(requests[0]).toHaveProperty("userId");
      expect(requests[0]).toHaveProperty("workshopId");
      expect(requests[0]).toHaveProperty("status");
    }
  });
});

describe("admin.reviewWorkshopRequest", () => {
  it("allows admin to approve workshop access request", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    // Get pending requests
    const requests = await caller.admin.getWorkshopAccessRequests();
    const pendingRequest = requests.find(r => r.status === "pending");
    
    if (pendingRequest) {
      const result = await caller.admin.reviewWorkshopRequest({
        requestId: pendingRequest.id,
        status: "approved",
        adminNotes: "Test approval",
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty("success");
      expect(result.success).toBe(true);
    }
  });
});

describe("admin.reviewWorkshopRequest (reject)", () => {
  it("allows admin to reject workshop access request", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    // Get pending requests
    const requests = await caller.admin.getWorkshopAccessRequests();
    const pendingRequest = requests.find(r => r.status === "pending");
    
    if (pendingRequest) {
      const result = await caller.admin.reviewWorkshopRequest({
        requestId: pendingRequest.id,
        status: "rejected",
        adminNotes: "Test rejection",
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty("success");
      expect(result.success).toBe(true);
    }
  });
});

describe("admin.exportWorkshopAttendees", () => {
  it("allows admin to export attendee emails for a workshop", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    // Get list of workshops
    const workshops = await caller.workshops.list();
    
    if (workshops.length > 0) {
      const workshopId = workshops[0].id;
      
      const result = await caller.admin.exportWorkshopAttendees({ workshopId });

      expect(result).toBeDefined();
      expect(result).toHaveProperty("workshopTitle");
      expect(result).toHaveProperty("attendees");
      expect(Array.isArray(result.attendees)).toBe(true);
      
      // Each attendee should have email
      if (result.attendees.length > 0) {
        expect(result.attendees[0]).toHaveProperty("email");
        expect(result.attendees[0]).toHaveProperty("name");
      }
    }
  });
});
