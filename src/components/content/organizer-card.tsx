"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import { LinkedInIcon } from "@/components/icons/brand-icons";
import type { Organizer } from "@/content/team";

/**
 * Pointy-top hexagon, matching the honeycomb hero geometry. A regular hex is
 * ~0.866 as wide as it is tall, so the avatar container uses that aspect ratio.
 */
const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

/** Initials for the fallback monogram avatar. */
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * A single organizer rendered as a honeycomb cell: a hexagon avatar (photo or
 * monogram fallback) framed by a honey rim, with name, role, and an optional
 * LinkedIn link. `featured` enlarges the cell for Directors. Part of a
 * staggered grid reveal.
 */
export function OrganizerCard({
  organizer,
  featured = false,
}: {
  organizer: Organizer;
  featured?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "group flex flex-col items-center text-center",
        // Featured cells sit in a flex-wrap row, so they need an explicit width.
        featured && "w-44 sm:w-52",
      )}
    >
      {/* Honeycomb cell: honey frame + inset avatar, both hex-clipped. */}
      <div
        className={cn(
          "relative aspect-[0.866] w-full transition-transform duration-300 ease-out group-hover:-translate-y-1",
          featured ? "max-w-44 sm:max-w-52" : "max-w-28 sm:max-w-32",
        )}
      >
        {/* Honey rim — brightens and lifts a soft glow on hover. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-honey transition-all duration-300 group-hover:bg-honey-foreground group-hover:drop-shadow-[0_8px_20px_rgba(217,164,65,0.35)]"
          style={{ clipPath: HEX_CLIP }}
        />
        {/* Inset by a few px so the frame reads as a border around the photo. */}
        <div
          className="absolute inset-[3px] overflow-hidden"
          style={{ clipPath: HEX_CLIP }}
        >
          {organizer.image ? (
            <Image
              src={organizer.image}
              alt={organizer.name}
              fill
              sizes={featured ? "208px" : "128px"}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <span
              aria-hidden="true"
              className={cn(
                "flex size-full items-center justify-center bg-honey-soft font-semibold text-honey-foreground",
                featured ? "text-4xl" : "text-2xl",
              )}
            >
              {initials(organizer.name)}
            </span>
          )}
        </div>
      </div>

      <h3 className={cn("mt-4 font-semibold", featured && "text-lg")}>
        {organizer.name}
        {organizer.pronouns ? (
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
            ({organizer.pronouns})
          </span>
        ) : null}
      </h3>
      <p
        className={cn(
          "text-sm text-muted-foreground",
          featured && "font-medium text-foreground",
        )}
      >
        {organizer.role}
      </p>
      {organizer.linkedin ? (
        <a
          href={organizer.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`${organizer.name} on LinkedIn`}
        >
          <LinkedInIcon className="size-4" />
        </a>
      ) : null}
    </motion.div>
  );
}
