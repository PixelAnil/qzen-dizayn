export const site = {
  name: "QZEN DİZAYN",
  description:
    "Erzurum'da asma tavan, alçıpan, anahtar teslim ev tadilatı, iç dekorasyon ve ticari tadilat. 10 yılı aşkın tecrübe.",
  address: "Cumhuriyet Mahallesi, Lale Sokak No: 14 Yakutiye / Erzurum",
  addressLines: ["Cumhuriyet Mah., Lale Sokak No: 14", "Yakutiye / Erzurum"],
  email: "hello@flowrixai.com",
  phone: {
    display: "0505 326 52 20",
    href: "tel:+905053265220",
  },
  instagram: {
    handle: "@qzen_dizayn",
    href: "https://www.instagram.com/qzen_dizayn/",
  },
  builtBy: {
    label: "flowrix.ai",
    href: "https://flowrixai.com/",
  },
} as const;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&z=16&output=embed`;

export const navLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Projelerimiz", href: "/projeler" },
  { label: "İletişim", href: "/#iletisim" },
] as const;

export const policyLinks = [
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
] as const;

// Titles, taglines, images and page texts come from the client (hizmetlerimiz/ folder).
// Each service's full text lives in src/content/hizmetler/<slug>.md.
export const services = [
  {
    slug: "alcipan-bolme-duvar",
    title: "Alçıpan & Bölme Duvar Hizmetleri",
    tagline: "Estetik, Dayanıklı ve Uygun Fiyatlı Çözümler",
    image: { src: "/services/alcipan-bolme-duvar.webp", width: 667, height: 1000, alt: "Alçıpan bölme duvarda derz dolgusu yapan iki usta" },
  },
  {
    slug: "asma-tavan",
    title: "Asma Tavan",
    tagline: "Estetik, Dayanıklı ve Uygun Fiyatlı Çözümler",
    image: { src: "/services/asma-tavan.webp", width: 370, height: 555, alt: "Gizli ışıklı kademeli asma tavan ve spotlarla aydınlatılmış antre" },
  },
  {
    slug: "ev-tadilati",
    title: "Ev Tadilatı & Anahtar Teslim Yenileme Hizmetleri",
    tagline: "Profesyonel ve Güvenilir Çözümler",
    image: { src: "/services/ev-tadilati.webp", width: 667, height: 1000, alt: "Tadilat sırasında malzeme taşıyan usta" },
  },
  {
    slug: "ic-dekorasyon",
    title: "İç Dekorasyon Tasarım Hizmeti",
    tagline: "Mekanınıza Değer Katan Estetik Dokunuşlar",
    image: { src: "/services/ic-dekorasyon.webp", width: 370, height: 460, alt: "Ahşap çıtalı duvar, halka avize ve yuvarlak yemek masası" },
  },
  {
    slug: "ticari-tadilat",
    title: "Ticari Tadilat ve Ofis Yenileme Hizmetleri",
    tagline: "İşinize Değer Katan Profesyonel Dokunuşlar",
    image: { src: "/services/ticari-tadilat.webp", width: 750, height: 1000, alt: "Ray spotlarla aydınlatılmış, beyaz raflı mağaza iç mekânı" },
  },
] as const;

export type Service = (typeof services)[number];
