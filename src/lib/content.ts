import { readFileSync } from "node:fs";
import path from "node:path";

// A deliberately small Markdown subset for the service pages:
// "## " section heading, "### " sub-heading, "- " list item ("- **Label:** text" for steps), else paragraph.
export type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: { label?: string; text: string }[] };

export function readServiceContent(slug: string): Block[] {
  const file = path.join(process.cwd(), "src/content/hizmetler", `${slug}.md`);
  const blocks: Block[] = [];

  for (const raw of readFileSync(file, "utf8").split(/\n{2,}/)) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4) });
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) });
    else if (line.startsWith("- ")) {
      const match = line.slice(2).match(/^\*\*(.+?):\*\*\s*(.*)$/);
      const item = match ? { label: match[1], text: match[2] } : { text: line.slice(2) };
      const last = blocks.at(-1);
      if (last?.type === "ul") last.items.push(item);
      else blocks.push({ type: "ul", items: [item] });
    } else blocks.push({ type: "p", text: line });
  }

  return blocks;
}
