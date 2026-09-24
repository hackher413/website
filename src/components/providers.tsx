import * as React from "react";

import { BeeCursorLazy } from "@/components/bee-cursor-lazy";

/**
 * App-wide providers. Light-only marketing site - no theme toggle.
 * Bee cursor mounts lazily so it stays off the critical path.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BeeCursorLazy />
    </>
  );
}
