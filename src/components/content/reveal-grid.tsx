import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Layout wrapper for grids/lists. Intentionally static — scroll-stagger on every
 * card was making the site feel like a template.
 */
export function RevealGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(className)}>{children}</div>;
}
