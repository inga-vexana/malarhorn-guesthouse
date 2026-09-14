import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Sailing to Grímsey",
  description:
    "Sailing tours to Grímsey island from Drangsnes — discover Iceland's largest puffin colony in the Westfjords Strandir region. Book with Malarhorn Guesthouse.",
  alternates: {
    canonical: `${BASE_URL}/en/sailing`,
    languages: {
      is: `${BASE_URL}/sailing`,
      en: `${BASE_URL}/en/sailing`,
      "x-default": `${BASE_URL}/sailing`,
    },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: ["is_IS"],
    title: "Sailing to Grímsey — Malarhorn Guesthouse",
    description:
      "Sailing tours to Grímsey island from Drangsnes — discover Iceland's largest puffin colony in the Westfjords Strandir region.",
    url: `${BASE_URL}/en/sailing`,
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
    title: "Sailing to Grímsey — Malarhorn Guesthouse",
    description:
      "Sailing tours to Grímsey island — discover Iceland's largest puffin colony from Drangsnes, Westfjords.",
    images: ["/Untitled-design-14.png"],
  },
};

export default function SailingEnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
