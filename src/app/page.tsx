import { HeroSequence } from "@/components/home/HeroSequence";
import { AboutSection } from "@/components/home/AboutSection";
import { ProjectsCta } from "@/components/home/ProjectsCta";

export default function HomePage() {
  return (
    <>
      <HeroSequence />
      <AboutSection />
      <ProjectsCta />
    </>
  );
}
