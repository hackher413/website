"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { inViewOnce, staggerContainer } from "@/lib/motion";

/**
 * A generic staggered scroll-in container. Lets Server Component pages compose a
 * grid/list of already-animating children (StatCard, FeatureCard, SponsorCard,
 * OrganizerCard) without themselves becoming client components. Children supply
 * their own `fadeUp` variants; this element orchestrates the stagger.
 */
export function RevealGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
