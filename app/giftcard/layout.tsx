import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Gjafabréf",
  description:
    "Gefðu Ísland að gjöf — gjafabréf frá Malarhorn Guesthouse fyrir gistingu, morgunmat og siglingar til Grímseyjar á Vestfjörðum. Tilvalið fyrir öll tilefni.",
  alternates: {
    canonical: `${BASE_URL}/giftcard`,
    languages: {
      is: `${BASE_URL}/giftcard`,
      en: `${BASE_URL}/en/giftcard`,
      "x-default": `${BASE_URL}/giftcard`,
    },
  },
  openGraph: {
    locale: "is_IS",
    alternateLocale: ["en_US"],
    title: "Gjafabréf — Malarhorn Guesthouse",
    description:
      "Gefðu Ísland að gjöf — gjafabréf frá Malarhorn Guesthouse fyrir gistingu, morgunmat og siglingar til Grímseyjar á Vestfjörðum.",
    url: `${BASE_URL}/giftcard`,
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Gjafabréf frá Malarhorn Guesthouse — Vestfjörðum, Íslandi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gjafabréf — Malarhorn Guesthouse",
    description: "Gefðu Ísland að gjöf — gjafabréf frá Malarhorn Guesthouse fyrir gistingu og siglingar.",
    images: ["/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg"],
  },
};

export default function GiftCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
