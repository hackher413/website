import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

/**
 * Gallery tile for a winning project. Sharp edge, espresso caption bar -
 * not a soft rounded card with gradient overlay.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  /** Eager-load cover for above-the-fold LCP cards. */
  priority?: boolean;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden border border-border bg-card transition-colors hover:border-brand/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-espresso">
        <Image
          src={project.image}
          alt={`${project.name} - Hack(H)er413 winning project`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col gap-1 border-t border-border bg-background p-4">
        {project.award ? (
          <span className="text-xs font-medium tracking-wide text-muted-foreground">
            {project.award}
          </span>
        ) : null}
        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
          <ArrowUpRight
            className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
        <p
          className={cn(
            "text-sm text-muted-foreground text-pretty",
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
