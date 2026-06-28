import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Restaurant",
  description:
    "Malarkaffi restaurant at Malarhorn Guesthouse — fresh Icelandic cuisine with ocean views in Drangsnes, Westfjords. Open daily during summer for lunch and dinner.",
  alternates: {
    canonical: `${BASE_URL}/restaurant`,
  },
  openGraph: {
    title: "Restaurant — Malarhorn Guesthouse",
    description:
      "Malarkaffi restaurant — fresh Icelandic cuisine with ocean views in Drangsnes, Westfjords. Open daily during summer for lunch and dinner.",
    url: `${BASE_URL}/restaurant`,
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-68-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarkaffi restaurant at Malarhorn Guesthouse, Drangsnes Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant — Malarhorn Guesthouse",
    description:
      "Malarkaffi — fresh Icelandic cuisine with ocean views in Drangsnes, Westfjords. Open daily during summer.",
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
