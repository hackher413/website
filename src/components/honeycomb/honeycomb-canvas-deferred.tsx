"use client";

import * as React from "react";

import { HoneycombCanvas } from "@/components/honeycomb/honeycomb-canvas";

/**
 * Mount the canvas after first paint so hero text / LCP is not competing with
 * the canvas rAF loop and its JS parse on mobile.
 */
export function HoneycombCanvasDeferred({
  className,
}: {
  className?: string;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const start = () => setReady(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 900 });
    } else {
      timeoutId = setTimeout(start, 200);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) {
    return <div className={className} aria-hidden="true" />;
  }

  return <HoneycombCanvas className={className} />;
}
