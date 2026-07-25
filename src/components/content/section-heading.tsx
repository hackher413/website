"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

type SectionHeadingProps = {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Center-align the block (default left). */
  align?: "left" | "center";
  className?: string;
};

/**
 * Standard section header — eyebrow / title / description — with a staggered
 * scroll-in reveal. Used across every page for consistent rhythm and typography.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={staggerContainer}
      className={cn(
        "flex max-w-2xl flex-col",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className="mt-3 text-display font-heading text-balance"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-lead text-muted-foreground text-pretty"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
