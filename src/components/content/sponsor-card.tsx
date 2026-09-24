import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Sponsor } from "@/content/sponsors";

/**
 * Sponsor tile. Links out; falls back to a wordmark when no logo is provided.
 */
export function SponsorCard({
  sponsor,
  featured = false,
}: {
  sponsor: Sponsor;
  featured?: boolean;
}) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.name}
      aria-label={sponsor.name}
      className={cn(
        "group relative flex items-center justify-center rounded-xl border border-border/70 bg-card p-6 transition-colors duration-300 hover:border-border",
        featured ? "min-h-32" : "min-h-24",
      )}
    >
      {sponsor.logo ? (
        <>
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={featured ? 240 : 160}
            height={featured ? 96 : 64}
            sizes={featured ? "(min-width: 640px) 240px, 45vw" : "(min-width: 640px) 160px, 40vw"}
            className="max-h-16 w-auto max-w-full object-contain opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100"
            aria-hidden="true"
          >
            {sponsor.name}
          </span>
        </>
      ) : (
        <span
          className={cn(
            "text-center font-semibold text-muted-foreground transition-colors group-hover:text-foreground",
            featured ? "text-2xl" : "text-lg",
          )}
        >
          {sponsor.name}
        </span>
      )}
    </a>
  );
}
