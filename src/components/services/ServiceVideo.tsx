"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { asset } from "@/lib/asset";

type Props = { src: string; start: string; end: string; title: string };

const REDUCED = "(prefers-reduced-motion: reduce)";
/** How long the finished room stays on screen before the film starts again */
const HOLD_MS = 3000;
/** Circumference of the progress ring (r = 21 in a 48 box) */
const RING = 2 * Math.PI * 21;

/** Reduced motion or data saver: show the finished frame instead of playing by itself. */
function usePrefersStill() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () =>
      window.matchMedia(REDUCED).matches ||
      !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    () => false,
  );
}

/**
 * The service's build-up film, from bare concrete to the finished room. While it is on screen it
 * loops, resting on the finished room for a moment before each new run; off screen it pauses.
 * A button stops and starts it. Reduced motion and data-saver visitors get the finished frame and
 * can start the film themselves.
 */
export function ServiceVideo({ src, start, end, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  // null: follow the visitor's settings; true/false: the visitor pressed the button
  const [choice, setChoice] = useState<boolean | null>(null);
  const prefersStill = usePrefersStill();
  const running = choice ?? !prefersStill;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!running) {
      video.pause();
      return;
    }

    let visible = false;
    let hold: ReturnType<typeof setTimeout> | undefined;
    // Autoplay refused (e.g. low-power mode): stop and offer the button instead
    const play = () => video.play().catch(() => setChoice(false));

    const onEnded = () => {
      hold = setTimeout(() => {
        hold = undefined;
        if (visible) play();
      }, HOLD_MS);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) video.pause();
        else if (!hold) play();
      },
      { threshold: 0.5 },
    );

    video.addEventListener("ended", onEnded);
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
      clearTimeout(hold);
    };
  }, [running]);

  // The gold ring around the button follows the film; drawn straight onto the SVG, no re-renders
  useEffect(() => {
    const video = videoRef.current;
    const ring = ringRef.current;
    if (!video || !ring) return;
    let frame = 0;
    const draw = () => {
      const done = video.duration ? video.currentTime / video.duration : 0;
      ring.style.strokeDashoffset = String(RING * (1 - done));
      if (!video.paused) frame = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    video.addEventListener("play", start);
    video.addEventListener("seeked", draw);
    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("play", start);
      video.removeEventListener("seeked", draw);
    };
  }, []);

  const label = running ? "Filmi durdur" : choice === false ? "Filmi oynat" : "Uygulama filmini izle";

  return (
    <div className="relative aspect-3/4 w-full overflow-hidden bg-graphite">
      <video
        ref={videoRef}
        src={asset(src)}
        poster={asset(running ? start : end)}
        muted
        playsInline
        preload="metadata"
        aria-label={`${title}: kaba yapıdan bitmiş mekâna uygulama animasyonu`}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={() => setChoice(!running)}
        aria-label={label}
        title={label}
        className="group absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-obsidian/55 text-ivory ring-1 ring-ivory/15 transition-[background-color,transform,color] duration-300 hover:scale-105 hover:bg-obsidian/80 hover:text-gold-light active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            ref={ringRef}
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={RING}
            strokeDashoffset={RING}
            className="text-gold"
          />
        </svg>
        <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          {running ? (
            <>
              <rect x="6" y="4.5" width="3.6" height="15" rx="1" />
              <rect x="14.4" y="4.5" width="3.6" height="15" rx="1" />
            </>
          ) : (
            <path d="M8 5.2c0-.8.9-1.3 1.6-.9l10 6.3c.6.4.6 1.4 0 1.8l-10 6.3c-.7.4-1.6-.1-1.6-.9z" />
          )}
        </svg>
      </button>
    </div>
  );
}
