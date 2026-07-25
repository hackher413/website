import type { Metadata } from "next";

import { Section } from "@/components/layout";
import { PageHeader, OrganizerCard, CtaBand, RevealGrid } from "@/components/content";
import { applyNav } from "@/lib/site";
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
          {team.map((group) => (
            <div key={group.name}>
              <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {group.name}
              </h2>
              <RevealGrid className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {group.members.map((member) => (
                  <OrganizerCard key={member.name} organizer={member} />
                ))}
              </RevealGrid>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want to build this with us?"
        description="Organizers, mentors, volunteers — there's a place in the hive for you."
        primary={{ label: "Apply to attend", href: applyNav.href }}
        secondary={{ label: "See our sponsors", href: "/sponsors" }}
      />
    </>
  );
}
