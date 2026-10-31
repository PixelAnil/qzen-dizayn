import { WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

/** Always-reachable WhatsApp link, bottom-right on every page. */
export function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ile yazın: ${site.whatsapp.display}`}
      className="fixed right-4 z-40 inline-flex h-12 w-12 items-center justify-center gap-2 bg-gold text-body font-medium text-obsidian md:h-14 md:w-auto md:px-4 transition-[background-color,transform] duration-300 hover:bg-gold-light active:scale-95 md:right-8"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden md:inline">WhatsApp</span>
    </a>
  );
}
