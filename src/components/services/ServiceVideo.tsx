"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { asset } from "@/lib/asset";

type Props = { src: string; start: string; end: string; title: string };

const REDUCED = "(prefers-reduced-motion: reduce)";

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
 * The service's build-up film, from bare concrete to the finished room. It plays once when it
 * scrolls into view and rests on the finished frame; a small button plays it again. Reduced
 * motion and data-saver visitors get the finished frame and can start the film themselves.
 */
export function ServiceVideo({ src, start, end, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"idle" | "playing" | "ended">("idle");
  // Autoplay refused (e.g. low-power mode): fall back to the finished frame and the play button
  const [blocked, setBlocked] = useState(false);
  const prefersStill = usePrefersStill();
  const still = prefersStill || blocked;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersStill) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        video.play().catch(() => setBlocked(true));
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersStill]);

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    setBlocked(false);
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <div className="relative aspect-3/4 w-full overflow-hidden bg-graphite">
      <video
        ref={videoRef}
        src={asset(src)}
        poster={asset(still ? end : start)}
        muted
        playsInline
        preload="metadata"
        aria-label={`${title}: kaba yapıdan bitmiş mekâna uygulama animasyonu`}
        onPlay={() => setState("playing")}
        onEnded={() => setState("ended")}
        className="h-full w-full object-cover"
      />
      {(state === "ended" || (still && state !== "playing")) && (
        <button
          type="button"
          onClick={replay}
          className="absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-obsidian/80 px-4 text-small text-ivory transition-colors hover:bg-obsidian hover:text-gold-light focus-visible:outline-2 focus-visible:outline-gold"
        >
          <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            {still && state === "idle" ? <path d="M8 5.5v13l10-6.5z" /> : <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />}
          </svg>
          {still && state === "idle" ? "Uygulamayı izle" : "Tekrar izle"}
        </button>
      )}
    </div>
  );
}
