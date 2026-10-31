export const site = {
  name: "QZEN DİZAYN",
  description:
    "Erzurum Yakutiye'de iç mimari, asma tavan, alçıpan ve anahtar teslim tadilat. Ev, mağaza ve ofisler için tasarımdan teslime tek ekip.",
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
} as const;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

export const navLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Projelerimiz", href: "/projeler" },
] as const;

// The four service titles are the client's own wording (footer, column 3).
// Item lines under each group are sample scope for the design; confirm with the client.
export const services = [
  {
    title: "Asma tavan - Alçıpan bölme duvar hizmetleri",
    group: "Tavan ve duvar",
    items: [
      { name: "Asma tavan", note: "Gizli ışık bandı, kartonpiyer, akustik panel", where: "Ev, ofis" },
      { name: "Alçıpan bölme duvar", note: "Ses ve ısı yalıtımlı, niş ve kapı boşluklu", where: "Ev, ofis" },
    ],
  },
  {
    title: "Ev tadilat - anahtar teslim yenileme hizmetleri",
    group: "Ev tadilatı",
    items: [
      { name: "Anahtar teslim yenileme", note: "Söküm, tesisat, zemin, boya ve montaj", where: "Daire, villa" },
      { name: "Mutfak ve banyo", note: "Ölçü, seramik, dolap ve armatür", where: "Daire" },
    ],
  },
  {
    title: "İç dekorasyon tasarım hizmeti",
    group: "İç dekorasyon",
    items: [
      { name: "Tasarım ve malzeme seçimi", note: "Plan, ışık, renk ve mobilya listesi", where: "Ev, işyeri" },
      { name: "Uygulama takibi", note: "Tedarik ve montaj tek muhatapla", where: "Ev, işyeri" },
    ],
  },
  {
    title: "Ticari tadilat mağaza ve ofis yenileme hizmetleri",
    group: "Mağaza ve ofis",
    items: [
      { name: "Mağaza yenileme", note: "Vitrin, raf düzeni ve aydınlatma", where: "Mağaza" },
      { name: "Ofis yenileme", note: "Bölme, toplantı odası ve kablo düzeni", where: "Ofis" },
    ],
  },
] as const;
