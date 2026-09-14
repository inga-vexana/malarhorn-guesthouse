import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Malarhorn Guesthouse in Drangsnes, Westfjords Iceland — our story, our hospitality, and what makes Malarhorn a special place to stay.",
  alternates: {
    canonical: `${BASE_URL}/en/about`,
    languages: {
      is: `${BASE_URL}/about`,
      en: `${BASE_URL}/en/about`,
      "x-default": `${BASE_URL}/about`,
    },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: ["is_IS"],
    title: "About Malarhorn — Malarhorn Guesthouse",
    description:
      "Learn about Malarhorn Guesthouse in Drangsnes, Westfjords Iceland — our story, our hospitality, and what makes Malarhorn a special place to stay.",
    url: `${BASE_URL}/en/about`,
    images: [
      {
        url: "/IMG_0529-1-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "About Malarhorn Guesthouse — Drangsnes, Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Malarhorn — Malarhorn Guesthouse",
    description:
      "Learn about Malarhorn Guesthouse in Drangsnes, Westfjords Iceland — our story and our hospitality.",
    images: ["/IMG_0529-1-scaled.jpg"],
  },
};

export default function AboutEnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
