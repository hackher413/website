"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { HoneycombCanvas } from "@/components/honeycomb/honeycomb-canvas";
import { event } from "@/content/event";
import { primaryCta } from "@/content/apply";

/**
 * Signature hero: immersive honeycomb canvas with this year's lockup
 * built from clean type + the pixel bee (avoids mangling the raster logo).
 * Canvas is espresso; copy stays cream for contrast.
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
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(27,18,16,0.78) 0%, rgba(27,18,16,0.4) 50%, rgba(27,18,16,0.18) 100%)",
        }}
      />

      <Container className="pointer-events-none relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center"
            aria-label="Hack(H)er413"
          >
            <p className="text-[clamp(2.5rem,9vw,4rem)] font-black uppercase leading-none tracking-[-0.045em] text-cream">
              HACK(H)ER
            </p>
            <div className="mt-3 flex items-center justify-center gap-3 sm:gap-4">
              <Image
                src="/brand/bee.png"
                alt=""
                width={486}
                height={390}
                priority
                unoptimized
                className="h-14 w-auto sm:h-16 md:h-[4.5rem]"
                style={{
                  imageRendering: "pixelated",
                  filter:
                    "drop-shadow(0 0 0.6px rgba(251,246,238,0.85)) drop-shadow(0 0 0.6px rgba(251,246,238,0.85))",
                }}
              />
              <span className="text-[clamp(2.25rem,8vw,3.5rem)] font-black leading-none tracking-[-0.045em] text-cream">
                413
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-display-xl font-heading text-balance"
          >
            Where women and gender minorities build in tech.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-lead text-cream/75 text-pretty"
          >
            {event.isConcluded
              ? event.concludedMessage
              : "A collegiate hackathon at UMass Amherst - learn, build, and meet your people. Beginners welcome."}
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
