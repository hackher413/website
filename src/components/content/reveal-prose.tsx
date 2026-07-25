"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

/**
 * A column of paragraphs that reveal with a stagger on scroll. Used for story /
 * mission prose where each paragraph fades up in sequence.
 */
export function RevealProse({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={staggerContainer}
      className={cn(
        "flex flex-col gap-5 text-lg text-muted-foreground text-pretty",
        className,
      )}
    >
      {paragraphs.map((paragraph, i) => (
        <motion.p key={i} variants={fadeUp}>
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  );
}
