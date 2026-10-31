import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Alçıpan ve bölme duvar, asma tavan, anahtar teslim ev tadilatı, iç dekorasyon ve ticari tadilat. İstanbul.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Hizmetlerimiz"
        intro="Tasarımdan uygulamaya, keşiften anahtar teslime kadar her aşamayı tek ekiple yürütüyoruz. Ayrıntılar için bir hizmet seçin."
        action={<Button href={site.phone.href}>Ücretsiz keşif için arayın</Button>}
      />
      <div className="px-4 pb-32 md:px-8 md:pb-48">
        <ServicesIndex />
      </div>
    </>
  );
}
