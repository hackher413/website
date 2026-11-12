import { beforeEach, describe, expect, it, vi } from "vitest";

const sendEmail = vi.hoisted(() => vi.fn());

vi.mock("@/lib/email", () => ({
  sendEmail,
}));

import {
  sendApplicationConfirmationEmail,
  sendApplicationDecisionEmail,
  trySendApplicationConfirmationEmail,
  trySendApplicationDecisionEmail,
} from "@/lib/applications/applicant-emails";
import { siteConfig } from "@/lib/site";

const target = {
  email: "priya@example.edu",
  firstName: "Priya",
  lastName: "Patel",
};

beforeEach(() => {
  vi.clearAllMocks();
  sendEmail.mockResolvedValue({ id: "email_123" });
});

describe("sendApplicationConfirmationEmail", () => {
  it("sends the confirmation template with status URL", async () => {
    await sendApplicationConfirmationEmail(target);

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: target.email,
        subject: expect.stringContaining("Thanks for applying"),
        html: expect.stringContaining(`${siteConfig.url}/apply/status`),
        text: expect.stringContaining("Priya"),
      }),
    );
  });
});

describe("sendApplicationDecisionEmail", () => {
  it("sends accepted mail with Hive Admit copy", async () => {
    await sendApplicationDecisionEmail(target, "accepted");

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: target.email,
        subject: expect.stringContaining("Hive Admit"),
        html: expect.stringContaining("accepted"),
      }),
    );
  });

  it("sends denied mail", async () => {
    await sendApplicationDecisionEmail(target, "denied");

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: target.email,
        subject: expect.stringContaining("application update"),
        html: expect.stringContaining("weren't able to offer you a spot"),
      }),
    );
  });
});

describe("trySend helpers", () => {
  it("swallows confirmation send failures", async () => {
    sendEmail.mockRejectedValueOnce(new Error("Resend down"));
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(
      trySendApplicationConfirmationEmail(target),
    ).resolves.toBeUndefined();

    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });

  it("swallows decision send failures", async () => {
    sendEmail.mockRejectedValueOnce(new Error("Resend down"));
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(
      trySendApplicationDecisionEmail(target, "accepted"),
    ).resolves.toBeUndefined();

    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});
