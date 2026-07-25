"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Top-of-page header for interior (non-home) pages. Larger than SectionHeading
 * — it uses the display-xl scale and adds generous top padding to clear the
 * sticky navbar. Animates in on mount (not on scroll) since it's above the fold.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <Container>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-3xl pt-16 pb-12 sm:pt-24 sm:pb-16"
      >
        {eyebrow ? (
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            {eyebrow}
          </motion.span>
        ) : null}
        <motion.h1
          variants={fadeUp}
          className="mt-3 text-display-xl font-heading text-balance"
        >
          {title}
        </motion.h1>
        {lead ? (
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lead text-muted-foreground text-pretty"
          >
            {lead}
          </motion.p>
        ) : null}
      </motion.div>
    </Container>
  );
}
