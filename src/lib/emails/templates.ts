import {
  emailBrand,
  getReplyToAddress,
  wrapEmailHtml,
  wrapEmailText,
} from "@/lib/emails/chrome";

/**
 * Confirmation + decision templates. Bodies are copy placeholders for
 * director sign-off; all share the same chrome (from-name, header, footer).
 * Inspired by Dashboard user_mailer bodies in hackher413-2020-config.
 */

export type BuiltEmail = {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
};

export type ApplicantEmailVars = {
  firstName: string;
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

/** Organizer accepted the application. */
export function buildAcceptedEmail(vars: ApplicantEmailVars): BuiltEmail {
  const { name, cycleYear, url } = emailBrand;
  const subject = `Congratulations! You're in for ${name} ${cycleYear}`;
  const nextStep = vars.statusUrl
    ? cta(vars.statusUrl, "View your status")
    : cta(url, `Visit ${name}`);

  const bodyHtml = [
    p(greeting(vars.firstName)),
    p(
      `Congratulations — you've been <strong>accepted</strong> to participate in <strong>${name} ${cycleYear}</strong>!`,
    ),
    p(
      `Next steps and event details will be on our site. Keep an eye on this inbox for travel, Discord, and day-of info.`,
    ),
    nextStep,
    p(`We're excited to build with you.<br />— The ${name} Team`),
  ].join("");

  const bodyText = [
    greeting(vars.firstName),
    "",
    `Congratulations — you've been accepted to participate in ${name} ${cycleYear}!`,
    "",
    `Next steps and event details will be on our site. Keep an eye on this inbox for travel, Discord, and day-of info.`,
    vars.statusUrl ? `\nStatus: ${vars.statusUrl}` : `\nWebsite: ${url}`,
    "",
    `We're excited to build with you.`,
    `— The ${name} Team`,
  ].join("\n");

  return {
    subject,
    html: wrapEmailHtml({
      title: "You're accepted",
      preheader: `Welcome to ${name} ${cycleYear}.`,
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
