import * as React from "react";

import { cn } from "@/lib/utils";
import { HexMark } from "@/components/content/hex-mark";

type SectionHeadingProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Center-align the block (default left). Prefer left - less template-y. */
  align?: "left" | "center";
  /** Show a honeycomb tick before the title. */
  hex?: boolean;
  className?: string;
};

/**
 * Section title block. No eyebrow kicker - titles stand alone with optional hex.
 */
export function SectionHeading({
  title,
  description,
  align = "left",
  hex = true,
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
      <h2 className="flex items-start gap-3 text-display text-balance">
        {hex ? (
          <HexMark
            size="md"
            tone="honey"
            className={cn("mt-[0.55em]", align === "center" && "hidden")}
          />
        ) : null}
        <span>{title}</span>
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lead text-muted-foreground text-pretty",
            hex && align === "left" && "pl-[1.625rem]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
