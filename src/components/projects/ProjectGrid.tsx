import Image from "next/image";
import { asset } from "@/lib/asset";
import type { Project } from "@/lib/projects";

const spanClass: Record<Project["span"], string> = {
  large: "sm:col-span-2 sm:row-span-2",
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  base: "",
};

function ProjectTile({ project, eager }: { project: Project; eager: boolean }) {
  return (
    <figure
      data-reveal
      className={`group relative aspect-4/5 overflow-hidden bg-graphite-soft sm:aspect-auto ${spanClass[project.span]}`}
    >
      <Image
        src={asset(project.image)}
        alt={`${project.title}, ${project.category}`}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        loading={eager ? "eager" : "lazy"}
        className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
      />

      {/* Hover: the picture darkens and the name appears in gold. Touch screens keep the name visible at the foot. */}
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-obsidian/70 p-6 text-center opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100 [@media(hover:none)]:inset-auto [@media(hover:none)]:inset-x-0 [@media(hover:none)]:bottom-0 [@media(hover:none)]:items-start [@media(hover:none)]:p-4 [@media(hover:none)]:text-left [@media(hover:none)]:opacity-100">
        <span className="display text-lead text-gold lg:text-[clamp(1.75rem,1rem+1.2vw,2.5rem)]">{project.title}</span>
        <span className="text-small text-ivory">{project.category}</span>
      </figcaption>
    </figure>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div data-reveal-group className="grid grid-flow-dense grid-cols-1 gap-2 sm:auto-rows-[18rem] sm:grid-cols-2 lg:auto-rows-[21rem] lg:grid-cols-4">
      {projects.map((project, i) => (
        <ProjectTile key={project.slug} project={project} eager={i < 3} />
      ))}
    </div>
  );
}
