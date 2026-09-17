import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

/**
 * Gallery tile for a winning project. Cover image with name overlay; award as
 * quiet text rather than a floating pill.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-card"
    >
      <Image
        src={project.image}
        alt={`${project.name} — Hack(H)er413 winning project`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
        {project.award ? (
          <span className="text-xs font-medium tracking-wide text-honey">
            {project.award}
          </span>
        ) : null}
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
            "max-h-0 overflow-hidden opacity-0 transition-all duration-300",
            "group-hover:max-h-32 group-hover:opacity-100 group-focus-visible:max-h-32 group-focus-visible:opacity-100",
            "motion-reduce:max-h-32 motion-reduce:opacity-100",
          )}
        >
          {project.description}
        </p>
      </div>
    </a>
  );
}
