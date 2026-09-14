import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Malarhorn Guesthouse — Drangsnes, Westfjords, Iceland",
  description:
    "A peaceful seaside guesthouse in Drangsnes, Westfjords Iceland. Ocean views, hot pots, restaurant, and sailing tours to Grímsey island.",
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      is: BASE_URL,
      en: `${BASE_URL}/en`,
      "x-default": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["is_IS"],
    url: `${BASE_URL}/en`,
    siteName: "Malarhorn Guesthouse",
    title: "Malarhorn Guesthouse — Drangsnes, Westfjords, Iceland",
    description:
      "A peaceful seaside guesthouse in Drangsnes, Westfjords Iceland. Ocean views, hot pots, restaurant, and sailing tours to Grímsey island.",
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarhorn Guesthouse — Drangsnes, Westfjords, Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malarhorn Guesthouse — Drangsnes, Westfjords, Iceland",
    description:
      "A peaceful seaside guesthouse in Drangsnes, Westfjords Iceland. Ocean views, hot pots, restaurant, and sailing tours to Grímsey island.",
    images: ["/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg"],
  },
};

export { default } from "../page";
