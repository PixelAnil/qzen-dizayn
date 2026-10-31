import { WhatsAppLogo } from "@/components/ui/Icons";
import { site } from "@/lib/site";

/** Always-reachable WhatsApp link, bottom-right on every page: the logo alone, no box. */
export function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ile yazın: ${site.whatsapp.display}`}
      className="fixed right-3 z-40 inline-flex h-14 w-14 items-center justify-center text-gold transition-[color,transform] duration-300 hover:scale-110 hover:text-gold-light active:scale-95 md:right-6 md:h-16 md:w-16"
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <WhatsAppLogo className="h-12 w-12 md:h-14 md:w-14" />
    </a>
  );
}
