/**
 * Smoke test / template preview for shared email chrome + Resend.
 *
 * Usage:
 *   npx tsx scripts/send-test-email.ts you@example.com
 *   npx tsx scripts/send-test-email.ts --template confirmation you@example.com
 *   npx tsx scripts/send-test-email.ts --preview accepted
 *   npx tsx scripts/send-test-email.ts --preview denied --out /tmp/denied.html
 *
 * Loads `.env.local` then `.env`. Sending requires RESEND_API_KEY +
 * RESEND_FROM_EMAIL and a verified domain. `--preview` needs neither.
 */
import { writeFileSync } from "node:fs";

import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const TEMPLATE_IDS = ["confirmation", "accepted", "denied"] as const;
type TemplateId = (typeof TEMPLATE_IDS)[number];

function isTemplateId(value: string): value is TemplateId {
  return (TEMPLATE_IDS as readonly string[]).includes(value);
}

function printUsage(): never {
  console.error(`Usage:
  npx tsx scripts/send-test-email.ts [--template <id>] <email> [email2...]
  npx tsx scripts/send-test-email.ts --preview <id> [--out path.html]

Templates: ${TEMPLATE_IDS.join(", ")}`);
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  let template: TemplateId | "smoke" = "smoke";
  let preview = false;
  let outPath: string | undefined;
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--template") {
      const id = args[++i];
      if (!id || !isTemplateId(id)) printUsage();
      template = id;
    } else if (arg === "--preview") {
      preview = true;
      const id = args[++i];
      if (!id || !isTemplateId(id)) printUsage();
      template = id;
    } else if (arg === "--out") {
      outPath = args[++i];
      if (!outPath) printUsage();
    } else if (arg.startsWith("-")) {
      printUsage();
    } else {
      positional.push(arg);
    }
  }

  const { buildEmailTemplate, getFromDisplayName } = await import(
    "../src/lib/emails"
  );

  if (preview) {
    if (template === "smoke") printUsage();
    const built = buildEmailTemplate(template, {
      firstName: "Alex",
      statusUrl: "https://www.hackher413.com/apply/status",
    });
    if (outPath) {
      writeFileSync(outPath, built.html, "utf8");
      console.log(
        `Wrote ${template} preview → ${outPath} (from-name: ${getFromDisplayName()})`,
      );
    } else {
      process.stdout.write(built.html);
    }
    return;
  }

  if (positional.length === 0) printUsage();

  const { sendEmail } = await import("../src/lib/email");

  for (const to of positional) {
    if (template === "smoke") {
      const { id } = await sendEmail({
        to,
        subject: "Hack(H)er413 - Resend test",
        html: `<p>Hi - this is a shared <code>sendEmail()</code> smoke test.</p>
<p>If you got this, Preview/local Resend wiring works.</p>
<p>From display name: <strong>${getFromDisplayName()}</strong></p>`,
        text: `Hi - this is a shared sendEmail() smoke test. From: ${getFromDisplayName()}`,
      });
      console.log(`Sent smoke test to ${to} → id ${id}`);
      continue;
    }

    const built = buildEmailTemplate(template, {
      firstName: "Alex",
      statusUrl: "https://www.hackher413.com/apply/status",
    });
    const { id } = await sendEmail({
      to,
      subject: `[test] ${built.subject}`,
      html: built.html,
      text: built.text,
      replyTo: built.replyTo,
    });
    console.log(
      `Sent ${template} to ${to} → id ${id} (from-name: ${getFromDisplayName()})`,
    );
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
