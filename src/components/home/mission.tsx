"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/layout";
import { SectionHeading } from "@/components/content";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { homeMission } from "@/content/home";

/**
 * Mission teaser — two-column on desktop: heading on the left, prose on the
 * right. Links through to the full About page from the homepage composition.
 */
export function Mission() {
  return (
    <Section spacing="lg">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow={homeMission.eyebrow}
          title={homeMission.title}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          variants={staggerContainer}
          className="flex flex-col gap-5 text-lg text-muted-foreground text-pretty lg:pt-10"
        >
          {homeMission.body.map((paragraph, i) => (
            <motion.p key={i} variants={fadeUp}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
