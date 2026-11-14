// AI-sharpened hero frames. The source films come out of the video tool at 720p and look soft on
// large screens; this upscales every frame 4× with Real-ESRGAN (free, runs locally) and then builds
// the same four sets as extract-frames.mjs from the sharp frames.
//
// Usage: node scripts/hero-upscale.mjs <path to realesrgan-ncnn-vulkan> [desktop|mobile]
//   Real-ESRGAN: https://github.com/xinntao/Real-ESRGAN/releases (realesrgan-ncnn-vulkan, macOS zip);
//   the models folder must sit next to the binary. Takes roughly 15–25 s per frame on an M2.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const [esrgan, only] = process.argv.slice(2);
if (!esrgan) throw new Error("Pass the path to realesrgan-ncnn-vulkan");

// Keep in step with scripts/extract-frames.mjs
const FPS = 15;
const FRAMES = 150;
const PAD = "tpad=stop_mode=clone:stop_duration=0.5";
const GRADE = "curves=master='0/0 0.18/0.12 0.4/0.43 0.65/0.74 1/1',eq=saturation=1.22";
const films = {
  desktop: { file: "Qzendizayn-yatay.mp4", speed: "setpts=PTS", light: "1280:720", hd: "1920:1080" },
  mobile: { file: "Qzendizayn.mp4", speed: "setpts=PTS*1.25", light: "720:1280", hd: "1080:1920" },
};
const quality = { desktop: "72", "desktop-hd": "80", mobile: "70", "mobile-hd": "78" };

const run = (bin, args) => execFileSync(bin, args, { stdio: "inherit" });
const work = path.join(tmpdir(), "qzen-hero-upscale");

for (const [film, { file, speed, light, hd }] of Object.entries(films)) {
  if (only && film !== only) continue;
  const raw = path.join(work, film, "raw");
  const up = path.join(work, film, "up");
  for (const dir of [raw, up]) {
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
  }

  // 1. The film's frames, ungraded and lossless
  run(ffmpeg, ["-v", "error", "-i", file, "-vf", `${speed},${PAD},fps=${FPS}`, "-frames:v", String(FRAMES), `${raw}/%03d.png`]);
  // 2. 4× AI upscale of the whole folder in one run
  run(esrgan, ["-i", raw, "-o", up, "-n", "realesrgan-x4plus", "-m", path.join(path.dirname(esrgan), "models"), "-f", "png"]);

  // 3. Down to the two delivery sizes, graded like extract-frames.mjs (no extra sharpening needed)
  for (const [set, size] of [[film, light], [`${film}-hd`, hd]]) {
    const dir = `public/sequence/${set}`;
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    run(ffmpeg, ["-v", "error", "-framerate", String(FPS), "-i", `${up}/%03d.png`, "-vf", `scale=${size}:flags=lanczos,${GRADE}`,
                 "-c:v", "libwebp", "-quality", quality[set], "-compression_level", "6", `${dir}/%03d.webp`]);
    console.log(`${set}: ${readdirSync(dir).length} frames → ${dir}`);
  }
}
