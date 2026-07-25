import type { Metadata } from "next";

import { Section } from "@/components/layout";
import {
  PageHeader,
  SectionHeading,
  StatGrid,
  CtaBand,
  RevealProse,
} from "@/components/content";
import { Values } from "@/components/about/values";
import { applyNav } from "@/lib/site";
import { aboutIntro, aboutStory, aboutStats } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: aboutIntro.lead,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutIntro.eyebrow}
        title={aboutIntro.title}
        lead={aboutIntro.lead}
      />

      <Section tone="honey" spacing="md">
        <StatGrid stats={aboutStats} />
      </Section>

      <Section spacing="lg">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading eyebrow={aboutStory.eyebrow} title={aboutStory.title} />
          <RevealProse paragraphs={aboutStory.body} className="lg:pt-10" />
        </div>
      </Section>

      <Section tone="muted" spacing="lg">
        <SectionHeading
          align="center"
          eyebrow="What we stand for"
          title="The values that shape the weekend."
        />
        <Values />
      </Section>

      <CtaBand
        title="Come see what we mean."
        description="The best way to understand Hack(H)er413 is to be there. Applications are open."
        primary={{ label: "Apply now", href: applyNav.href }}
        secondary={{ label: "View the schedule", href: "/schedule" }}
      />
    </>
  );
}
