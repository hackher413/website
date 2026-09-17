"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Top-of-page header for interior pages. Animates once on mount (above the fold).
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
        className="max-w-3xl pt-16 pb-10 sm:pt-24 sm:pb-12"
      >
        {eyebrow ? (
          <motion.span
            variants={fadeUp}
            className="text-sm font-medium text-muted-foreground"
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
