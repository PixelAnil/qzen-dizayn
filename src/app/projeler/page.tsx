import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description: "QZEN DİZAYN'ın tamamladığı asma tavan, duvar ve iç dekorasyon projeleri.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projelerimiz"
        intro="Tamamladığımız asma tavan, duvar ve iç dekorasyon işlerinden bir seçki."
        action={<Button href={site.phone.href}>Projenizi konuşalım</Button>}
      />

      <div className="px-2 md:px-8">
        <ProjectGrid projects={projects} />
      </div>

      <section data-reveal-group className="flex flex-col items-start gap-8 px-4 py-32 md:flex-row md:items-end md:justify-between md:px-8 md:py-48">
        <h2 data-reveal className="display max-w-[16ch] text-head text-ivory">
          Sıradaki proje sizinki olsun
        </h2>
        <Button data-reveal href={site.phone.href}>
          Ara: {site.phone.display}
        </Button>
      </section>
    </>
  );
}
