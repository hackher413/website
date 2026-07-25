"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import type { Project } from "@/content/projects";

/**
 * A gallery tile for a winning project. The Devpost cover image fills the card;
 * name + tagline sit in a gradient overlay that lifts into full view on hover.
 * Links out to the project's Devpost page. Animates up on scroll as part of a
 * staggered RevealGrid parent.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      variants={fadeUp}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/10"
    >
      <Image
        src={project.image}
        alt={`${project.name} — Hack(H)er413 winning project`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Gradient scrim so text stays legible over any image. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
        aria-hidden="true"
      />

      {project.award ? (
        <span className="absolute left-4 top-4 rounded-full bg-honey px-2.5 py-1 text-xs font-semibold text-honey-foreground shadow-sm">
          {project.award}
        </span>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <ArrowUpRight
            className="size-4 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
        <p
          className={cn(
            "text-sm text-white/85 text-pretty",
            // Tagline tucks away until hover on pointer devices, always shown otherwise.
            "max-h-0 overflow-hidden opacity-0 transition-all duration-300",
            "group-hover:max-h-32 group-hover:opacity-100 group-focus-visible:max-h-32 group-focus-visible:opacity-100",
            "motion-reduce:max-h-32 motion-reduce:opacity-100",
          )}
        >
          {project.description}
        </p>
      </div>
    </motion.a>
  );
}
