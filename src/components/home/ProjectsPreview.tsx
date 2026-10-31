import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { projects } from "@/lib/projects";

/** A few finished jobs at different sizes, then the way into the full portfolio. */
export function ProjectsPreview() {
  const [wide, tall, third] = projects;

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

      {/* One row, three widths, one height */}
      <div className="mt-12 grid gap-2 md:mt-16 md:h-[min(40rem,70svh)] md:grid-cols-12">
        {[
          { project: wide, className: "aspect-4/3 md:col-span-6 md:aspect-auto" },
          { project: tall, className: "aspect-4/5 md:col-span-3 md:aspect-auto" },
          { project: third, className: "aspect-4/5 md:col-span-3 md:aspect-auto" },
        ].map(({ project, className }) => (
          <Link
            key={project.slug}
            href="/projeler"
            data-reveal
            className={`group relative block overflow-hidden bg-graphite-soft ${className}`}
          >
            <Image
              src={asset(project.image)}
              alt={`${project.title}, ${project.category}`}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-obsidian/70 px-4 py-3 text-small text-ivory">
              {project.title}
            </span>
          </Link>
        ))}
      </div>

      <Button data-reveal href="/projeler" className="mt-10 w-full md:mt-12 md:w-auto">
        Tüm projeleri incele
      </Button>
    </section>
  );
}
