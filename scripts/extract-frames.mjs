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
  desktop: "Qzendizayn-yatay.mp4", // 1280×720 landscape
  mobile: "Qzendizayn.mp4", // 1080×1920 portrait
};

const sets = {
  desktop: { film: "desktop", filter: `${PAD},fps=${FPS}`, quality: "74" },
  // Lanczos upscale + light sharpening beats the browser's own upscaling on large screens
  "desktop-hd": { film: "desktop", filter: `${PAD},fps=${FPS},scale=1920:1080:flags=lanczos,unsharp=5:5:0.6:5:5:0`, quality: "82" },
  mobile: { film: "mobile", filter: `fps=${FPS},scale=720:1280:flags=lanczos`, quality: "70" },
  "mobile-hd": { film: "mobile", filter: `fps=${FPS},unsharp=5:5:0.5:5:5:0`, quality: "80" },
};

const only = process.argv[2];

for (const [name, { film, filter, quality }] of Object.entries(sets)) {
  if (only && film !== only) continue;
  const dir = `public/sequence/${name}`;
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  execFileSync(
    ffmpeg,
    ["-v", "error", "-i", films[film], "-vf", filter, "-frames:v", String(FRAMES), "-an",
     "-c:v", "libwebp", "-quality", quality, "-compression_level", "6",
     `${dir}/%03d.webp`],
    { stdio: "inherit" },
  );

  console.log(`${name}: ${readdirSync(dir).length} frames → ${dir}`);
}
