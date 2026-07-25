import type { Metadata } from "next";

import { Section } from "@/components/layout";

export const metadata: Metadata = { title: "Team" };

/** Placeholder — real content is built in Step 7. */
export default function TeamPage() {
  return (
    <Section spacing="lg">
      <h1 className="text-display-xl font-heading">Team</h1>
      <p className="mt-4 text-lead text-muted-foreground">Coming soon.</p>
    </Section>
  );
}
