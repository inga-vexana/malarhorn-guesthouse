import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Gisting",
  description:
    "Þægileg herbergi og íbúðir á Malarhorn Guesthouse á Drangsnesi, Vestfjörðum. Sjávarútsýni, einkabaðherbergi og fjölskylduherbergi. Bókaðu gistingu í dag.",
  alternates: {
    canonical: `${BASE_URL}/accommodation`,
    languages: {
      is: `${BASE_URL}/accommodation`,
      en: `${BASE_URL}/en/accommodation`,
      "x-default": `${BASE_URL}/accommodation`,
    },
  },
  openGraph: {
    locale: "is_IS",
    alternateLocale: ["en_US"],
    title: "Gisting — Malarhorn Guesthouse",
    description:
      "Þægileg herbergi og íbúðir á Malarhorn Guesthouse á Drangsnesi, Vestfjörðum. Sjávarútsýni, einkabaðherbergi og fjölskylduherbergi.",
    url: `${BASE_URL}/accommodation`,
    images: [
      {
        url: "/IMG_0529-1-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Herbergi á Malarhorn Guesthouse — Drangsnes, Ísland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gisting — Malarhorn Guesthouse",
    description: "Þægileg herbergi og íbúðir á Malarhorn Guesthouse á Drangsnesi, Vestfjörðum.",
    images: ["/IMG_0529-1-scaled.jpg"],
  },
};

export default function AccommodationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
