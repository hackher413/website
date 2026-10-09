import type { Metadata } from "next";

import { ApplyForm } from "@/components/apply/application-form";
import { PageHeader } from "@/components/content";
import { Section } from "@/components/layout";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Application form",
  description: "Start or continue your Hack(H)er413 application.",
  robots: { index: false, follow: false },
};

/**
 * Auth-gated apply form. Fields + validation come from the application-form
 * config; persistence and submit wiring land in the server-action task.
 */
export default async function ApplyFormPage() {
  await requireUser();

  return (
    <>
      <PageHeader
        title="Your application"
        lead="About ten minutes. Answer what you can - everything is validated before it counts."
      />

      <Section spacing="md" className="pt-4 sm:pt-8">
        <ApplyForm />
      </Section>
    </>
  );
}
