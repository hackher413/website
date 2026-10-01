/**
 * One-off smoke test for task 12.
 *
 * Usage:
 *   npx tsx scripts/send-test-email.ts you@example.com
 *   npx tsx scripts/send-test-email.ts a@x.com b@y.com c@z.com
 *
 * Loads `.env.local` then `.env`. Requires RESEND_API_KEY + RESEND_FROM_EMAIL
 * and a verified sending domain in Resend.
 */
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

async function main() {
  const recipients = process.argv.slice(2).filter(Boolean);
  if (recipients.length === 0) {
    console.error(
      "Usage: npx tsx scripts/send-test-email.ts <email> [email2] [email3]",
    );
    process.exit(1);
  }

  const { sendEmail } = await import("../src/lib/email");

  for (const to of recipients) {
    const { id } = await sendEmail({
      to,
      subject: "Hack(H)er413 — Resend test",
      html: `<p>Hi — this is a shared <code>sendEmail()</code> smoke test.</p>
<p>If you got this, Preview/local Resend wiring works.</p>`,
      text: "Hi — this is a shared sendEmail() smoke test. If you got this, Resend wiring works.",
    });
    console.log(`Sent to ${to} → id ${id}`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
