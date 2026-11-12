"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { asset } from "@/lib/asset";

type Props = { src: string; start: string; end: string; title: string };

const REDUCED = "(prefers-reduced-motion: reduce)";
/** How long the finished room stays on screen before the film starts again */
const HOLD_MS = 3000;

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
        className="absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-obsidian/80 px-4 text-small text-ivory transition-colors hover:bg-obsidian hover:text-gold-light focus-visible:outline-2 focus-visible:outline-gold"
      >
        <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          {running ? <path d="M9 6v12M15 6v12" /> : <path d="M8 5.5v13l10-6.5z" />}
        </svg>
        {running ? "Durdur" : choice === false ? "Oynat" : "Uygulamayı izle"}
      </button>
    </div>
  );
}
