"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { iconButtonClass } from "@/components/ui/Button";
import { lockScroll } from "@/components/providers/SmoothScroll";
import { asset } from "@/lib/asset";
import type { Project } from "@/lib/projects";

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${flip ? "rotate-180" : ""}`}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

/** Even grid: every picture in the same 4:3 frame. A click opens the full photograph. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<number | null>(null);

  const count = projects.length;
  const step = useCallback((by: number) => setOpen((i) => (i === null ? i : (i + by + count) % count)), [count]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      opener.current?.focus();
    };
  }, [open === null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = open === null ? null : projects[open];

  return (
    <>
      <div data-reveal-group className="grid gap-2 sm:grid-cols-2">
        {projects.map((project, i) => (
          <figure key={project.slug} data-reveal className="relative">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`${project.title} fotoğrafını büyüt`}
              className="group relative block aspect-4/3 w-full overflow-hidden bg-graphite-soft"
            >
              <Image
                src={asset(project.image)}
                alt={`${project.title}, ${project.category}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                loading={i < 2 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
              />

              {/* Hover: the picture darkens and the name appears in gold. Touch screens keep the name visible at the foot. */}
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-obsidian/70 p-6 text-center opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100 [@media(hover:none)]:inset-auto [@media(hover:none)]:inset-x-0 [@media(hover:none)]:bottom-0 [@media(hover:none)]:items-start [@media(hover:none)]:bg-obsidian/75 [@media(hover:none)]:p-4 [@media(hover:none)]:text-left [@media(hover:none)]:opacity-100">
                <span className="display text-[clamp(1.75rem,1rem+1.6vw,3rem)] text-gold">{project.title}</span>
                <span className="text-small text-ivory">{project.category}</span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="lightbox fixed inset-0 z-[90] flex flex-col bg-obsidian"
          onClick={(e) => e.target === e.currentTarget && close()}
          onPointerDown={(e) => (swipeStart.current = e.clientX)}
          onPointerUp={(e) => {
            if (swipeStart.current === null) return;
            const dx = e.clientX - swipeStart.current;
            swipeStart.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-4 pt-4 md:px-8 md:pt-6" style={{ paddingTop: "max(1rem, env(safe-area-inset-top, 0px))" }}>
            <p className="text-small text-ash">
              {open! + 1} / {count}
            </p>
            <button ref={closeRef} type="button" onClick={close} aria-label="Kapat" className={iconButtonClass}>
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 md:px-24">
            <Image
              key={current.slug}
              src={asset(current.image)}
              alt={`${current.title}, ${current.category}`}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="lightbox-image pointer-events-auto h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-4 px-4 pb-6 md:px-8 md:pb-8">
            <div>
              <p className="text-lead text-gold">{current.title}</p>
              <p className="text-small text-ivory">{current.category}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="Önceki fotoğraf" className={iconButtonClass}>
                <Chevron />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Sonraki fotoğraf" className={iconButtonClass}>
                <Chevron flip />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
