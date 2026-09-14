import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Viðburðir",
  description:
    "Skoðaðu núverandi og komandi viðburði á Malarhorni Guesthouse á Drangsnesi, Vestfjörðum.",
  alternates: {
    canonical: `${BASE_URL}/vidburdir`,
    languages: {
      "is-IS": `${BASE_URL}/vidburdir`,
      en: `${BASE_URL}/en/vidburdir`,
      "x-default": `${BASE_URL}/vidburdir`,
    },
  },
  openGraph: {
    title: "Viðburðir — Malarhorn Guesthouse",
    description:
      "Skoðaðu núverandi og komandi viðburði á Malarhorni Guesthouse á Drangsnesi, Vestfjörðum.",
    url: `${BASE_URL}/vidburdir`,
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarhorn Guesthouse — Drangsnes, Vestfirðir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viðburðir — Malarhorn Guesthouse",
    description:
      "Skoðaðu núverandi og komandi viðburði á Malarhorni Guesthouse á Drangsnesi, Vestfjörðum.",
    images: ["/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg"],
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
