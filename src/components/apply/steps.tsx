"use client";

import { FeatureCard, RevealGrid } from "@/components/content";
import { applySteps } from "@/content/apply";

/**
 * The "how it works" steps grid. Client component so the Lucide icons in
 * `applySteps` stay on the client side of the boundary.
 */
export function ApplySteps() {
  return (
    <RevealGrid className="mt-10 grid gap-6 sm:grid-cols-3">
      {applySteps.map((step) => (
        <FeatureCard key={step.title} {...step} tone="sky" />
      ))}
    </RevealGrid>
  );
}
