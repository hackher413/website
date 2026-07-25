import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Section } from "@/components/layout";
import { PageHeader } from "@/components/content";
import { ApplySteps } from "@/components/apply/steps";
import { Button } from "@/components/ui/button";
import {
  applyIntro,
  applyUrl,
  applyStatus,
  applyEligibility,
} from "@/content/apply";

export const metadata: Metadata = {
  title: "Apply",
  description: applyIntro.lead,
};

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow={applyIntro.eyebrow}
        title={applyIntro.title}
        lead={applyIntro.lead}
      />

      <Section spacing="md">
        <div className="flex flex-col items-start gap-4">
          <Button asChild size="xl" variant="honey" disabled={!applyStatus.isOpen}>
            <a href={applyUrl} target="_blank" rel="noopener noreferrer">
              {applyStatus.isOpen ? "Start your application" : "Applications closed"}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">{applyStatus.deadline}</p>
        </div>
      </Section>

      <Section tone="muted" spacing="lg">
        <h2 className="text-display font-heading">How it works</h2>
        <ApplySteps />
      </Section>

      <Section spacing="lg">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-display font-heading text-balance">
              Who should apply
            </h2>
            <p className="mt-4 text-lead text-muted-foreground text-pretty">
              If any of this sounds like you, we want to see your application.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {applyEligibility.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-honey text-honey-foreground">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <span className="text-lg text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="brand" spacing="lg">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-display font-heading text-balance">
            The hive is waiting for you.
          </h2>
          <p className="mt-4 text-lead text-brand-foreground/70 text-pretty">
            Ten minutes now, an unforgettable weekend later.
          </p>
          <div className="mt-8">
            <Button asChild size="xl" variant="honey">
              <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                Apply now
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-brand-foreground/60">
            Questions first?{" "}
            <Link
              href="/faq"
              className="underline underline-offset-4 hover:text-brand-foreground"
            >
              Read the FAQ
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
