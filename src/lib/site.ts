export const site = {
  name: "QZEN DİZAYN",
  description:
    "Erzurum merkezli mimari tasarım, iç dekorasyon ve anahtar teslim tadilat stüdyosu. Ham mekânları yaşayan, zamansız iç mekânlara dönüştürüyoruz.",
  address: "Cumhuriyet Mahallesi, Lale Sokak No: 14 Yakutiye / Erzurum",
  email: "hello@flowrixai.com",
  phone: {
    display: "0505 326 52 20",
    href: "tel:+905053265220",
  },
  instagram: {
    handle: "@qzen_dizayn",
    href: "https://www.instagram.com/qzen_dizayn/",
  },
} as const;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

export const navLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Projelerimiz", href: "/projeler" },
] as const;

export const services = [
  {
    title: "Asma tavan - Alçıpan bölme duvar hizmetleri",
    summary:
      "Gizli aydınlatma bantlı asma tavanlar, akustik ve yalıtımlı alçıpan bölme duvarlarla mekânın oranlarını yeniden kuruyoruz.",
  },
  {
    title: "Ev tadilat - anahtar teslim yenileme hizmetleri",
    summary:
      "Kaba inşaattan son dokunuşa kadar tüm süreci tek elden yönetiyor, evinizi yaşamaya hazır hâlde teslim ediyoruz.",
  },
  {
    title: "İç dekorasyon tasarım hizmeti",
    summary:
      "Malzeme, ışık ve mobilya seçimini tek bir tasarım dilinde buluşturan, size özel iç mekân kurguları tasarlıyoruz.",
  },
  {
    title: "Ticari tadilat mağaza ve ofis yenileme hizmetleri",
    summary:
      "Markanızın kimliğini yansıtan mağaza ve ofis alanlarını, iş akışını aksatmadan planlayıp yeniliyoruz.",
  },
] as const;
