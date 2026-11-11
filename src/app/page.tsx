import type { Metadata } from "next";
import { HeroSequence } from "@/components/home/HeroSequence";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { Button } from "@/components/ui/Button";
import { HOME_SERVICES, services } from "@/lib/content";
import { pageSeo, seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata(pageSeo.home, "/");

export default function HomePage() {
  return (
    <>
      <HeroSequence />
      <AboutSection />
      <ProjectsPreview />

      <section aria-labelledby="hizmetler-baslik" className="bg-obsidian px-4 pb-32 md:px-8 md:pb-52">
        <h2 id="hizmetler-baslik" className="display text-head text-ivory">
          Hizmetlerimiz
        </h2>
        <div className="mt-8 md:mt-12">
          <ServicesIndex limit={HOME_SERVICES} />
        </div>
        <Button href="/hizmetler" className="mt-10 w-full md:mt-12 md:w-auto">
          Tüm hizmetlerimiz ({services.length})
        </Button>
      </section>

      <ContactSection />
      <ReviewsSection />
    </>
  );
}
