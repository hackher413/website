import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Application status",
  description: "See the status of your Hack(H)er413 application.",
  robots: { index: false, follow: false },
};

/**
 * Auth-gated apply status stub (task 13).
 * Live status from the DB lands after submit/server actions.
 */
export default async function ApplyStatusPage() {
  await requireUser();

  return (
    <>
      <PageHeader
        title="Application status"
        lead="Signed in. Status will read from your application row once submits exist."
      />

      <Section spacing="md" className="pt-4 sm:pt-8">
        <div className="flex max-w-xl flex-col gap-6">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="mt-1 text-lg font-medium text-foreground">
                No application yet
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Submitted</dt>
              <dd className="mt-1 text-lg font-medium text-foreground">-</dd>
            </div>
          </dl>
          <Button asChild variant="honey" size="lg">
            <Link href="/apply/form">Go to form</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
