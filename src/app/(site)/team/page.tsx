import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout";
import { PageHeader, OrganizerCard, RevealGrid, HexMark } from "@/components/content";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { team, teamIntro } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: teamIntro.lead,
};

export default function TeamPage() {
  return (
    <>
      <PageHeader title={teamIntro.title} lead={teamIntro.lead} />

      <Section spacing="lg" className="pt-4 sm:pt-8">
        <div className="flex flex-col gap-16">
          {team.map((group) => {
            const featured = group.name === "Directors";
            return (
              <div key={group.name}>
                <h2 className="mb-8 flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                  <HexMark size="sm" tone="honey" />
                  {group.name}
                </h2>
                <RevealGrid
                  className={
                    featured
                      ? "flex flex-wrap justify-center gap-x-12 gap-y-10"
                      : "grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3"
                  }
                >
                  {group.members.map((member) => (
                    <OrganizerCard
                      key={member.name}
                      organizer={member}
                      featured={featured}
                    />
                  ))}
                </RevealGrid>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="honeycomb" spacing="lg">
        <div className="flex max-w-lg flex-col items-start gap-4">
          <h2 className="flex items-start gap-3 text-display text-balance">
            <HexMark size="md" tone="honey" className="mt-[0.55em]" />
            <span>Want to organize with us?</span>
          </h2>
          <p className="pl-[1.625rem] text-cream/70 text-pretty">
            Mentors, volunteers, and future organizers - email us and we&apos;ll
            point you to the right place.
          </p>
          <div className="pl-[1.625rem]">
            <Button asChild size="xl" variant="honey">
              <a href={siteConfig.social.email}>Email the team</a>
            </Button>
          </div>
          <p className="pl-[1.625rem] text-sm text-cream/50">
            Or{" "}
            <Link
              href="/sponsors"
              className="underline underline-offset-4 hover:text-cream"
            >
              see our sponsors
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
