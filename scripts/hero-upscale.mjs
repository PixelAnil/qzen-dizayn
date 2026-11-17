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

// Keep in step with scripts/extract-frames.mjs: same frame count and the same time remap, so the
// stage labels in HeroSequence.tsx line up with either script's output
const FRAMES = 150;
const PAD = "tpad=stop_mode=clone:stop_duration=0.5";
const REMAP =
  "[0:v]split=3[a][b][c];" +
  "[a]trim=0:0.4,setpts=PTS-STARTPTS,fps=15[a1];" +
  "[b]trim=0.4:3.6,setpts=PTS-STARTPTS,fps=24[b1];" +
  "[c]trim=3.6,setpts=PTS-STARTPTS,fps=68/4.33[c1];" +
  `[a1][b1][c1]concat=n=3:v=1:a=0,${PAD}`;
const films = {
  // src: size the frames go into the upscaler at (the video tool's native 720p; 4× from there is plenty).
  // The landscape HD set is 2560 wide so Retina laptops draw it without enlarging it.
  desktop: { file: "Qzendizayn-yatay.mp4", src: "1280:720", light: "1280:720", hd: "2560:1440" },
  mobile: { file: "Qzendizayn.mp4", src: "720:1280", light: "720:1280", hd: "1080:1920" },
};
const quality = { desktop: "72", "desktop-hd": "82", mobile: "72", "mobile-hd": "85" };

const run = (bin, args) => execFileSync(bin, args, { stdio: "inherit" });
const work = path.join(tmpdir(), "qzen-hero-upscale");

for (const [film, { file, src, light, hd }] of Object.entries(films)) {
  if (only && film !== only) continue;
  const raw = path.join(work, film, "raw");
  const up = path.join(work, film, "up");
  for (const dir of [raw, up]) {
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
  }

  // 1. The film's frames, time-remapped and lossless
  run(ffmpeg, ["-v", "error", "-i", file, "-filter_complex", `${REMAP},scale=${src}:flags=lanczos`, "-fps_mode", "passthrough",
               "-frames:v", String(FRAMES), `${raw}/%03d.png`]);
  // 2. 4× AI upscale of the whole folder in one run
  run(esrgan, ["-i", raw, "-o", up, "-n", "realesrgan-x4plus", "-m", path.join(path.dirname(esrgan), "models"), "-f", "png"]);

  // 3. Down to the two delivery sizes (the TV-wall films need no grade and no extra sharpening)
  for (const [set, size] of [[film, light], [`${film}-hd`, hd]]) {
    const dir = `public/sequence/${set}`;
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    run(ffmpeg, ["-v", "error", "-i", `${up}/%03d.png`, "-vf", `scale=${size}:flags=lanczos`,
                 "-c:v", "libwebp", "-quality", quality[set], "-compression_level", "6", `${dir}/%03d.webp`]);
    console.log(`${set}: ${readdirSync(dir).length} frames → ${dir}`);
  }
}
