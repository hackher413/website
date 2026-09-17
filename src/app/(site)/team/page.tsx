import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout";
import { PageHeader, OrganizerCard, RevealGrid } from "@/components/content";
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
      <PageHeader
        eyebrow={teamIntro.eyebrow}
        title={teamIntro.title}
        lead={teamIntro.lead}
      />

      <Section spacing="lg" className="pt-4 sm:pt-8">
        <div className="flex flex-col gap-16">
          {team.map((group) => {
            const featured = group.name === "Directors";
            return (
              <div key={group.name}>
                <h2 className="mb-8 flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="inline-block size-2.5 bg-honey"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  />
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

      <Section spacing="lg">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-heading text-display text-balance">
            Want to organize with us?
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Mentors, volunteers, and future organizers — email us and we&apos;ll
            point you to the right place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="xl" variant="honey">
              <a href={siteConfig.social.email}>Email the team</a>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/sponsors">See our sponsors</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
