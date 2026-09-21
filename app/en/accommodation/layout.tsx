import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Accommodation",
  description:
    "Comfortable rooms and apartments at Malarhorn Guesthouse in Drangsnes, Westfjords Iceland. Ocean views, private bathrooms, and family rooms. Book your stay today.",
  alternates: {
    canonical: `${BASE_URL}/en/accommodation`,
    languages: {
      "is-IS": `${BASE_URL}/gisting`,
      en: `${BASE_URL}/en/accommodation`,
      "x-default": `${BASE_URL}/accommodation`,
    },
  },
  openGraph: {
    title: "Accommodation — Malarhorn Guesthouse",
    description:
      "Comfortable rooms and apartments at Malarhorn Guesthouse in Drangsnes, Westfjords Iceland. Ocean views, private bathrooms, and family rooms.",
    url: `${BASE_URL}/en/accommodation`,
    locale: "en_US",
    images: [
      {
        url: "/IMG_0529-1-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarhorn Guesthouse rooms — Drangsnes, Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accommodation — Malarhorn Guesthouse",
    description:
      "Comfortable rooms and apartments at Malarhorn Guesthouse in Drangsnes, Westfjords Iceland.",
    images: ["/IMG_0529-1-scaled.jpg"],
  },
};

export default function AccommodationEnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
