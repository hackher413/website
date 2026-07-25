import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const widths = {
  /** Reading-width prose. */
  prose: "max-w-3xl",
  /** Default content width for most sections. */
  default: "max-w-6xl",
  /** Wide layouts (galleries, sponsor grids). */
  wide: "max-w-7xl",
  /** Edge-to-edge (hero backgrounds). */
  full: "max-w-none",
} as const;

type ContainerProps = React.ComponentProps<"div"> & {
  /** Constrains max content width. Defaults to `default`. */
  width?: keyof typeof widths;
  /** Render as a different element (e.g. `header`, `section`) via Radix Slot. */
  asChild?: boolean;
};

/**
 * Horizontal layout primitive: centers content, caps its width, and applies
 * consistent responsive gutters. Compose inside `Section` for full page rhythm.
 */
export function Container({
  className,
  width = "default",
  asChild = false,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        widths[width],
        className,
      )}
      {...props}
    />
  );
}
