import * as React from "react";

import { Container } from "@/components/layout";
import { HexMark } from "@/components/content/hex-mark";

/**
 * Top-of-page header for interior pages.
 * Solid espresso band + cream type - brand surface, not a cream eyebrow stack.
 * Static markup so the H1 paints immediately on mobile (LCP).
 */
export function PageHeader({
  title,
  lead,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <div className="bg-espresso text-cream">
      <Container>
        <div className="max-w-3xl pt-16 pb-12 sm:pt-20 sm:pb-16">
          <h1 className="flex items-start gap-3 text-display-xl text-balance">
            <HexMark size="md" tone="honey" className="mt-[0.55em]" />
            <span>{title}</span>
          </h1>
          {lead ? (
            <p className="mt-5 max-w-2xl pl-[1.625rem] text-lead text-cream/70 text-pretty">
              {lead}
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
