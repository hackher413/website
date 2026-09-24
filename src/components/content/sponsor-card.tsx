import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Sponsor } from "@/content/sponsors";

/**
 * Open sponsor mark - logo (or wordmark) + name on the page background.
 * No card chrome; hover lifts opacity like organizer tiles.
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
      aria-label={sponsor.name}
      className={cn(
        "group flex flex-col items-center gap-3 text-center transition-transform duration-300 ease-out hover:-translate-y-1",
        featured ? "w-40 sm:w-48" : "w-full",
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center",
          featured ? "h-16 sm:h-20" : "h-12 sm:h-14",
        )}
      >
        {sponsor.logo ? (
          <Image
            src={sponsor.logo}
            alt=""
            width={featured ? 240 : 160}
            height={featured ? 96 : 64}
            sizes={
              featured
                ? "(min-width: 640px) 192px, 160px"
                : "(min-width: 640px) 140px, 30vw"
            }
            className={cn(
              "max-w-full object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100",
              featured ? "max-h-16 sm:max-h-20" : "max-h-12 sm:max-h-14",
            )}
          />
        ) : (
          <span
            className={cn(
              "font-heading font-semibold text-foreground/70 transition-colors group-hover:text-foreground",
              featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
            )}
          >
            {sponsor.name}
          </span>
        )}
      </div>
      <span
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground",
          featured && "text-base",
          !sponsor.logo && "sr-only",
        )}
      >
        {sponsor.name}
      </span>
    </a>
  );
}
