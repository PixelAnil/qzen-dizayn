import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description: "QZEN DİZAYN imzalı tamamlanmış iç mimari, dekorasyon ve tadilat projeleri.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projelerimiz"
        title={
          <>
            Tamamlanan <span className="text-gold-gradient">işlerimiz</span>
          </>
        }
        intro="Her biri kendi hikâyesiyle; ham yapıdan anahtar teslime uzanan, ışığın ve malzemenin özenle kurgulandığı mekânlar."
      />

      <div className="mx-auto max-w-7xl px-2 sm:px-6 md:px-10">
        <ProjectGrid projects={projects} />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-24 md:flex-row md:items-center md:justify-between md:px-10 md:py-32">
        <p className="font-display text-3xl text-ivory md:text-4xl">Sıradaki proje sizin olsun.</p>
        <Button href="#iletisim">İletişime Geç</Button>
      </div>
    </>
  );
}
