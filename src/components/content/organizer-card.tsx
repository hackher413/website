"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";
import { LinkedInIcon } from "@/components/icons/brand-icons";
import type { Organizer } from "@/content/team";

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
 * A single organizer: avatar (photo or monogram fallback), name, role, and an
 * optional LinkedIn link. Part of a staggered grid reveal.
 */
export function OrganizerCard({ organizer }: { organizer: Organizer }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
      {organizer.image ? (
        <Image
          src={organizer.image}
          alt={organizer.name}
          width={128}
          height={128}
          className="size-28 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-28 items-center justify-center rounded-full bg-honey-soft text-2xl font-semibold text-honey-foreground"
        >
          {initials(organizer.name)}
        </span>
      )}
      <h3 className="mt-4 font-semibold">
        {organizer.name}
        {organizer.pronouns ? (
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
            ({organizer.pronouns})
          </span>
        ) : null}
      </h3>
      <p className="text-sm text-muted-foreground">{organizer.role}</p>
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
