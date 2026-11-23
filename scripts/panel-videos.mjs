// Films uploaded in the admin panel: a service's "Video" field points at a raw file in videolar/hizmetler/
// (kept out of public/, so the unprotected original is never served). Before every build this encodes
// each one into the protected service film (scripts/film-encode.mjs), which then replaces whatever
// film or photograph the service showed. Runs on the build server (.github/workflows/deploy.yml);
// a broken upload is skipped with a warning so it can never stop the site from publishing.
// Usage: node scripts/panel-videos.mjs
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { encodeServiceFilm } from "./film-encode.mjs";

const SERVICES = "src/content/hizmetler";

// Same rule as src/lib/content.ts: the page address comes from the file name, Turkish letters spelled the Turkish way
const slugify = (name) =>
  name
    .normalize("NFC")
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşü]/g, (c) => ({ ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" })[c])
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

for (const file of readdirSync(SERVICES).filter((f) => f.endsWith(".md"))) {
  const slug = slugify(file.slice(0, -3));
  let video;
  try {
    const front = readFileSync(path.join(SERVICES, file), "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
    video = front && parse(front[1])?.video;
  } catch {
    console.warn(`[panel-videos] unreadable front matter: ${file}`);
    continue;
  }
  if (typeof video !== "string" || !video.trim()) continue;
  const input = decodeURI(video.trim().replace(/^\//, ""));
  if (!existsSync(input)) {
    console.warn(`[panel-videos] ${slug}: ${input} missing, skipped`);
    continue;
  }
  try {
    encodeServiceFilm(input, slug, { preset: "medium" });
    console.log(`[panel-videos] ${slug}: encoded from ${input}`);
  } catch (error) {
    console.warn(`[panel-videos] ${slug}: could not encode ${input}, skipped`, error.message);
  }
}
