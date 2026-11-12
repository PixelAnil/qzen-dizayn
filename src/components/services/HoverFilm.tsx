"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { filmUrl } from "@/lib/film";

/**
 * A service's build-up film in the hover card of the services list. Nothing is downloaded until
 * the row is hovered (scrambled film, see src/lib/film.ts); then the film plays from bare concrete and rests on the finished room.
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

    let hovered = false;
    const enter = async () => {
      hovered = true;
      try {
        if (!video.currentSrc) video.src = await filmUrl(src);
        if (!hovered) return;
        video.currentTime = 0;
        await video.play();
      } catch {
        // the finished frame stays as the poster
      }
    };
    const leave = () => {
      hovered = false;
      video.pause();
    };
    row.addEventListener("mouseenter", enter);
    row.addEventListener("mouseleave", leave);
    return () => {
      row.removeEventListener("mouseenter", enter);
      row.removeEventListener("mouseleave", leave);
    };
  }, [src, end]);

  return (
    <video
      ref={ref}
      poster={asset(start)}
      muted
      playsInline
      draggable={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload noplaybackrate noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      className="media-guard h-full w-full object-cover object-top"
    />
  );
}
