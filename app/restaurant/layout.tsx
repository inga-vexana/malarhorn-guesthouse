import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Veitingastaður",
  description:
    "Malarkaffi veitingastaður á Malarhorn Guesthouse — ferskt íslenskt hráefni með sjávarútsýni á Drangsnesi, Vestfjörðum. Opið daglega á sumrin, í hádegi og á kvöldin.",
  alternates: {
    canonical: `${BASE_URL}/restaurant`,
    languages: {
      is: `${BASE_URL}/restaurant`,
      en: `${BASE_URL}/en/restaurant`,
      "x-default": `${BASE_URL}/restaurant`,
    },
  },
  openGraph: {
    locale: "is_IS",
    alternateLocale: ["en_US"],
    title: "Veitingastaður — Malarhorn Guesthouse",
    description:
      "Malarkaffi veitingastaður — ferskt íslenskt hráefni með sjávarútsýni á Drangsnesi, Vestfjörðum. Opið daglega á sumrin.",
    url: `${BASE_URL}/restaurant`,
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-68-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarkaffi veitingastaður á Malarhorn Guesthouse, Drangsnesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veitingastaður — Malarhorn Guesthouse",
    description: "Malarkaffi — ferskt íslenskt hráefni með sjávarútsýni á Drangsnesi, Vestfjörðum.",
    images: ["/Malarhorn-Guesthouse-Arjan-Wilmsen-68-scaled.jpg"],
  },
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
