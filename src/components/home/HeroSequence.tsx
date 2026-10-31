"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEQUENCE, canLoadHd, frameSrc, pickSet, type SequenceSet, type SequenceTier } from "@/lib/sequence";

gsap.registerPlugin(ScrollTrigger);

const { frameCount } = SEQUENCE;
const LOAD_CONCURRENCY = 6;

// What the film shows at each point: scrolling plays the job from shell to hand-over.
const STAGES = [
  { from: 0, label: "Ham yapı" },
  { from: 25, label: "Işık ve duvar" },
  { from: 50, label: "Asma tavan" },
  { from: 75, label: "Mermer ve ahşap" },
  { from: 110, label: "Teslim" },
] as const;

const stageAt = (frame: number) => STAGES.findLastIndex((s) => frame >= s.from);

/** Coarse-to-fine order (every 16th frame, then every 8th, …) so fast scrubbing still finds a nearby frame. */
function progressiveOrder(count: number) {
  const seen = new Set<number>();
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

/** Builds one stage label as masked characters so each letter can rise on its own. */
function buildLabel(text: string) {
  const line = document.createElement("span");
  line.className = "absolute inset-x-0 bottom-0 block whitespace-nowrap";
  line.setAttribute("aria-hidden", "true");
  for (const char of text) {
    const mask = document.createElement("span");
    mask.className = "inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom";
    const glyph = document.createElement("span");
    glyph.className = "inline-block will-change-transform";
    glyph.textContent = char === " " ? " " : char;
    mask.append(glyph);
    line.append(mask);
  }
  return line;
}

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const stageBox = stageRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !stageBox || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones and tablets: light frames only and a lower pixel ratio. Holding 150 decoded HD
    // frames (~1 GB) makes mobile browsers evict and re-decode them mid-scroll, which stutters.
    const lite = window.matchMedia("(pointer: coarse)").matches;
    let set: SequenceSet = pickSet(window.innerWidth, window.innerHeight);
    // Best decoded frame per index; HD frames replace light ones as they arrive
    let images: (HTMLImageElement | null)[] = [];
    let tiers: (SequenceTier | null)[] = [];
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

    // ── Loading: light first frame at once, the light set, then the HD set in the background ──
    const loadFrame = (index: number, tier: SequenceTier, gen: number, priority: "high" | "low") =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.fetchPriority = priority;
        img.src = frameSrc(set, index, tier);
        img
          .decode()
          .then(() => {
            if (gen !== generation || (tier === "light" && tiers[index] === "hd")) return;
            images[index] = img;
            tiers[index] = tier;
            if (Math.abs(index - current) <= 2) requestDraw();
          })
          .catch(() => {})
          .finally(resolve);
      });

    const loadTier = async (tier: SequenceTier, gen: number, concurrency: number) => {
      // Light tier: coarse-to-fine. HD tier: outward from where the visitor is, so the visible frame sharpens first
      const queue =
        tier === "light"
          ? progressiveOrder(frameCount).filter((i) => i !== 0)
          : Array.from({ length: frameCount }, (_, i) => i).sort((a, b) => Math.abs(a - current) - Math.abs(b - current));
      const worker = async () => {
        while (queue.length && gen === generation) {
          await loadFrame(queue.shift()!, tier, gen, "low");
        }
      };
      await Promise.all(Array.from({ length: concurrency }, worker));
    };

    const loadSequence = async () => {
      const gen = ++generation;
      images = new Array(frameCount).fill(null);
      tiers = new Array(frameCount).fill(null);

      await loadFrame(0, "light", gen, "high");
      await loadTier("light", gen, LOAD_CONCURRENCY);
      if (gen === generation && !lite && canLoadHd()) await loadTier("hd", gen, 4);
    };

    // ── Sizing: crisp on HiDPI, recentred on every resize ──
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2);
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

    // ── Stage label: the outgoing word lifts away, the next one rises letter by letter ──
    let shownStage = -1;
    let shownLine: HTMLElement | null = null;

    const showStage = (index: number) => {
      if (index === shownStage) return;
      const forward = index > shownStage;
      shownStage = index;
      if (liveRef.current) liveRef.current.textContent = STAGES[index].label;

      const previous = shownLine;
      // Fast scrubbing: anything older than the word on screen goes at once, so words never pile up
      for (const stale of Array.from(stageBox.children)) {
        if (stale !== previous) {
          gsap.killTweensOf(stale.querySelectorAll("span > span"));
          stale.remove();
        }
      }
      if (previous) gsap.killTweensOf(previous.querySelectorAll("span > span"));

      const line = buildLabel(STAGES[index].label);
      stageBox.append(line);
      shownLine = line;
      const glyphs = line.querySelectorAll<HTMLElement>("span > span");

      if (reduceMotion) {
        previous?.remove();
        return;
      }

      if (previous) {
        gsap.to(previous.querySelectorAll("span > span"), {
          yPercent: forward ? -110 : 110,
          opacity: 0,
          duration: 0.45,
          ease: "power3.in",
          stagger: 0.012,
          onComplete: () => previous.remove(),
        });
      }
      gsap.fromTo(
        glyphs,
        // The blur is skipped on touch devices: filter animation is costly on phone GPUs
        { yPercent: forward ? 110 : -110, opacity: 0, ...(!lite && { filter: "blur(6px)" }) },
        {
          yPercent: 0,
          opacity: 1,
          ...(!lite && { filter: "blur(0px)" }),
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.028,
          delay: previous ? 0.18 : 0.3,
          clearProps: "filter",
        },
      );
    };

    showStage(0);

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
            showStage(stageAt(next));
          }
        },
      }, 0)
        .fromTo("[data-hero-progress]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        .to("[data-hero-stage]", { autoAlpha: 0, duration: 0.04 }, 0.96);
    }, section);

    return () => {
      generation++;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      gctx.revert();
      stageBox.replaceChildren();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="Kaba yapıdan teslime: QZEN DİZAYN filmi" data-hero className="relative h-[480vh] bg-obsidian">
      <h1 className="sr-only">QZEN DİZAYN</h1>

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

        {/* Neutral scrim behind the stage label only */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-t from-obsidian/80 to-transparent" /> {/* taste-skill-ignore: neutral scrim over the film for legibility */}

        <div data-hero-stage className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 md:px-8 md:pb-10">
          <span ref={liveRef} className="sr-only" aria-live="polite" />
          <div
            ref={stageRef}
            className="display relative h-[0.95em] text-[clamp(2.75rem,1.2rem+6.5vw,8.5rem)] leading-[0.9] text-ivory"
          />
          <div aria-hidden className="mt-5 h-[2px] w-[calc(100%-4.5rem)] max-w-sm bg-ivory/12 md:w-full">
            <div data-hero-progress className="h-full origin-left scale-x-0 bg-gold-light" />
          </div>
        </div>
      </div>
    </section>
  );
}
