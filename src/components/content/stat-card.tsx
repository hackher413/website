"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp, inViewOnce } from "@/lib/motion";

export type Stat = {
  value: string;
  label: string;
};

/**
 * A single headline statistic. Large value, quiet label. Animates up on scroll
 * into view. Reusable across the homepage stats band and the About page.
 */
export function StatCard({
  value,
  label,
  className,
}: Stat & { className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn("flex flex-col", className)}
    >
      <span className="text-display font-heading tabular-nums">{value}</span>
      <span className="mt-1 text-sm font-medium uppercase tracking-wide opacity-70">
        {label}
      </span>
    </motion.div>
  );
}

/**
 * A responsive grid of stats with a staggered scroll-in reveal. Accessible,
 * text-based counterpart to the decorative honeycomb stats.
 */
export function StatGrid({
  stats,
  className,
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <motion.dl
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4",
        className,
      )}
    >
      {stats.map((s) => (
        <StatCard key={s.label} value={s.value} label={s.label} />
      ))}
    </motion.dl>
  );
}
