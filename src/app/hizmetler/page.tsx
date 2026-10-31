import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Asma tavan, alçıpan, anahtar teslim ev tadilatı, iç dekorasyon ve ticari tadilat hizmetleri.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hizmetlerimiz"
        title={
          <>
            İlk çizgiden <span className="text-gold-gradient">son dokunuşa</span>
          </>
        }
        intro="Tasarım ve uygulamayı tek çatı altında topluyor, her ölçekteki projeyi aynı özen ve aynı imzayla teslim ediyoruz."
      />

      <ol className="mx-auto max-w-7xl px-6 md:px-10">
        {services.map((service, i) => (
          <li
            key={service.title}
            className="group grid gap-4 border-t border-gold/20 py-12 transition-colors duration-500 last:border-b hover:border-gold/60 md:grid-cols-[8rem_1fr_1fr] md:gap-10"
          >
            <span className="font-display text-2xl text-gold/60 transition-colors group-hover:text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-3xl leading-tight md:text-4xl">{service.title}</h2>
            <p className="leading-loose">{service.summary}</p>
          </li>
        ))}
      </ol>

      <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-6 py-24 md:px-10 md:py-32">
        <Button href="#iletisim">İletişime Geç</Button>
        <Button href="/projeler" variant="secondary">Projeleri İncele</Button>
      </div>
    </>
  );
}
