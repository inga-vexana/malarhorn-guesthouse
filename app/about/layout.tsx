import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Um Malarhorn",
  description:
    "Fræðast um Malarhorn Guesthouse á Drangsnesi, Vestfjörðum — sögu okkar, gestrisni og hvað gerir Malarhorn að einstökum áfangastað.",
  alternates: {
    canonical: `${BASE_URL}/about`,
    languages: {
      is: `${BASE_URL}/about`,
      en: `${BASE_URL}/en/about`,
      "x-default": `${BASE_URL}/about`,
    },
  },
  openGraph: {
    locale: "is_IS",
    alternateLocale: ["en_US"],
    title: "Um Malarhorn — Malarhorn Guesthouse",
    description:
      "Fræðast um Malarhorn Guesthouse á Drangsnesi, Vestfjörðum — sögu okkar, gestrisni og hvað gerir Malarhorn að einstökum áfangastað.",
    url: `${BASE_URL}/about`,
    images: [
      {
        url: "/IMG_0529-1-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Um Malarhorn Guesthouse — Drangsnes, Ísland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Um Malarhorn — Malarhorn Guesthouse",
    description: "Fræðast um Malarhorn Guesthouse á Drangsnesi, Vestfjörðum — sögu okkar og gestrisni.",
    images: ["/IMG_0529-1-scaled.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
