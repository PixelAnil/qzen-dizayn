// Pictures of Erzurum from Wikimedia Commons. They show the city around the studio,
// never the studio's own work. Source files and licences: assets/credits.json.
export const credits = {
  yakutiye: {
    src: "/erzurum/yakutiye-portal.webp",
    width: 1920,
    height: 1275,
    alt: "Yakutiye Medresesi'nin taş kapısında aslan ve hayat ağacı kabartmaları",
    caption: "Yakutiye Medresesi kapısı, 1310",
    credit: "Dosseman, CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Yakutiye_Medresesi_3038.jpg",
  },
  homann: {
    src: "/erzurum/homann-erzurum.webp",
    width: 1400,
    height: 1074,
    alt: "18. yüzyıl gravüründe surlarla çevrili Erzurum ve arkasındaki dağlar",
    caption: "Erzurum, 18. yüzyıl gravürü",
    credit: "Homannsche Erben, kamu malı",
    page: "https://commons.wikimedia.org/wiki/File:Erzurum_-_Verschiedene_Prospecte_der_vornemsten_St%C3%A4dten_in_Persien_(cropped).jpg",
  },
  oltu: {
    src: "/erzurum/oltu-tasi.webp",
    width: 1920,
    height: 1253,
    alt: "Taşhan'da sergilenen Oltu taşı yüzükler",
    caption: "Oltu taşı, Taşhan",
    credit: "Zeynel Cebeci, CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Jewelry_in_Ta%C5%9Fhan_02.jpg",
  },
  cifteMinareli: {
    src: "/erzurum/cifte-minareli.webp",
    width: 1920,
    height: 1458,
    alt: "Erzurum Çifte Minareli Medrese'nin ön cephesi",
    caption: "Çifte Minareli Medrese",
    credit: "Dosseman, CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:%C3%87ifte_Minareli_Medrese_(Erzurum)_Exterior_front_side_in_2006_3278_straightened.jpg",
  },
} as const;

export type Credit = (typeof credits)[keyof typeof credits];
