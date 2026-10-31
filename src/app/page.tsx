import { HeroSequence } from "@/components/home/HeroSequence";
import { AboutSection } from "@/components/home/AboutSection";
import { ProjectsPanel } from "@/components/home/ProjectsPanel";
import { VisitSection } from "@/components/home/VisitSection";
import { ServicesSheet } from "@/components/services/ServicesSheet";

export default function HomePage() {
  return (
    <>
      <HeroSequence />
      <AboutSection />
      <ServicesSheet id="hizmetler" />
      <ProjectsPanel />
      <VisitSection />
    </>
  );
}
