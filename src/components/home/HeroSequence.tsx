"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEQUENCE, frameSrc, pickSet, type SequenceSet } from "@/lib/sequence";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const { frameCount } = SEQUENCE;
const LOAD_CONCURRENCY = 6;

// What the film shows at each point: the visitor scrubs the job from shell to hand-over.
const STAGES = [
  { from: 0, label: "Ham yapı" },
  { from: 25, label: "Işık ve duvar" },
  { from: 50, label: "Asma tavan" },
  { from: 75, label: "Mermer, ahşap, mobilya" },
  { from: 110, label: "Teslim" },
] as const;

const stageAt = (frame: number) => STAGES.findLastIndex((s) => frame >= s.from);

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
  const [stage, setStage] = useState(0);

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

      // The film's own last frames fade to black, handing over to the next section
      tl.to(playhead, {
        frame: frameCount - 1,
        duration: 1,
        onUpdate: () => {
          const next = Math.round(playhead.frame);
          if (next !== current) {
            current = next;
            requestDraw();
            setStage(stageAt(next));
          }
        },
      }, 0)
        .to("[data-hero-title]", { autoAlpha: 0, y: 40, duration: 0.1 }, 0.02)
        .fromTo("[data-hero-progress]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        .to("[data-hero-stage]", { autoAlpha: 0, duration: 0.05 }, 0.95);
    }, section);

    return () => {
      generation++;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      gctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="Kaba yapıdan teslime: QZEN DİZAYN filmi" className="relative h-[480vh] bg-obsidian">
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

        {/* Neutral scrim behind the text band only */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-obsidian/85 to-transparent" /> {/* taste-skill-ignore: neutral scrim over the film for legibility */}

        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 md:px-8 md:pb-6">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div data-hero-title className="flex flex-col items-start gap-5">
              <p className="max-w-[34ch] text-lead text-ivory">
                Erzurum&apos;da iç mimari, asma tavan ve anahtar teslim tadilat.
              </p>
              <a
                href={site.phone.href}
                className="inline-flex min-h-13 items-center bg-gold px-7 text-body font-medium text-obsidian transition-[background-color,transform] duration-300 hover:bg-gold-light active:scale-[0.98]"
              >
                Keşif için arayın
              </a>
            </div>

            <div data-hero-stage className="w-full max-w-xs sm:w-72" aria-live="polite">
              <p className="text-small text-ash">
                Filmi kaydırın: <span className="font-medium text-gold">{STAGES[stage].label}</span>
              </p>
              <div aria-hidden className="mt-3 h-1 bg-ivory/15">
                <div data-hero-progress className="h-full origin-left scale-x-0 bg-gold" />
              </div>
            </div>
          </div>

          <h1 data-hero-title className="display mt-6 pt-[0.16em] text-[min(33vw,34svh)] leading-[0.82] text-ivory lg:text-[20.4vw]">
            QZEN <br className="lg:hidden" />
            DİZAYN
          </h1>
        </div>
      </div>
    </section>
  );
}
