"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

type CtaBandProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/**
 * Reusable closing call-to-action band on the inverted brand surface. Shared by
 * the homepage and other pages for a consistent conversion moment.
 */
export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <Section tone="brand" spacing="lg">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        variants={staggerContainer}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-display font-heading text-balance"
        >
          {title}
        </motion.h2>
        {description ? (
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lead text-brand-foreground/70 text-pretty"
          >
            {description}
          </motion.p>
        ) : null}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="xl" variant="honey">
            <Link href={primary.href}>
              {primary.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          {secondary ? (
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-brand-foreground/25 bg-transparent text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            >
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </motion.div>
      </motion.div>
    </Section>
  );
}
