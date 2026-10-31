import { asset } from "@/lib/asset";

// Frame sequences extracted from the hero film at 15 fps (see scripts/extract-frames.mjs).
// "desktop" comes from the landscape film, "mobile" from the portrait one. Each has a light
// tier that paints at once and an HD tier swapped in from the background.
export const SEQUENCE = {
  frameCount: 150,
  sets: {
    desktop: { light: "/sequence/desktop", hd: "/sequence/desktop-hd" },
    mobile: { light: "/sequence/mobile", hd: "/sequence/mobile-hd" },
  },
} as const;

export type SequenceSet = keyof typeof SEQUENCE.sets;
export type SequenceTier = "light" | "hd";

export const frameSrc = (set: SequenceSet, index: number, tier: SequenceTier = "light") =>
  asset(`${SEQUENCE.sets[set][tier]}/${String(index + 1).padStart(3, "0")}.webp`);

/** Landscape (or square) viewports play the landscape film, portrait ones the portrait film. */
export const pickSet = (width: number, height: number): SequenceSet =>
  width / height >= 1 ? "desktop" : "mobile";

/** Skip the HD tier on slow or metered connections. */
export const canLoadHd = () => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (!connection) return true;
  return !connection.saveData && !["slow-2g", "2g", "3g"].includes(connection.effectiveType ?? "");
};
