import type { Metadata } from "next";

const BASE_URL = "https://www.malarhornguesthouse.is";

export const metadata: Metadata = {
  title: "Sailing to Grimsey",
  description:
    "Sailing tours to Grímsey island from Drangsnes — discover Iceland's largest puffin colony in the Westfjords Strandir region. Book with Malarhorn Guesthouse.",
  alternates: {
    canonical: `${BASE_URL}/sailing`,
  },
  openGraph: {
    title: "Sailing to Grimsey — Malarhorn Guesthouse",
    description:
      "Sailing tours to Grímsey island from Drangsnes — discover Iceland's largest puffin colony in the Westfjords Strandir region.",
    url: `${BASE_URL}/sailing`,
    images: [
      {
        url: "/Untitled-design-14.png",
        width: 1200,
        height: 630,
        alt: "Sailing to Grímsey island from Drangsnes, Westfjords Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sailing to Grimsey — Malarhorn Guesthouse",
    description:
      "Sailing tours to Grímsey island — discover Iceland's largest puffin colony from Drangsnes, Westfjords.",
    images: ["/Untitled-design-14.png"],
  },
};

export default function SailingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
