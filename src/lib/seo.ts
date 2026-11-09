import type { Metadata } from "next";
import { asset } from "@/lib/asset";

// Search titles (≤ 60 characters) and descriptions (≤ 155) for every page, written around the
// keyword clusters the client chose: turnkey renovation and interior architecture, ceilings and
// walls, wet areas and joinery, repairs. Each keyword has one home page so pages don't compete.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Absolute URL on the deployed site (domain + base path). Pages get the trailing slash the export uses. */
export const absoluteUrl = (path: string) =>
  `${SITE_URL}${asset(/\.\w+$/.test(path) || path.endsWith("/") ? path : `${path}/`)}`;

type PageSeo = { title: string; description: string };

export const pageSeo = {
  home: {
    title: "Anahtar Teslim Tadilat ve İç Mimarlık İstanbul | QZEN DİZAYN",
    description:
      "İstanbul'da anahtar teslim tadilat, iç mimari tasarım, asma ve gergi tavan, banyo-mutfak yenileme ve PVC. 15 yıllık usta işçilik, ücretsiz keşif.",
  },
  services: {
    title: "Tadilat ve Dekorasyon Hizmetleri İstanbul | QZEN DİZAYN",
    description:
      "Komple tadilat, alçıpan tavan sistemleri, gergi tavan, lambiri, TV ünitesi, banyo tadilatı ve PVC kapı pencere. İstanbul genelinde ücretsiz keşif.",
  },
  projects: {
    title: "Tamamlanan Tadilat ve Dekorasyon Projeleri | QZEN DİZAYN",
    description:
      "QZEN DİZAYN'ın İstanbul'da tamamladığı asma tavan, duvar ve iç dekorasyon projeleri. Kaliteli işçiliğin sonuçlarını yakından görün.",
  },
} satisfies Record<string, PageSeo>;

export const serviceSeo: Record<string, PageSeo> = {
  "alcipan-bolme-duvar": {
    title: "Alçıpan Bölme Duvar ve Saten Alçı İstanbul | QZEN DİZAYN",
    description:
      "İstanbul'da alçıpan bölme duvar, pürüzsüz saten alçı ve alçı-boya işleri. Ses yalıtımlı, temiz ve usta işçilik. Ücretsiz keşif için hemen arayın.",
  },
  "asma-tavan": {
    title: "Asma Tavan ve Gizli Işıklı LED Tavan İstanbul | QZEN DİZAYN",
    description:
      "Modern asma tavan, alçıpan tavan sistemleri ve gizli ışıklı LED tavan uygulamaları. İstanbul genelinde kaliteli işçilik ve ücretsiz keşif.",
  },
  "ev-tadilati": {
    title: "Anahtar Teslim Ev Tadilatı İstanbul | QZEN DİZAYN",
    description:
      "İstanbul'da anahtar teslim ev tadilatı ve komple tadilat: projeden teslime tek ekip, şeffaf fiyat, zamanında teslim. Ücretsiz keşif talep edin.",
  },
  "ic-dekorasyon": {
    title: "İç Mimari Tasarım ve Lüks İç Dekorasyon | QZEN DİZAYN",
    description:
      "Lüks iç dekorasyon ve iç mimari tasarım: çizimden uygulamaya evinize ve villanıza özel profesyonel dekor. İstanbul'da ücretsiz keşif.",
  },
  "ticari-tadilat": {
    title: "Ticari Tadilat ve Ofis Yenileme İstanbul | QZEN DİZAYN",
    description:
      "Ofis, mağaza ve kafe tadilatı: işinizi aksatmadan planlı uygulama, kurumsal tasarım ve zamanında teslim. İstanbul'da ücretsiz keşif ve teklif.",
  },
  "banyo-mutfak": {
    title: "Banyo ve Mutfak Tadilatı İstanbul | QZEN DİZAYN",
    description:
      "Banyo, tuvalet ve mutfak tadilatı: ıslak hacim yalıtımı, seramik ve fayans döşeme, tesisat yenileme. İstanbul'da anahtar teslim, ücretsiz keşif.",
  },
  dekorasyon: {
    title: "Profesyonel Dekorasyon ve Dekor Uygulamaları | QZEN DİZAYN",
    description:
      "Evinize ve iş yerinize profesyonel dekor: duvar, mobilya ve aydınlatma uygulamaları usta işçilikle. İstanbul'da ücretsiz keşif ve fiyat teklifi.",
  },
  pvc: {
    title: "PVC Kapı Pencere Sistemleri İstanbul | QZEN DİZAYN",
    description:
      "Isı yalıtımlı PVC kapı ve pencere sistemleri: sürgülü, renkli ve ahşap desenli modeller, temiz montaj. İstanbul'da ücretsiz keşif ve ölçü.",
  },
  lambiri: {
    title: "Ahşap Lambiri Kaplama Modelleri İstanbul | QZEN DİZAYN",
    description:
      "Doğal ahşap, MDF, PVC ve WPC lambiri kaplama ile duvar ve tavanlara sıcak bir doku. İstanbul'da usta işçilik, ücretsiz keşif ve fiyat teklifi.",
  },
  "tv-unitesi": {
    title: "Lüks TV Ünitesi Tasarımı ve Uygulaması | QZEN DİZAYN",
    description:
      "Alçıpan nişli, şömineli, mermer görünümlü ve ahşap TV ünitesi tasarımı. Salonunuza özel ölçü ve gizli ışık. İstanbul'da ücretsiz keşif.",
  },
  "klipin-tavan": {
    title: "Klipin Tavan Sistemleri İstanbul | QZEN DİZAYN",
    description:
      "Hijyenik ve neme dayanıklı klipin tavan: mutfak, banyo, hastane ve mağazalar için düz, delikli ve renkli modeller. İstanbul'da ücretsiz keşif.",
  },
  "60x60-tavan": {
    title: "60x60 Asma Tavan Sistemleri İstanbul | QZEN DİZAYN",
    description:
      "Taşyünü, karolam ve metal 60x60 asma tavan: ofis ve ticari alanlar için akustik, ekonomik ve bakımı kolay çözüm. İstanbul'da ücretsiz keşif.",
  },
  "tamir-tadilat": {
    title: "Ev Tamirat Tadilat ve Dekoratif Boya İstanbul | QZEN DİZAYN",
    description:
      "Ev tamirat tadilat, dekoratif boya, kırma dökme ve tesisat yenileme: daire ve villa yenilemede usta işçilik. İstanbul'da ücretsiz keşif.",
  },
  "cita-dekor": {
    title: "Duvar Çıtalama ve Çıta Dekor Modelleri | QZEN DİZAYN",
    description:
      "Klasik, neo-klasik ve modern çıta dekor: TV arkası, yatak başı ve koridor çıtalaması. Duvarlarınıza lüks bir dokunuş, İstanbul'da ücretsiz keşif.",
  },
  "gergi-tavan": {
    title: "Gergi Tavan Modelleri ve Fiyatları İstanbul | QZEN DİZAYN",
    description:
      "Işıklı, baskılı, lake ve 3D gergi tavan: eşit aydınlatma, neme dayanıklı ve bakım istemez. İstanbul'da gergi tavan uygulaması ve ücretsiz keşif.",
  },
};

/** Title, description, canonical URL and social preview for one page. */
export function seoMetadata({ title, description }: PageSeo, path: string): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}
