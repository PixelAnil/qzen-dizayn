import Image from "next/image";
import { asset } from "@/lib/asset";
import type { Project } from "@/lib/projects";

/** Masonry: two columns of pictures at their own proportions, with thin gaps. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div data-reveal-group className="gap-2 sm:columns-2">
      {projects.map((project, i) => (
        <figure key={project.slug} data-reveal className="group relative mb-2 break-inside-avoid overflow-hidden bg-graphite-soft">
          <Image
            src={asset(project.image)}
            alt={`${project.title}, ${project.category}`}
            width={project.width}
            height={project.height}
            sizes="(min-width: 640px) 50vw, 100vw"
            loading={i < 2 ? "eager" : "lazy"}
            className="w-full transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
          />

          {/* Hover: the picture darkens and the name appears in gold. Touch screens keep the name visible at the foot. */}
          <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-obsidian/70 p-6 text-center opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100 [@media(hover:none)]:inset-auto [@media(hover:none)]:inset-x-0 [@media(hover:none)]:bottom-0 [@media(hover:none)]:items-start [@media(hover:none)]:bg-obsidian/75 [@media(hover:none)]:p-4 [@media(hover:none)]:text-left [@media(hover:none)]:opacity-100">
            <span className="display text-[clamp(1.75rem,1rem+1.6vw,3rem)] leading-[0.92] text-gold">{project.title}</span>
            <span className="text-small text-ivory">{project.category}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
