"use client";

import dynamic from "next/dynamic";

const BeeCursor = dynamic(
  () => import("@/components/bee-cursor").then((m) => m.BeeCursor),
  { ssr: false },
);

/** Client island so the root Providers layout can stay a Server Component. */
export function BeeCursorLazy() {
  return <BeeCursor />;
}
