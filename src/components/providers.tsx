import * as React from "react";

/**
 * App-wide providers. Light-only marketing site - no theme toggle.
 * Kept as a thin pass-through so layout stays stable if client providers
 * are needed later (analytics, etc.).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return children;
}
