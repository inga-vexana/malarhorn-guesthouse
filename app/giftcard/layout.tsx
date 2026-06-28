import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Give the gift of Iceland — Malarhorn Guesthouse gift cards for stays, breakfast, and sailing tours to Grímsey in the Westfjords. Perfect for any occasion.",
  alternates: {
    canonical: `${BASE_URL}/giftcard`,
  },
  openGraph: {
    title: "Gift Cards — Malarhorn Guesthouse",
    description:
      "Give the gift of Iceland — Malarhorn Guesthouse gift cards for stays, breakfast, and sailing tours to Grímsey in the Westfjords.",
    url: `${BASE_URL}/giftcard`,
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarhorn Guesthouse gift cards — Westfjords Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Cards — Malarhorn Guesthouse",
    description:
      "Give the gift of Iceland — Malarhorn Guesthouse gift cards for stays and sailing tours in the Westfjords.",
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
