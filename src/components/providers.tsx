"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";

import { ThemeProvider } from "@/components/theme-provider";

/**
 * App-wide client providers, colocated so the root layout stays a Server
 * Component and only this subtree ships as client JS.
 *
 * - ThemeProvider: class-based light/dark via next-themes.
 * - MotionConfig `reducedMotion="user"`: every Framer animation automatically
 *   respects `prefers-reduced-motion`, so components don't each have to guard.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
