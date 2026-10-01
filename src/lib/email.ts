import { Resend } from "resend";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string | string[];
};

export type SendEmailResult = {
  id: string;
};

function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Copy .env.example → .env.local and add the Resend key.",
    );
  }
  return new Resend(apiKey);
}

function getFromAddress() {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error(
      'RESEND_FROM_EMAIL is not set. Example: Hack(H)er413 <noreply@hackher413.com>',
    );
  }
  return from;
}

/**
 * Shared Resend sender for confirmation + decision emails.
 * Server-only — do not import from Client Components.
 */
export async function sendEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const resend = getClient();
  const { data, error } = await resend.emails.send({
    from: getFromAddress(),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    replyTo: input.replyTo,
  });

  if (error) {
    throw new Error(`Resend failed: ${error.message}`);
  }

  if (!data?.id) {
    throw new Error("Resend returned no email id.");
  }

  return { id: data.id };
}
