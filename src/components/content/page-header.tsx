import * as React from "react";

import { Container } from "@/components/layout";

/**
 * Top-of-page header for interior pages.
 * Static markup so the H1 paints immediately on mobile (LCP).
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <Container>
      <div className="max-w-3xl pt-16 pb-10 sm:pt-24 sm:pb-12">
        {eyebrow ? (
          <span className="text-sm font-medium text-muted-foreground">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-3 text-display-xl font-heading text-balance">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 text-lead text-muted-foreground text-pretty">
            {lead}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
