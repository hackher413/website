"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { HoneycombCanvas } from "@/components/honeycomb/honeycomb-canvas";
import { event } from "@/content/event";
import { primaryCta } from "@/content/apply";

/**
 * Signature hero: immersive honeycomb canvas with the brand wordmark as the
 * primary signal. Canvas is always espresso; copy stays cream for contrast.
 */
export function HoneycombHero() {
  const primary = primaryCta;

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden bg-espresso text-cream">
      <HoneycombCanvas className="absolute inset-0" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(27,18,16,0.72) 0%, rgba(27,18,16,0.35) 45%, rgba(27,18,16,0.15) 100%)",
        }}
      />

      <Container className="pointer-events-none relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Logo linked={false} size="display" tone="onDark" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm text-cream/60 sm:text-base"
          >
            {event.isConcluded
              ? `${event.year} · UMass Amherst`
              : `${event.dates} · UMass Amherst`}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-8 text-display-xl font-heading text-balance"
          >
            Where women and gender minorities build in tech.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-lead text-cream/75 text-pretty"
          >
            {event.isConcluded
              ? event.concludedMessage
              : "A collegiate hackathon at UMass Amherst — learn, build, and meet your people. Beginners welcome."}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="xl" variant="honey">
              {primary.external ? (
                <a href={primary.href} target="_blank" rel="noopener noreferrer">
                  {primary.label}
                </a>
              ) : (
                <Link href={primary.href}>{primary.label}</Link>
              )}
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/25 bg-white/5 text-cream hover:bg-white/10 hover:text-white"
            >
              <Link href={event.isConcluded ? "/projects" : "/about"}>
                {event.isConcluded ? "See 2026 winners" : "Learn more"}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
