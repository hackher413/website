export {
  emailBrand,
  getFromDisplayName,
  getReplyToAddress,
  wrapEmailHtml,
  wrapEmailText,
  emailFooterText,
  type EmailChromeInput,
} from "@/lib/emails/chrome";

export {
  buildConfirmationEmail,
  buildAcceptedEmail,
  buildDeniedEmail,
  buildEmailTemplate,
  emailTemplateIds,
  type BuiltEmail,
  type ApplicantEmailVars,
  type EmailTemplateId,
} from "@/lib/emails/templates";

export {
  hiveAdmitSize,
  hiveAdmitImageUrl,
  renderHiveAdmitTicket,
  type HiveAdmitVars,
} from "@/lib/emails/hive-admit";
