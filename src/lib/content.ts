import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { parse } from "yaml";

// Everything the admin panel (public/admin) edits lives in src/content and is read here at build time.
// The panel commits to the repository and the deploy rebuilds the site, so a bad entry must never
// break the build: missing pictures and fields are skipped with a warning instead of throwing.

const CONTENT = path.join(process.cwd(), "src/content");
const PUBLIC = path.join(process.cwd(), "public");

export type Picture = { src: string; width: number; height: number };

/** Size of a picture in /public, or null when the file is missing or unreadable. */
function picture(src: unknown): Picture | null {
  if (typeof src !== "string" || !src.startsWith("/")) return null;
  const file = path.join(PUBLIC, decodeURI(src));
  try {
    const { width, height } = imageSize(readFileSync(file));
    if (width && height) return { src, width, height };
  } catch {
    // fall through to the warning
  }
  console.warn(`[content] picture not found or unreadable: ${src}`);
  return null;
}

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// ---------------------------------------------------------------------------------------------
// Services: src/content/hizmetler/<slug>.md, YAML front matter + Markdown body

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  /** Services without their own photograph show the brand mark */
  image?: Picture & { alt: string };
  /** The service's build-up film (public/services/video, made by scripts/service-videos.mjs); src is scrambled, play it through filmUrl() */
  video?: { src: string; start: string; end: Picture };
  seo?: { title: string; description: string };
};

const SERVICES = path.join(CONTENT, "hizmetler");

function splitFrontMatter(source: string): { data: Record<string, unknown>; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source };
  try {
    return { data: (parse(match[1]) as Record<string, unknown>) ?? {}, body: match[2] };
  } catch (error) {
    console.warn("[content] unreadable front matter", error);
    return { data: {}, body: match[2] };
  }
}

