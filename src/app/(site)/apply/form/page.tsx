import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Application form",
  description: "Start or continue your Hack(H)er413 application.",
  robots: { index: false, follow: false },
};

/**
 * Auth-gated apply form stub (task 13).
 * Real fields + Zod land in later applicant tasks.
 */
export default async function ApplyFormPage() {
  await requireUser();

  return (
    <>
      <PageHeader
        title="Your application"
        lead="Signed in. The full form ships next - this route is the shell."
      />

      <Section spacing="md" className="pt-4 sm:pt-8">
        <div className="flex max-w-xl flex-col gap-6">
          <p className="text-lead text-muted-foreground text-pretty">
            Form fields will load from the application-form config. For now,
            confirm auth and navigation work.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="honey" size="lg" disabled>
              Submit (coming soon)
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/apply/status">Check status</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
