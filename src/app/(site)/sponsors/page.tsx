import type { Metadata } from "next";

import { Section } from "@/components/layout";
import { PageHeader, SponsorCard, CtaBand, RevealGrid } from "@/components/content";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import {
  sponsors,
  tierMeta,
  tierOrder,
  sponsorCta,
} from "@/content/sponsors";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "The companies and partners who make Hack(H)er413 possible — and how to join them.",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Powered by partners who believe in belonging."
        lead="Our sponsors don't just fund the weekend — they help us open the door to tech a little wider."
      />

      <Section spacing="lg">
        <div className="flex flex-col gap-16">
          {tierOrder.map((tier) => {
            const tierSponsors = sponsors.filter((s) => s.tier === tier);
            if (tierSponsors.length === 0) return null;
            const meta = tierMeta[tier];
            const featured = tier === "presenting";

            return (
              <div key={tier}>
                <div className="mb-6">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {meta.label}
                  </h2>
                  {meta.blurb ? (
                    <p className="mt-1 text-muted-foreground">{meta.blurb}</p>
                  ) : null}
                </div>
                <RevealGrid className={cn("grid gap-4", meta.columns)}>
                  {tierSponsors.map((sponsor) => (
                    <SponsorCard
                      key={sponsor.name}
                      sponsor={sponsor}
                      featured={featured}
                    />
                  ))}
                </RevealGrid>
              </div>
            );
          })}
        </div>
      </Section>

      <CtaBand
        title={sponsorCta.title}
        description={sponsorCta.description}
        primary={{ label: "Get in touch", href: siteConfig.social.email }}
        secondary={{ label: "Meet the team", href: "/team" }}
      />
    </>
  );
}
