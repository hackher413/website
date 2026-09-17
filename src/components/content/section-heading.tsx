import * as React from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small kicker above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Center-align the block (default left). */
  align?: "left" | "center";
  className?: string;
};

/**
 * Standard section header — eyebrow / title / description. Static (no scroll
 * reveal) so motion stays reserved for the hero and a few key moments.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-medium text-muted-foreground">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-3 text-display font-heading text-balance">{title}</h2>
      {description ? (
        <p className="mt-4 text-lead text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
