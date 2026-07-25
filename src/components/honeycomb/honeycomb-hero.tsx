"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { applyNav } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { HoneycombCanvas } from "@/components/honeycomb/honeycomb-canvas";

/**
 * The signature hero: an immersive, glowing honeycomb canvas with the headline
 * and CTAs overlaid. The canvas renders on a dark espresso field, so the hero
 * is intentionally dark in BOTH themes — copy is always light for contrast.
 */
export function HoneycombHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden bg-[#1b1210] text-[#fbf6ee]">
      {/* Glowing honeycomb fills the hero and reacts to the pointer. */}
      <HoneycombCanvas className="absolute inset-0" />

      {/* Radial vignette focuses attention on the headline without hiding the
          hive. Pointer events pass through to the canvas. */}
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
          <motion.p
            variants={fadeUp}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#fbf6ee]/70 backdrop-blur"
          >
            Hack(H)er413 · Western Massachusetts
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-display-2xl font-heading text-balance"
          >
            Where women and gender minorities build in tech.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lead text-[#fbf6ee]/75 text-pretty"
          >
            A collegiate hackathon creating an inclusive, empowering space to
            learn, build, and belong. Beginners welcome — always.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="xl" variant="honey">
              <Link href={applyNav.href}>Apply now</Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/25 bg-white/5 text-[#fbf6ee] hover:bg-white/10 hover:text-white"
            >
              <Link href="/about">Learn more</Link>
            </Button>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-sm text-[#fbf6ee]/50"
          >
            Move through the hive — click to send a ripple of light.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
