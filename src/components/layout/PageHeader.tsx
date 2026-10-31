import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
};

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-7xl px-6 pb-16 pt-40 md:px-10 md:pb-20 md:pt-48">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1 className="mt-8 max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
      {intro && <p className="mt-8 max-w-2xl text-[1.05rem] leading-loose">{intro}</p>}
    </header>
  );
}
