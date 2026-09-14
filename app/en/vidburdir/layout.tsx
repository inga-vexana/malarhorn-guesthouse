import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Events",
  description:
    "See current and upcoming events at Malarhorn Guesthouse in Drangsnes, Westfjords Iceland.",
  alternates: {
    canonical: `${BASE_URL}/en/vidburdir`,
    languages: {
      "is-IS": `${BASE_URL}/vidburdir`,
      en: `${BASE_URL}/en/vidburdir`,
      "x-default": `${BASE_URL}/vidburdir`,
    },
  },
  openGraph: {
    title: "Events — Malarhorn Guesthouse",
    description:
      "See current and upcoming events at Malarhorn Guesthouse in Drangsnes, Westfjords Iceland.",
    url: `${BASE_URL}/en/vidburdir`,
    locale: "en_US",
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarhorn Guesthouse — Drangsnes, Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events — Malarhorn Guesthouse",
    description:
      "See current and upcoming events at Malarhorn Guesthouse in Drangsnes, Westfjords Iceland.",
    images: ["/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg"],
  },
};

export default function EventsEnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
