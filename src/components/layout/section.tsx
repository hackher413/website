import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

const spacing = {
  none: "",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-28",
} as const;

const tones = {
  /** Page background. */
  default: "",
  /** Sky mute band - cool counterpoint to cream. */
  muted: "bg-muted",
  /** Soft honey wash - sparse highlights. */
  honey: "bg-honey-soft text-honey-foreground",
  /** Soft sky wash. */
  sky: "bg-sky-soft text-sky-foreground",
  /** Inverted brand band (brown). */
  brand: "bg-brand text-brand-foreground",
  /** Espresso field - carries the honeycomb language past the hero. */
  espresso: "bg-espresso text-cream",
  /** Espresso with faint honeycomb lattice. */
  honeycomb: "bg-honeycomb text-cream",
} as const;

type SectionProps = React.ComponentProps<"section"> & {
  /** Vertical padding rhythm. Defaults to `lg`. */
  spacing?: keyof typeof spacing;
  /** Background tone. Defaults to `default`. */
  tone?: keyof typeof tones;
  /** Max content width, forwarded to the inner Container. */
  width?: React.ComponentProps<typeof Container>["width"];
  /**
   * When true, children are rendered directly without the inner Container -
   * for full-bleed sections (e.g. the honeycomb hero) that manage their own
   * horizontal layout.
   */
  bleed?: boolean;
};

/**
 * Vertical layout primitive: one page "band" with consistent spacing and an
 * optional tinted background. Wraps children in a `Container` unless `bleed`.
 */
export function Section({
  className,
  spacing: spacingKey = "lg",
  tone = "default",
  width,
  bleed = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacing[spacingKey], tones[tone], className)}
      {...props}
    >
      {bleed ? children : <Container width={width}>{children}</Container>}
    </section>
  );
}
