import { PageHeader } from "@/components/layout/PageHeader";

export type PolicySection = { heading: string; paragraphs: string[] };

/** Shared layout for the legal pages. */
export function PolicyPage({ title, updated, sections }: { title: string; updated: string; sections: PolicySection[] }) {
  return (
    <>
      <PageHeader title={title} intro={`Son güncelleme: ${updated}`} />
      <article className="max-w-[68ch] space-y-6 px-4 pb-40 text-body text-ivory/85 md:px-8">
        {sections.map((section) => (
          <section key={section.heading} className="space-y-4 pt-4">
            <h2 className="text-lead font-medium text-ivory">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </section>
        ))}
      </article>
    </>
  );
}
