"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/layout";
import { SectionHeading, FeatureCard } from "@/components/content";
import { inViewOnce, staggerContainer } from "@/lib/motion";
import { homeFeatures } from "@/content/home";

/**
 * "Why Hack(H)er413" — a staggered grid of value cards.
 */
export function Features() {
  return (
    <Section tone="muted" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Why Hack(H)er413"
        title="A hackathon that actually has your back."
        description="Everything we do is in service of a more welcoming, more capable, more joyful tech community."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        variants={staggerContainer}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {homeFeatures.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </motion.div>
    </Section>
  );
}
