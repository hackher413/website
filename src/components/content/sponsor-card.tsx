"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import type { Sponsor } from "@/content/sponsors";

/**
 * A single sponsor tile. Links out to the sponsor, with a subtle hover lift.
 * Falls back to a styled wordmark when no logo asset is provided, so the grid
 * always reads as intentional. `featured` enlarges the presenting sponsor.
 */
export function SponsorCard({
  sponsor,
  featured = false,
}: {
  sponsor: Sponsor;
  featured?: boolean;
}) {
  return (
    <motion.a
      variants={fadeUp}
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.name}
      aria-label={sponsor.name}
      className={cn(
        "group relative flex items-center justify-center rounded-xl border border-border/70 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-brand/5",
        featured ? "min-h-32" : "min-h-24",
      )}
    >
      {sponsor.logo ? (
        <>
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={featured ? 240 : 160}
            height={featured ? 96 : 64}
            className="max-h-16 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100"
            aria-hidden="true"
          >
            {sponsor.name}
          </span>
        </>
      ) : (
        <span
          className={cn(
            "text-center font-semibold text-muted-foreground transition-colors group-hover:text-foreground",
            featured ? "text-2xl" : "text-lg",
          )}
        >
          {sponsor.name}
        </span>
      )}
    </motion.a>
  );
}
