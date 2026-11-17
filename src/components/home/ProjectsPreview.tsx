import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { projects } from "@/lib/content";
import { projectAlt } from "@/lib/projects";

/** How many jobs stand side by side on a wide screen; a phone shows the first three */
const SLATS = 5;

/**
 * Finished jobs, then the way into the full portfolio. On a wide screen they stand like the slats of a
 * lambiri wall: narrow upright panels side by side, and the one under the pointer opens out to show the
 * whole picture (the first one stays open until the pointer arrives). See .slats in globals.css.
 */
export function ProjectsPreview() {
  const shown = projects.slice(0, SLATS);

  return (
    <section aria-labelledby="projeler-baslik" data-reveal-group className="bg-obsidian px-4 pb-32 md:px-8 md:pb-52">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="projeler-baslik" data-reveal className="display text-head text-ivory">
          Tamamlanan projeler
        </h2>
        <Button data-reveal href="/projeler" variant="secondary" className="hidden md:inline-flex">
          Daha fazla proje
        </Button>
      </div>

      <div data-reveal className="slats mt-12 grid gap-2 md:mt-16 md:flex md:h-(--slats-h)">
        {shown.map((project, i) => (
          <Link
            key={project.slug}
            href="/projeler"
            style={{ "--ar": project.width / project.height } as React.CSSProperties}
            className={`slat group relative block overflow-hidden bg-graphite-soft ${i === 0 ? "aspect-4/3" : "aspect-4/5"} md:aspect-auto ${i >= 3 ? "hidden md:block" : ""}`}
          >
            <Image
              src={asset(project.image)}
              alt={projectAlt(project.title)}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
            {/* A dark wash keeps the narrow slats quiet so the open one leads */}
            <span aria-hidden className="slat-shade absolute inset-0 hidden bg-obsidian/45 md:block" />
            {project.title && (
              <>
                {/* Closed slat: the name runs up the panel */}
                <span aria-hidden className="slat-spine absolute bottom-6 left-1/2 hidden -translate-x-1/2 rotate-180 whitespace-nowrap display text-[1.25rem] text-gold [writing-mode:vertical-rl] md:block">
                  {project.title}
                </span>
                {/* Open slat (and every card on a phone): the name across the foot */}
                <span className="slat-title absolute inset-x-0 bottom-0 bg-linear-to-t from-obsidian/85 to-transparent p-4 md:p-8">
                  <span className="display block text-[1.5rem] text-gold md:text-[clamp(1.5rem,0.9rem+1.2vw,2.5rem)]">{project.title}</span>
                </span>
              </>
            )}
          </Link>
        ))}
      </div>

      <Button data-reveal href="/projeler" className="mt-10 w-full md:mt-12 md:w-auto">
        Tüm projeleri incele
      </Button>
    </section>
  );
}