/** Page address from the file name, with Turkish letters spelled the Turkish way: "Fayans Döşeme" → fayans-doseme. */
export const slugify = (name: string) =>
  name
    .normalize("NFC")
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşü]/g, (c) => ({ ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" })[c]!)
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// The panel names files after the title; the page address is always derived from the file name here
const serviceFiles = new Map(
  readdirSync(SERVICES)
    .filter((f) => f.endsWith(".md"))
    .map((file) => [slugify(file.slice(0, -3)), file] as const),
);

const readService = (slug: string) => splitFrontMatter(readFileSync(path.join(SERVICES, serviceFiles.get(slug)!), "utf8"));

/** All services in the order set in the panel; the first HOME_SERVICES are listed on the home page. */
export const services: Service[] = [...serviceFiles]
  .map(([slug, file]) => {
    const { data } = readService(slug);
    const title = text(data.title);
    if (!title) {
      console.warn(`[content] service without a title skipped: ${file}`);
      return null;
    }
    const pic = picture(data.image);
    const end = existsSync(path.join(PUBLIC, `services/video/${slug}.qzv`)) ? picture(`/services/video/${slug}-end.webp`) : null;
    const seoTitle = text(data.seo_title);
    const seoDescription = text(data.seo_description);
    return {
      order: typeof data.order === "number" ? data.order : Number.MAX_SAFE_INTEGER,
      service: {
        slug,
        title,
        tagline: text(data.tagline),
        ...(pic && { image: { ...pic, alt: text(data.image_alt) || title } }),
        ...(end && { video: { src: `/services/video/${slug}.qzv`, start: `/services/video/${slug}-start.webp`, end } }),
        ...(seoTitle && seoDescription && { seo: { title: seoTitle, description: seoDescription } }),
      } satisfies Service,
    };
  })
  .filter((s) => s !== null)
  .sort((a, b) => a.order - b.order || a.service.title.localeCompare(b.service.title, "tr"))
  .map((s) => s.service);

export const HOME_SERVICES = 5;

// A small Markdown subset for the service pages, matching the panel's editor buttons:
// "## " heading, "### " sub-heading, "- " / "* " / "1. " list items ("- **Label:** text" for steps),
// **bold** inside text, everything else a paragraph. Lines of a paragraph are joined.
export type Inline = { text: string; bold?: boolean }[];
export type Block =
  | { type: "h2" | "h3"; text: string }
  | { type: "p"; text: Inline }
  | { type: "ul"; items: { label?: string; text: Inline }[] };

// Backslash escapes the rich text editor writes, e.g. "1\." or "\*"
const unescape = (s: string) => s.replace(/\\([\\`*_{}[\]()#+\-.!|>~])/g, "$1");

/** "**a** b" → [{a, bold}, {b}]; other emphasis markers are dropped. */
function inline(raw: string): Inline {
  const parts: Inline = [];
  const re = /\*\*(.+?)\*\*|__(.+?)__/g;
  let last = 0;
  for (let m = re.exec(raw); m; m = re.exec(raw)) {
    if (m.index > last) parts.push({ text: raw.slice(last, m.index) });
    parts.push({ text: m[1] ?? m[2], bold: true });
    last = m.index + m[0].length;
  }
  if (last < raw.length) parts.push({ text: raw.slice(last) });
  return parts
    .map((p) => ({ ...p, text: unescape(p.text.replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1$2").replace(/<[^>]+>/g, "")) }))
    .filter((p) => p.text);
}

const plain = (raw: string) => inline(raw).map((p) => p.text).join("");

export function readServiceContent(slug: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let inList = false;

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "p", text: inline(paragraph.join(" ")) });
    paragraph = [];
  };

  for (const rawLine of readService(slug).body.split(/\r?\n/)) {
    const line = rawLine.replace(/\\$/, "").trim();
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    const item = line.match(/^(?:[-*+]|\d+[.)])\s+(.*)$/);

    if (!line) {
      flush();
      continue;
    }
    if (heading) {
      flush();
      inList = false;
      blocks.push({ type: heading[1].length <= 2 ? "h2" : "h3", text: plain(heading[2]) });
    } else if (item) {
      flush();
      const step = item[1].match(/^\*\*(.+?):\*\*\s*(.*)$/) ?? item[1].match(/^\*\*(.+?)\*\*:\s*(.*)$/);
      const entry = step ? { label: plain(step[1]), text: inline(step[2]) } : { text: inline(item[1]) };
      const last = blocks.at(-1);
      if (last?.type === "ul") last.items.push(entry);
      else blocks.push({ type: "ul", items: [entry] });
      inList = true;
    } else if (inList && /^\s{2,}/.test(rawLine)) {
      // continuation line of a list item
      const last = blocks.at(-1);
      if (last?.type === "ul") last.items.at(-1)!.text.push({ text: ` ${plain(line)}` });
    } else {
      inList = false;
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

// ---------------------------------------------------------------------------------------------
// Projects: src/content/projeler/<slug>.json, newest first

export type Photo = { image: string; width: number; height: number };
/** One job: its cover picture, plus `more` when the job has several photographs. */
export type Project = Photo & { slug: string; title?: string; more?: Photo[]; /** slugs of the services this job shows */ services?: string[] };

const PROJECTS = path.join(CONTENT, "projeler");

export const projects: Project[] = (existsSync(PROJECTS) ? readdirSync(PROJECTS) : [])
  .filter((f) => f.endsWith(".json"))
  .flatMap((file) => {
    try {
      const data = JSON.parse(readFileSync(path.join(PROJECTS, file), "utf8")) as { date?: unknown; photos?: unknown; title?: unknown; services?: unknown };
      const photos: Photo[] = (Array.isArray(data.photos) ? data.photos : [])
        .map(picture)
        .filter((p) => p !== null)
        .map(({ src, width, height }) => ({ image: src, width, height }));
      if (!photos.length) {
        console.warn(`[content] project without photos skipped: ${file}`);
        return [];
      }
      const [cover, ...more] = photos;
      const title = text(data.title);
      const services = (Array.isArray(data.services) ? data.services : []).map((s) => slugify(text(s))).filter(Boolean);
      return [
        {
          date: text(data.date),
          project: { slug: file.slice(0, -5), ...(title && { title }), ...cover, ...(more.length && { more }), ...(services.length && { services }) },
        },
      ];
    } catch (error) {
      console.warn(`[content] unreadable project skipped: ${file}`, error);
      return [];
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.project.slug.localeCompare(b.project.slug))
  .map((p) => p.project);
