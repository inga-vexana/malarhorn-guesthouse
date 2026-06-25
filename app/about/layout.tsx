import type { Metadata } from "next";

const BASE_URL = "https://www.malarhornguesthouse.is";

export const metadata: Metadata = {
  title: "About Malarhorn",
  description:
    "Learn about Malarhorn Guesthouse — a family-run seaside retreat in Drangsnes, Westfjords Iceland, founded in 2008 by Valgerður Magnúsdóttir and Ásbjörn Magnússon.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About Malarhorn — Malarhorn Guesthouse",
    description:
      "A family-run seaside retreat in Drangsnes, Westfjords Iceland, founded in 2008. Ocean views, fresh coastal air, and warm Icelandic hospitality.",
    url: `${BASE_URL}/about`,
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarhorn Guesthouse — Drangsnes, Westfjords Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Malarhorn — Malarhorn Guesthouse",
    description:
      "A family-run seaside retreat in Drangsnes, Westfjords Iceland, founded in 2008.",
    images: ["/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
