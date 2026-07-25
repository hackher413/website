import type { Metadata } from "next";

import { Section } from "@/components/layout";
import { PageHeader, FaqAccordion, CtaBand } from "@/components/content";
import { applyNav, siteConfig } from "@/lib/site";
import { faq, faqIntro } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: faqIntro.lead,
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow={faqIntro.eyebrow}
        title={faqIntro.title}
        lead={faqIntro.lead}
      />

      <Section spacing="lg" className="pt-4 sm:pt-8">
        <div className="flex flex-col gap-14">
          {faq.map((category, i) => (
            <div
              key={category.name}
              className="grid gap-6 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12"
            >
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground lg:pt-4">
                {category.name}
              </h2>
              <FaqAccordion items={category.items} idPrefix={`faq-${i}`} />
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Still have a question?"
        description="We're real people and we're happy to help. Drop us a line anytime."
        primary={{ label: "Email us", href: siteConfig.social.email }}
        secondary={{ label: "Apply now", href: applyNav.href }}
      />
    </>
  );
}
