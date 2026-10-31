import { HeroSequence } from "@/components/home/HeroSequence";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ServicesIndex } from "@/components/services/ServicesIndex";

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
          <ServicesIndex />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
