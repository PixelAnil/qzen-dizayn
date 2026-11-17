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
  desktop: "Qzendizayn-yatay.mp4", // 1920×1080 landscape TV-wall film, 8 s (same build as the portrait one)
  mobile: "Qzendizayn.mp4", // 1080×1920 portrait, 8 s (TV wall film, already clean: no grade)
};

// Both TV-wall films (landscape and portrait) pack their build into a few seconds; sampled evenly, each scroll step jumped a long way
// through it and the scrub looked jerky. So the build gets every source frame (24 fps) and more than half
// of the scroll, and the still hold and the dusk share the rest. Frame numbers here drive STAGES in
// src/components/home/HeroSequence.tsx: frames 0–5 empty room, 6–82 the build (t = 0.4 + (i − 6) / 24 s),
// 83–149 the hold and dusk (t = 3.6 + (i − 83) × 4.33 / 68 s).
const REMAP =
  "[0:v]split=3[a][b][c];" +
  "[a]trim=0:0.4,setpts=PTS-STARTPTS,fps=15[a1];" +
  "[b]trim=0.4:3.6,setpts=PTS-STARTPTS,fps=24[b1];" +
  "[c]trim=3.6,setpts=PTS-STARTPTS,fps=68/4.33[c1];" +
  `[a1][b1][c1]concat=n=3:v=1:a=0,${PAD}`;

const sets = {
  // Both films come out of the video tool at 1080p with clean colour: no grade, no sharpening.
  // Their whole build happens in 0.4–3.6 s, so frames are spread by time (REMAP), not evenly
  desktop: { film: "desktop", remap: true, filter: "scale=1280:720:flags=lanczos", quality: "72" },
  "desktop-hd": { film: "desktop", remap: true, filter: "scale=1920:1080:flags=lanczos", quality: "82" },
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
