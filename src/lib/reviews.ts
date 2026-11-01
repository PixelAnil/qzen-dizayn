// Customer reviews shown on the home page.
// For now these are clearly marked layout samples; replace them with real Google reviews
// (or the Places API feed) before they are presented as customer words.
export type Review = {
  author: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Layout sample, not a real customer: the card says so */
  sample?: boolean;
};

export const reviews: Review[] = [
  {
    author: "Örnek müşteri",
    service: "Asma tavan",
    rating: 5,
    text: "Burada müşterinin Google'a yazdığı yorum yer alacak. Kısa ya da uzun her yorum bu kartta düzgün görünür.",
    sample: true,
  },
  {
    author: "Örnek müşteri",
    service: "Ev tadilatı",
    rating: 5,
    text: "Gerçek yorumlar Google işletme profilinden alınacak ve isimleriyle birlikte burada kayarak gösterilecek.",
    sample: true,
  },
  {
    author: "Örnek müşteri",
    service: "İç dekorasyon",
    rating: 5,
    text: "Bu bir yer tutucu metindir. Yorumun uzunluğuna göre kart kendini ayarlar; üç dört satırlık bir yorum burada rahat okunur.",
    sample: true,
  },
  {
    author: "Örnek müşteri",
    service: "Alçıpan bölme duvar",
    rating: 5,
    text: "Örnek yorum. Yayına almadan önce gerçek müşteri yorumlarıyla değiştirilecek.",
    sample: true,
  },
  {
    author: "Örnek müşteri",
    service: "Ticari tadilat",
    rating: 5,
    text: "Yorumların üzerine gelince akış durur, telefonda parmakla tutunca da durur; böylece her yorum rahatça okunabilir.",
    sample: true,
  },
];
