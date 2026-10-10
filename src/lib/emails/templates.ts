import {
  emailBrand,
  getReplyToAddress,
  wrapEmailHtml,
  wrapEmailText,
} from "@/lib/emails/chrome";
import { hiveAdmitImageUrl } from "@/lib/emails/hive-admit";

/**
 * Confirmation + decision templates. Bodies are copy placeholders for
 * director sign-off; all share the same chrome (from-name, header, footer).
 * Inspired by Dashboard user_mailer bodies in hackher413-2020-config.
 *
 * Acceptance mail includes a Hive Admit ticket image (see hive-admit.tsx).
 */

export type BuiltEmail = {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
};

export type ApplicantEmailVars = {
  firstName: string;
  lastName?: string;
  /** Optional CTA (e.g. status page or RSVP). */
  statusUrl?: string;
};

function greeting(firstName: string): string {
  const name = firstName.trim() || "there";
  return `Hi ${name},`;
}

function p(html: string): string {
  return `<p style="margin:0 0 16px;">${html}</p>`;
}

function cta(href: string, label: string): string {
  return `<p style="margin:24px 0 8px;">
  <a href="${href}" style="display:inline-block;padding:12px 20px;background-color:#1b1210;color:#fbf6ee;text-decoration:none;border-radius:6px;font-family:Georgia,'Times New Roman',serif;font-size:15px;">${label}</a>
</p>`;
}

/** Application submitted — confirmation. */
export function buildConfirmationEmail(vars: ApplicantEmailVars): BuiltEmail {
  const { name, cycleYear } = emailBrand;
  const subject = `Thanks for applying to ${name} ${cycleYear}`;
  const statusLine = vars.statusUrl
    ? p(
        `You can check your application status anytime: <a href="${vars.statusUrl}" style="color:#5a4326;">${vars.statusUrl}</a>.`,
      )
    : "";

  const bodyHtml = [
    p(greeting(vars.firstName)),
    p(
      `Thanks so much for submitting your application for <strong>${name} ${cycleYear}</strong>. We'll review it and email you when there's an update.`,
    ),
    statusLine,
    p(`We hope to see you soon,<br />The ${name} Team`),
  ].join("");

  const bodyText = [
    greeting(vars.firstName),
    "",
    `Thanks so much for submitting your application for ${name} ${cycleYear}. We'll review it and email you when there's an update.`,
    vars.statusUrl ? `\nCheck your status: ${vars.statusUrl}` : "",
    "",
    `We hope to see you soon,`,
    `The ${name} Team`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject,
    html: wrapEmailHtml({
      title: "Application received",
      preheader: `We got your ${name} ${cycleYear} application.`,
      bodyHtml,
    }),
    text: wrapEmailText(bodyText),
    replyTo: getReplyToAddress(),
  };
}

/** Organizer accepted the application — includes Hive Admit ticket. */
export function buildAcceptedEmail(vars: ApplicantEmailVars): BuiltEmail {
  const { name, cycleYear, url } = emailBrand;
  const subject = `You're in! Your ${name} ${cycleYear} Hive Admit`;
  const ticketUrl = hiveAdmitImageUrl({
    firstName: vars.firstName,
    lastName: vars.lastName,
  });
  const linkHref = vars.statusUrl || url;
  const nextStep = vars.statusUrl
    ? cta(vars.statusUrl, "View your status")
    : cta(url, `Visit ${name}`);

  const ticketHtml = `<p style="margin:0 0 20px;">
  <a href="${linkHref}" style="text-decoration:none;">
    <img src="${ticketUrl}" alt="Your ${name} Hive Admit ticket" width="560" style="display:block;width:100%;max-width:560px;height:auto;border:0;border-radius:8px;" />
  </a>
</p>`;

  const bodyHtml = [
    p(greeting(vars.firstName)),
    p(
      `Welcome to the hive — you've been <strong>accepted</strong> to <strong>${name} ${cycleYear}</strong>. Here's your Hive Admit:`,
    ),
    ticketHtml,
    p(
      `${name} ${cycleYear} is <strong>${emailBrand.eventDates}</strong> at UMass Amherst. Next steps (travel, Discord, day-of) will land here and on our site.`,
    ),
    nextStep,
    p(`We're excited to build with you.<br />— The ${name} Team`),
  ].join("");

  const bodyText = [
    greeting(vars.firstName),
    "",
    `Welcome to the hive — you've been accepted to ${name} ${cycleYear}.`,
    "",
    `Your Hive Admit: ${ticketUrl}`,
    "",
    `${name} ${cycleYear} is ${emailBrand.eventDates} at UMass Amherst. Next steps will land here and on our site.`,
    vars.statusUrl ? `\nStatus: ${vars.statusUrl}` : `\nWebsite: ${url}`,
    "",
    `We're excited to build with you.`,
    `— The ${name} Team`,
  ].join("\n");

  return {
    subject,
    html: wrapEmailHtml({
      title: "Hive Admit",
      preheader: `You're in for ${name} ${cycleYear} — open for your ticket.`,
      bodyHtml,
    }),
    text: wrapEmailText(bodyText),
    replyTo: getReplyToAddress(),
  };
}

/** Organizer denied the application. */
export function buildDeniedEmail(vars: ApplicantEmailVars): BuiltEmail {
  const { name, cycleYear } = emailBrand;
  const subject = `${name} ${cycleYear} application update`;

  const bodyHtml = [
    p(greeting(vars.firstName)),
    p(`Thanks for applying to <strong>${name} ${cycleYear}</strong>.`),
    p(
      `Unfortunately we don't have enough space to accept everyone this year, and we weren't able to offer you a spot.`,
    ),
    p(
      `We hope you'll keep hacking and consider applying again next year — your enthusiasm means a lot to us.`,
    ),
    p(`— The ${name} Team`),
  ].join("");

  const bodyText = [
    greeting(vars.firstName),
    "",
    `Thanks for applying to ${name} ${cycleYear}.`,
    "",
    `Unfortunately we don't have enough space to accept everyone this year, and we weren't able to offer you a spot.`,
    "",
    `We hope you'll keep hacking and consider applying again next year — your enthusiasm means a lot to us.`,
    "",
    `— The ${name} Team`,
  ].join("\n");

  return {
    subject,
    html: wrapEmailHtml({
      title: "Application update",
      preheader: `An update on your ${name} ${cycleYear} application.`,
      bodyHtml,
    }),
    text: wrapEmailText(bodyText),
    replyTo: getReplyToAddress(),
  };
}

export const emailTemplateIds = [
  "confirmation",
  "accepted",
  "denied",
] as const;

export type EmailTemplateId = (typeof emailTemplateIds)[number];

export function buildEmailTemplate(
  id: EmailTemplateId,
  vars: ApplicantEmailVars,
): BuiltEmail {
  switch (id) {
    case "confirmation":
      return buildConfirmationEmail(vars);
    case "accepted":
      return buildAcceptedEmail(vars);
    case "denied":
      return buildDeniedEmail(vars);
  }
}
