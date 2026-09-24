import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";

export type CtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

type CtaBandProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  primary: CtaLink;
  secondary?: CtaLink;
};

function CtaButton({
  link,
  variant,
  className,
}: {
  link: CtaLink;
  variant: "honey" | "outline";
  className?: string;
}) {
  const content = (
    <>
      {link.label}
      {variant === "honey" ? <ArrowRight aria-hidden="true" /> : null}
    </>
  );

  if (link.external) {
    return (
      <Button asChild size="xl" variant={variant} className={className}>
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild size="xl" variant={variant} className={className}>
      <Link href={link.href}>{content}</Link>
    </Button>
  );
}

/**
 * Closing call-to-action on the inverted brand surface.
 * Server-rendered — motion lived below the fold but still pulled Framer into
 * every page bundle.
 */
export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <Section tone="brand" spacing="lg">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-display font-heading text-balance">{title}</h2>
        {description ? (
          <p className="mt-4 text-lead text-brand-foreground/85 text-pretty">
            {description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CtaButton link={primary} variant="honey" />
          {secondary ? (
            <CtaButton
              link={secondary}
              variant="outline"
              className="border-brand-foreground/25 bg-transparent text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            />
          ) : null}
        </div>
      </div>
    </Section>
  );
}
