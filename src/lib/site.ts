import contact from "@/content/ayarlar/iletisim.json";

// Contact details are edited in the admin panel (src/content/ayarlar/iletisim.json); the links are derived here.

/** "0538 982 76 70" → "905389827670" */
const intl = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("90") ? digits : `90${digits.replace(/^0/, "")}`;
};

const instagramHandle = `@${contact.instagram.replace(/\/+$/, "").split("/").pop()}`;

export const site = {
  name: "QZEN DİZAYN",
  description:
    "İstanbul Sultanbeyli'de asma tavan, alçıpan, anahtar teslim ev tadilatı, iç dekorasyon ve ticari tadilat. 15 yılı aşkın tecrübe.",
  address: `${contact.address_line1}, ${contact.address_line2}`,
  addressLines: [contact.address_line1, contact.address_line2],
  email: contact.email,
  phone: {
    display: contact.phone,
    href: `tel:+${intl(contact.phone)}`,
  },
  whatsapp: {
    display: contact.whatsapp,
    href: `https://wa.me/${intl(contact.whatsapp)}`,
  },
  instagram: {
    handle: instagramHandle,
    href: contact.instagram,
  },
  google: {
    // The Business Profile, by its Google ids (feature id 0xad50bb9b9f1761cb:0x6443ba4c61b57d60, CID
    // 7224823064451972448). The write link is the profile's own "ask for reviews" link: it opens the review box.
    reviewsHref: "https://www.google.com/maps?cid=7224823064451972448",
    writeReviewHref: "https://g.page/r/CWB9tWFMukNkEBI/review",
  },
  builtBy: {
    label: "Flowrix Studio",
    href: "https://www.instagram.com/flowrixstudio/",
  },
} as const;

/** WhatsApp link with a message already typed in for the visitor. */
export const whatsappHref = (message: string) => `${site.whatsapp.href}?text=${encodeURIComponent(message)}`;

// Map query in the form Google resolves best
const mapsQuery = `${site.addressLines[0].replace(/[,:]/g, "")}, ${site.addressLines[1].replace(" / ", ", ")}, Türkiye`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&output=embed`;

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
