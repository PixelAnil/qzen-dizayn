"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { SEQUENCE, frameSrc, pickSet, type SequenceSet } from "@/lib/sequence";

gsap.registerPlugin(ScrollTrigger);

const { frameCount } = SEQUENCE;
const LOAD_CONCURRENCY = 6;

/** Coarse-to-fine order (every 16th frame, then every 8th, …) so fast scrubbing still finds a nearby frame. */
function progressiveOrder(count: number) {
  const seen = new Set<number>([0]);
  const order: number[] = [];
  for (let stride = 16; stride >= 1; stride /= 2) {
    for (let i = 0; i < count; i += stride) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;

    let set: SequenceSet = pickSet(window.innerWidth, window.innerHeight);
    let images: (HTMLImageElement | null)[] = [];
    let generation = 0;
    let current = 0;
    let rafId = 0;

    // ── Drawing: object-fit: cover + object-position: center ──
    const nearestLoaded = (target: number) => {
      for (let d = 0; d < frameCount; d++) {
        if (images[target - d]) return images[target - d];
        if (images[target + d]) return images[target + d];
      }
      return null;
    };

    const draw = () => {
      rafId = 0;
      const img = nearestLoaded(current);
      if (!img) return;
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const requestDraw = () => {
      if (!rafId) rafId = requestAnimationFrame(draw);
    };

    // ── Loading: first frame immediately, the rest asynchronously ──
    const loadFrame = (index: number, gen: number, priority: "high" | "low") =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.fetchPriority = priority;
        img.src = frameSrc(set, index);
        img
          .decode()
          .then(() => {
            if (gen !== generation) return;
            images[index] = img;
            requestDraw();
          })
          .catch(() => {})
          .finally(resolve);
      });

    const loadSequence = async () => {
      const gen = ++generation;
      images = new Array(frameCount).fill(null);

      await loadFrame(0, gen, "high");

      const queue = progressiveOrder(frameCount);
      const worker = async () => {
        while (queue.length && gen === generation) {
          await loadFrame(queue.shift()!, gen, "low");
        }
      };
      await Promise.all(Array.from({ length: LOAD_CONCURRENCY }, worker));
    };

    // ── Sizing: crisp on HiDPI, recentred on every resize ──
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.imageSmoothingQuality = "high";

      const nextSet = pickSet(canvas.clientWidth, canvas.clientHeight);
      if (nextSet !== set) {
        set = nextSet;
        loadSequence();
      }
      requestDraw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    loadSequence();

    // ── Scroll choreography ──
    const gctx = gsap.context(() => {
      const playhead = { frame: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });

      // The film's own last frames fade to black; the overlay only guarantees a clean hand-off
      tl.to(playhead, {
        frame: frameCount - 1,
        duration: 0.92,
        onUpdate: () => {
          const next = Math.round(playhead.frame);
          if (next !== current) {
            current = next;
            requestDraw();
          }
        },
      }, 0)
        .to("[data-hero-intro]", { autoAlpha: 0, y: -48, duration: 0.14 }, 0.02)
        .to("[data-hero-hint]", { autoAlpha: 0, duration: 0.05 }, 0)
        .fromTo("[data-hero-progress]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        .fromTo("[data-hero-caption]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.66)
        .to("[data-hero-caption]", { autoAlpha: 0, duration: 0.06 }, 0.82)
        .to("[data-hero-fade]", { opacity: 1, duration: 0.06 }, 0.94);
    }, section);

    return () => {
      generation++;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      gctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="QZEN DİZAYN tanıtım filmi" className="relative h-[480vh] bg-obsidian">
      {/* Let the browser fetch the poster frame before hydration */}
      <link rel="preload" as="image" href={frameSrc("desktop", 0)} media="(min-aspect-ratio: 1/1)" fetchPriority="high" />
      <link rel="preload" as="image" href={frameSrc("mobile", 0)} media="(max-aspect-ratio: 1/1)" fetchPriority="high" />

      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div
          aria-hidden
          className="hero-poster absolute inset-0"
          style={{
            "--poster-desktop": `url(${frameSrc("desktop", 0)})`,
            "--poster-mobile": `url(${frameSrc("mobile", 0)})`,
          } as React.CSSProperties}
        />
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

        {/* Legibility vignette */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-b from-obsidian/75 via-obsidian/10 to-obsidian/70" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.65)_100%)]" />

        <div data-hero-intro className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-36 md:justify-center md:px-10 md:pb-0">
          <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-gold">
            Mimari · İç Mimari · Dekorasyon
          </p>
          <h1 className="max-w-3xl text-5xl leading-[1.02] sm:text-6xl lg:text-[5.5rem]">
            Ham mekândan <em className="text-gold-gradient not-italic">zamansız</em> yaşama.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ash">
            Betonun sessizliğinden ışığın ve mermerin ritmine; her projeyi ilk çizgiden son dokunuşa kadar
            tek bir tasarım diliyle kuruyoruz.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#iletisim">İletişime Geç</Button>
            <Button href="/projeler" variant="secondary">Projeleri İncele</Button>
          </div>
        </div>

        <p
          data-hero-caption
          className="invisible absolute inset-x-0 bottom-24 z-10 text-center font-display text-3xl text-ivory opacity-0 md:text-5xl"
        >
          Işık, malzeme ve <span className="text-gold-gradient">oran</span>.
        </p>

        <div data-hero-hint className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[0.65rem] uppercase tracking-[0.4em] text-ash">Kaydırın</span>
          <span aria-hidden className="relative h-12 w-px overflow-hidden bg-gold/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_2.2s_var(--ease-luxe)_infinite] bg-gold" />
          </span>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-px bg-white/5">
          <div data-hero-progress className="h-full origin-left scale-x-0 bg-gold-gradient" />
        </div>

        <div aria-hidden data-hero-fade className="pointer-events-none absolute inset-0 z-20 bg-obsidian opacity-0" />
      </div>
    </section>
  );
}
