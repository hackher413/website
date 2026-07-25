"use client";

import { FeatureCard, RevealGrid } from "@/components/content";
import { aboutValues } from "@/content/about";

/**
 * The values grid. A client component so the Lucide icon components in
 * `aboutValues` never cross the Server→Client boundary (functions aren't
 * serializable as props) — the same pattern as the homepage Features section.
 */
export function Values() {
  return (
    <RevealGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {aboutValues.map((value) => (
        <FeatureCard key={value.title} {...value} />
      ))}
    </RevealGrid>
  );
}
