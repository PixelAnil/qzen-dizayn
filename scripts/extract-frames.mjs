// Regenerates the hero image sequences from the two source films.
// Usage: npm run frames [-- desktop|mobile]   (no argument: both)
//
// Landscape screens play the landscape film, portrait screens the portrait one.
// Two tiers per orientation: a light set that paints immediately, and an HD set
// the page swaps in from the background once the light set is loaded.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const FPS = 15;
// Both films must yield the same count (SEQUENCE.frameCount); the stage labels key off frame numbers
const FRAMES = 150;
// Holds the last frame a moment so a film a few ms short still fills the count
const PAD = "tpad=stop_mode=clone:stop_duration=0.5";

const films = {
  desktop: "Qzendizayn-yatay.mp4", // 1920×1080 landscape luxury-salon film, 10 s
  mobile: "Qzendizayn.mp4", // 1080×1920 portrait, 10 s (same build; clean colour, no grade)
};

// Both films are the 10 s luxury-salon build, sampled evenly (15 fps × 10 s = FRAMES); frame numbers
// drive STAGES in src/components/home/HeroSequence.tsx (frame = seconds × 15).
const REMAP = `[0:v]fps=15,${PAD}`;

const sets = {
  // Both films come out of the video tool at 1080p with clean colour: no grade, no sharpening.
  desktop: { film: "desktop", remap: true, filter: "scale=1280:720:flags=lanczos", quality: "72" },
  "desktop-hd": { film: "desktop", remap: true, filter: "scale=2560:1440:flags=lanczos", quality: "82" },
  mobile: { film: "mobile", remap: true, filter: "scale=720:1280:flags=lanczos", quality: "70" },
  "mobile-hd": { film: "mobile", remap: true, filter: "scale=1080:1920:flags=lanczos", quality: "78" },
};

const only = process.argv[2];

for (const [name, { film, filter, quality, remap }] of Object.entries(sets)) {
  if (only && film !== only) continue;
  const dir = `public/sequence/${name}`;
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  execFileSync(
    ffmpeg,
    ["-v", "error", "-i", films[film],
     ...(remap ? ["-filter_complex", `${REMAP},${filter}`, "-fps_mode", "passthrough"] : ["-vf", filter]),
     "-frames:v", String(FRAMES), "-an",
     "-c:v", "libwebp", "-quality", quality, "-compression_level", "6",
     `${dir}/%03d.webp`],
    { stdio: "inherit" },
  );

  console.log(`${name}: ${readdirSync(dir).length} frames → ${dir}`);
}
