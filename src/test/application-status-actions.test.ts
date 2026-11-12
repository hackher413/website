import { beforeEach, describe, expect, it, vi } from "vitest";

const session = vi.hoisted(() => ({
  protect: vi.fn(),
  currentUser: vi.fn(),
  select: vi.fn(),
  from: vi.fn(),
  where: vi.fn(),
  limit: vi.fn(),
  update: vi.fn(),
  set: vi.fn(),
  updateWhere: vi.fn(),
  returning: vi.fn(),
  revalidatePath: vi.fn(),
  trySendDecision: vi.fn(),
  selectRows: [] as Record<string, unknown>[],
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: { protect: session.protect },
  currentUser: session.currentUser,
}));
vi.mock("next/navigation", () => ({
  forbidden: () => {
    throw new Error("403");
  },
}));
vi.mock("next/cache", () => ({
  revalidatePath: session.revalidatePath,
}));
vi.mock("@/db", () => ({
  db: {
    select: session.select,
    update: session.update,
  },
}));
vi.mock("@/lib/applications/applicant-emails", () => ({
  trySendApplicationDecisionEmail: session.trySendDecision,
}));

import {
  bulkUpdateApplicationStatus,
  flagApplication,
  updateApplicationStatus,
} from "@/app/(site)/organizer/apps/actions";

const priya = {
  id: "11111111-1111-4111-8111-111111111111",
  email: "priya@example.edu",
  firstName: "Priya",
  lastName: "Patel",
  status: "submitted",
};

beforeEach(() => {
  vi.clearAllMocks();
  session.selectRows = [priya];
  session.protect.mockResolvedValue({ userId: "user_reviewer" });
  session.currentUser.mockResolvedValue({ publicMetadata: { role: "organizer" } });
  session.select.mockReturnValue({ from: session.from });
  session.from.mockReturnValue({ where: session.where });
  session.where.mockReturnValue({ limit: session.limit });
  session.limit.mockImplementation(async () => session.selectRows);
  session.update.mockReturnValue({ set: session.set });
  session.set.mockReturnValue({ where: session.updateWhere });
  session.updateWhere.mockReturnValue({ returning: session.returning });
  session.returning.mockResolvedValue([{ id: priya.id }]);
  session.trySendDecision.mockResolvedValue(undefined);
});

describe("updateApplicationStatus", () => {
  it.each(["accepted", "denied"] as const)(
    "allows decision status %s, records audit fields, and emails once",
    async (status) => {
      await updateApplicationStatus(status, "user_priya");

      expect(session.set).toHaveBeenCalledWith(
        expect.objectContaining({
          status,
          statusUpdatedBy: "user_reviewer",
          statusUpdatedAt: expect.any(Date),
        }),
      );
      expect(session.trySendDecision).toHaveBeenCalledWith(priya, status);
      expect(session.revalidatePath).toHaveBeenCalledWith("/organizer/apps", "layout");
    },
  );

  it("skips decision email when status is unchanged", async () => {
    session.selectRows = [{ ...priya, status: "accepted" }];

    await updateApplicationStatus("accepted", "user_priya");

    expect(session.set).toHaveBeenCalled();
    expect(session.trySendDecision).not.toHaveBeenCalled();
  });

  it.each(["draft", "submitted", "waitlisted"] as const)(
    "rejects non-decision status %s",
    async (status) => {
      await expect(updateApplicationStatus(status, "user_priya")).rejects.toThrow(
        "Invalid application status.",
      );
      expect(session.update).not.toHaveBeenCalled();
      expect(session.trySendDecision).not.toHaveBeenCalled();
    },
  );

  it("rejects missing applications", async () => {
    session.selectRows = [];
    await expect(updateApplicationStatus("accepted", "missing")).rejects.toThrow(
      "Application not found.",
    );
    expect(session.update).not.toHaveBeenCalled();
  });

  it("requires an organizer", async () => {
    session.currentUser.mockResolvedValue({ publicMetadata: { role: "attendee" } });
    await expect(updateApplicationStatus("accepted", "user_priya")).rejects.toThrow("403");
    expect(session.update).not.toHaveBeenCalled();
  });
});

describe("bulkUpdateApplicationStatus", () => {
  it("updates many applications and emails only status changes", async () => {
    session.selectRows = [
      { ...priya, email: "a@example.edu", status: "submitted" },
      {
        id: "22222222-2222-4222-8222-222222222222",
        email: "b@example.edu",
        firstName: "Sam",
        lastName: "Lee",
        status: "accepted",
      },
    ];
    session.returning.mockResolvedValue([
      { id: "11111111-1111-4111-8111-111111111111" },
      { id: "22222222-2222-4222-8222-222222222222" },
    ]);

    await expect(
      bulkUpdateApplicationStatus(["user_a", "user_b", "user_a"], "accepted"),
    ).resolves.toEqual({ updated: 2 });

    expect(session.set).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "accepted",
        statusUpdatedBy: "user_reviewer",
      }),
    );
    expect(session.trySendDecision).toHaveBeenCalledTimes(1);
    expect(session.trySendDecision).toHaveBeenCalledWith(
      expect.objectContaining({ email: "a@example.edu" }),
      "accepted",
    );
    expect(session.revalidatePath).toHaveBeenCalledWith("/organizer/apps", "layout");
  });

  it("rejects waitlisted and empty selections appropriately", async () => {
    await expect(bulkUpdateApplicationStatus([], "accepted")).resolves.toEqual({
      updated: 0,
    });
    expect(session.update).not.toHaveBeenCalled();
    await expect(
      bulkUpdateApplicationStatus(["user_a"], "waitlisted"),
    ).rejects.toThrow("Invalid application status.");
  });

  it("requires an organizer", async () => {
    session.currentUser.mockResolvedValue({ publicMetadata: { role: "attendee" } });
    await expect(
      bulkUpdateApplicationStatus(["user_a"], "denied"),
    ).rejects.toThrow("403");
  });
});

describe("flagApplication", () => {
  it("flags an unflagged application and records who flagged it", async () => {
    session.selectRows = [{ flagged: false }];

    await flagApplication("user_priya");

    expect(session.set).toHaveBeenCalledWith({
      flagged: true,
      flaggedBy: "user_reviewer",
      flaggedAt: expect.any(Date),
    });
    expect(session.revalidatePath).toHaveBeenCalledWith("/organizer/apps", "layout");
  });

  it("unflags a flagged application and clears audit fields", async () => {
    session.selectRows = [{ flagged: true }];

    await flagApplication("user_priya");

    expect(session.set).toHaveBeenCalledWith({
      flagged: false,
      flaggedBy: null,
      flaggedAt: null,
    });
  });

  it("rejects missing applications", async () => {
    session.selectRows = [];
    await expect(flagApplication("missing")).rejects.toThrow("Application not found.");
    expect(session.update).not.toHaveBeenCalled();
  });

  it("requires an organizer", async () => {
    session.currentUser.mockResolvedValue({ publicMetadata: { role: "attendee" } });
    await expect(flagApplication("user_priya")).rejects.toThrow("403");
    expect(session.select).not.toHaveBeenCalled();
  });
});
