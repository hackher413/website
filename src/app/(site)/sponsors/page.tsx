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
    "The companies and partners who make Hack(H)er413 possible - and how to join them.",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Partners who invest in the next builders."
        lead="Our sponsors fund the weekend and help more people walk through the door."
      />

      <Section spacing="lg" className="pt-4 sm:pt-8">
        <div className="flex flex-col gap-16">
          {tierOrder.map((tier) => {
            const tierSponsors = sponsors.filter((s) => s.tier === tier);
            if (tierSponsors.length === 0) return null;
            const meta = tierMeta[tier];
            const featured = tier === "current";

            return (
              <div key={tier}>
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-muted-foreground">
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
        primary={{
          label: "Get in touch",
          href: siteConfig.social.email,
          external: true,
        }}
        secondary={{ label: "Meet the team", href: "/team" }}
      />
    </>
  );
}
