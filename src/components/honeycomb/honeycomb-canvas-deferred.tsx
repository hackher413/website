"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const HoneycombCanvas = dynamic(
  () =>
    import("@/components/honeycomb/honeycomb-canvas").then(
      (m) => m.HoneycombCanvas,
    ),
  { ssr: false },
);

/**
 * Mount the canvas after LCP so the hero lockup isn't competing with canvas
 * parse + rAF. Longer delay on touch / coarse pointers; idle-first on desktop.
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
    let loadHandler: (() => void) | undefined;

    const start = () => setReady(true);

    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse), (hover: none)").matches;

    // Mobile: wait for window load, then a beat past LCP before canvas JS.
    // Desktop: idle callback with a short timeout so the comb arrives soon.
    if (coarse) {
      const afterLoad = () => {
        timeoutId = setTimeout(start, 1200);
      };
      if (document.readyState === "complete") {
        afterLoad();
      } else {
        loadHandler = afterLoad;
        window.addEventListener("load", afterLoad, { once: true });
      }
    } else if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(start, 400);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (loadHandler) window.removeEventListener("load", loadHandler);
    };
  }, []);

  if (!ready) {
    return <div className={className} aria-hidden="true" />;
  }

  return <HoneycombCanvas className={className} />;
}
