import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { Button, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { site, whatsappHref } from "@/lib/site";
import { pageSeo, seoMetadata } from "@/lib/seo";

export const metadata: Metadata = seoMetadata(pageSeo.services, "/hizmetler");

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Hizmetlerimiz"
        intro="Tasarımdan uygulamaya, keşiften anahtar teslime kadar her aşamayı tek ekiple yürütüyoruz. Ayrıntılar için bir hizmet seçin."
        action={
          <div className="flex flex-wrap gap-3">
            <Button href={site.phone.href}>Ücretsiz keşif için arayın</Button>
            <a
              href={whatsappHref("Merhaba, ücretsiz keşif ve fiyat teklifi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary")}
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp&apos;tan yazın
            </a>
          </div>
        }
      />
      <div className="px-4 pb-32 md:px-8 md:pb-48">
        <ServicesIndex />
      </div>
    </>
  );
}
