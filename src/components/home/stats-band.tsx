import { Section } from "@/components/layout";
import { StatGrid } from "@/components/content";
import { homeStats } from "@/content/home";

/**
 * Accessible, text-based stats band directly under the hero — the readable
 * counterpart to the decorative honeycomb stats. Sits on a subtle honey wash.
 */
export function StatsBand() {
  return (
    <Section tone="honey" spacing="md">
      <StatGrid stats={homeStats} />
    </Section>
  );
}
