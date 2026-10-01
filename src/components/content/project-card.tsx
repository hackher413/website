import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { HexMark } from "@/components/content/hex-mark";
import type { Project } from "@/content/projects";

/**
 * Gallery tile for a winning project. Sharp edge, espresso caption bar,
 * honey hover accents. Description overlays the cover on hover so sibling
 * cards in the same grid row never stretch with empty caption space.
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
      className="group block overflow-hidden border border-border bg-espresso transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-honey hover:shadow-[4px_4px_0_0_var(--color-honey)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
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

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso via-espresso/90 to-transparent px-4 pt-16 pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:opacity-100"
          aria-hidden="true"
        >
          <p className="text-sm text-cream/85 text-pretty">{project.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t border-honey/25 bg-espresso px-4 py-3.5 text-cream">
        {project.award ? (
          <span className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-honey">
            <HexMark size="sm" tone="honey" />
            {project.award}
          </span>
        ) : null}
        <div className="flex items-center gap-2">
          {!project.award ? <HexMark size="sm" tone="honey" /> : null}
          <h3 className="text-lg font-semibold tracking-tight text-cream">
            {project.name}
          </h3>
          <ArrowUpRight
            className="size-4 shrink-0 text-honey/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-honey"
            aria-hidden="true"
          />
        </div>
        {/* Screen-reader / reduced-motion: description lives in the overlay visually */}
        <span className="sr-only">{project.description}</span>
      </div>
    </a>
  );
}
