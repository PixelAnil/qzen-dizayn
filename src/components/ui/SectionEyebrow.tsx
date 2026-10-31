export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
      <span aria-hidden className="h-px w-10 bg-gold/70" />
      {children}
    </p>
  );
}
