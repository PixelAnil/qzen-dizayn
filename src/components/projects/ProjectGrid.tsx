import Image from "next/image";
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
      className={`group relative aspect-4/5 overflow-hidden bg-graphite-soft sm:aspect-auto ${spanClass[project.span]}`}
    >
      <Image
        src={project.image}
        alt={`${project.title} — ${project.category}`}
        fill
        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
        loading={eager ? "eager" : "lazy"}
        className="object-cover transition-transform duration-1200 ease-luxe group-hover:scale-105"
      />

      {/* Hover veil; on touch devices the caption stays visible at the bottom */}
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-obsidian/65 p-6 text-center opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100 [@media(hover:none)]:justify-end [@media(hover:none)]:bg-transparent [@media(hover:none)]:bg-linear-to-t [@media(hover:none)]:from-obsidian/85 [@media(hover:none)]:via-transparent [@media(hover:none)]:to-transparent [@media(hover:none)]:opacity-100">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-ash">{project.category}</span>
        <span className="font-display text-3xl text-gold-gradient lg:text-4xl">{project.title}</span>
        <span aria-hidden className="h-px w-12 translate-y-2 bg-gold opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100" />
      </figcaption>
    </figure>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-flow-dense grid-cols-1 gap-2 sm:auto-rows-[18rem] sm:grid-cols-2 lg:auto-rows-[20rem] lg:grid-cols-4">
      {projects.map((project, i) => (
        <ProjectTile key={project.slug} project={project} eager={i < 3} />
      ))}
    </div>
  );
}
