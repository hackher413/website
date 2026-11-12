import type { DecisionStatus } from "@/lib/applications/review-status";
import { sendEmail } from "@/lib/email";
import {
  buildAcceptedEmail,
  buildConfirmationEmail,
  buildDeniedEmail,
} from "@/lib/emails";
import { siteConfig } from "@/lib/site";

/** Fields needed to address confirmation / decision mail. */
export type ApplicantMailTarget = {
  email: string;
  firstName: string;
  lastName?: string | null;
};

const statusUrl = `${siteConfig.url}/apply/status`;

function mailVars(target: ApplicantMailTarget) {
  return {
    firstName: target.firstName,
    lastName: target.lastName?.trim() || undefined,
    statusUrl,
  };
}

/** Confirmation after a successful submit. */
export async function sendApplicationConfirmationEmail(
  target: ApplicantMailTarget,
) {
  const built = buildConfirmationEmail(mailVars(target));
  return sendEmail({
    to: target.email,
    subject: built.subject,
    html: built.html,
    text: built.text,
    replyTo: built.replyTo,
  });
}

/** Accept / deny decision mail (Hive Admit on accept). */
export async function sendApplicationDecisionEmail(
  target: ApplicantMailTarget,
  status: DecisionStatus,
) {
  const built =
    status === "accepted"
      ? buildAcceptedEmail(mailVars(target))
      : buildDeniedEmail(mailVars(target));
  return sendEmail({
    to: target.email,
    subject: built.subject,
    html: built.html,
    text: built.text,
    replyTo: built.replyTo,
  });
}

/**
 * Submit/decision flows must not fail after the DB write if Resend is down.
 * Log and continue so applicants aren't stuck retrying a completed submit.
 */
export async function trySendApplicationConfirmationEmail(
  target: ApplicantMailTarget,
) {
  try {
    await sendApplicationConfirmationEmail(target);
  } catch (error) {
    console.error(
      "[email] confirmation failed",
      target.email,
      error instanceof Error ? error.message : error,
    );
  }
}

export async function trySendApplicationDecisionEmail(
  target: ApplicantMailTarget,
  status: DecisionStatus,
) {
  try {
    await sendApplicationDecisionEmail(target, status);
  } catch (error) {
    console.error(
      "[email] decision failed",
      status,
      target.email,
      error instanceof Error ? error.message : error,
    );
  }
}
