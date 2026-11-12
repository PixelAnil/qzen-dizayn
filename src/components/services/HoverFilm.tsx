"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/**
 * A service's build-up film in the hover card of the services list. Nothing is downloaded until
 * the row is hovered; then the film plays from bare concrete and rests on the finished room.
 * Reduced-motion visitors see only the finished frame.
 */
export function HoverFilm({ src, start, end }: { src: string; start: string; end: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const row = video?.closest("a");
    if (!video || !row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.poster = asset(end);
      return;
    }

    const enter = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    const leave = () => video.pause();
    row.addEventListener("mouseenter", enter);
    row.addEventListener("mouseleave", leave);
    return () => {
      row.removeEventListener("mouseenter", enter);
      row.removeEventListener("mouseleave", leave);
    };
  }, [end]);

  return (
    <video
      ref={ref}
      src={asset(src)}
      poster={asset(start)}
      muted
      playsInline
      preload="none"
      className="h-full w-full object-cover"
    />
  );
}
