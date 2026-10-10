import { brand } from "@/lib/design/tokens";
import { siteConfig } from "@/lib/site";

/**
 * Shared email chrome (header / footer / from-name) for confirmation + decision
 * mail. Modeled on the old Dashboard mailer shell: one wrapper, body slots in.
 * @see https://github.com/hackher413/dashboard
 */

export const emailBrand = {
  name: siteConfig.name,
  /** Cycle the application emails refer to (next event). */
  cycleYear: 2027,
  /** Display date range on Hive Admit + decision copy. */
  eventDates: "February 27–28, 2027",
  /** Short form for ticket meta row. */
  eventDatesShort: "Feb 27–28, 2027",
  url: siteConfig.url,
  /** Human contact inbox (also default Reply-To). */
  contactEmail: siteConfig.social.email.replace(/^mailto:/i, ""),
  /** Display name shown in inboxes when RESEND_FROM_EMAIL is unset/malformed. */
  fromDisplayName: siteConfig.name,
  /**
   * Absolute logo URL for email clients (relative /public paths do not work).
   * Uses the on-dark mark for the espresso header band.
   */
  logoUrl: `${siteConfig.url}/brand/logo-on-dark.png`,
} as const;

export type EmailChromeInput = {
  /** Short title in the header band. */
  title: string;
  /** Optional preview text (inbox snippet). */
  preheader?: string;
  /** Inner HTML (paragraphs / CTA). No outer document. */
  bodyHtml: string;
};

/**
 * Parse `Name <addr@domain>` from RESEND_FROM_EMAIL; fall back to brand name.
 */
export function getFromDisplayName(): string {
  const raw = process.env.RESEND_FROM_EMAIL?.trim();
  if (!raw) return emailBrand.fromDisplayName;
  const match = raw.match(/^(.+?)\s*<[^>]+>$/);
  if (match?.[1]) return match[1].replace(/^["']|["']$/g, "").trim();
  return emailBrand.fromDisplayName;
}

/** Default Reply-To for applicant-facing mail. */
export function getReplyToAddress(): string {
  return (
    process.env.RESEND_REPLY_TO?.trim() || emailBrand.contactEmail
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Table-based HTML shell with inline styles (email-client safe).
 */
export function wrapEmailHtml(input: EmailChromeInput): string {
  const title = escapeHtml(input.title);
  const preheader = input.preheader
    ? `<div style="display:none;font-size:1px;color:${brand.cream};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(input.preheader)}</div>`
    : "";

  const footerHtml = `
    <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.5;color:${brand.brown};">
      Questions? Email
      <a href="mailto:${escapeHtml(emailBrand.contactEmail)}" style="color:${brand.brown};">${escapeHtml(emailBrand.contactEmail)}</a>
      or visit
      <a href="${escapeHtml(emailBrand.url)}" style="color:${brand.brown};">${escapeHtml(emailBrand.url.replace(/^https?:\/\//, ""))}</a>.
    </p>
    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:12px;line-height:1.5;color:${brand.brown};opacity:0.85;">
      — The ${escapeHtml(emailBrand.name)} Team
    </p>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:${brand.cream};">
  ${preheader}
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${brand.cream};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid ${brand.sky};">
          <tr>
            <td style="background-color:${brand.espresso};padding:20px 24px;">
              <a href="${escapeHtml(emailBrand.url)}" style="text-decoration:none;">
                <img
                  src="${escapeHtml(emailBrand.logoUrl)}"
                  width="180"
                  alt="${escapeHtml(emailBrand.name)}"
                  style="display:block;width:180px;max-width:70%;height:auto;border:0;outline:none;"
                />
              </a>
              <p style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.4;color:${brand.honey};">
                ${title}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:${brand.brown};">
              ${input.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px 24px;border-top:1px solid ${brand.sky};background-color:${brand.honeySoft};">
              ${footerHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plain-text footer shared by all templates. */
export function emailFooterText(): string {
  return [
    `Questions? Email ${emailBrand.contactEmail} or visit ${emailBrand.url}.`,
    `— The ${emailBrand.name} Team`,
  ].join("\n");
}

export function wrapEmailText(body: string): string {
  return `${body.trim()}\n\n---\n${emailFooterText()}\n`;
}
