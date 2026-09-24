"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";

/**
 * App-wide client providers. Light-only marketing site - no theme toggle.
 * MotionConfig respects prefers-reduced-motion for every Framer animation.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
