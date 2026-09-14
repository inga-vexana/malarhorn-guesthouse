import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Sigling til Grímseyjar",
  description:
    "Siglingar til Grímseyjar frá Drangsnesi — upplifðu stærstu lundabyggð Íslands í Strandasýslu á Vestfjörðum. Bókaðu með Malarhorn Guesthouse.",
  alternates: {
    canonical: `${BASE_URL}/sailing`,
    languages: {
      is: `${BASE_URL}/sailing`,
      en: `${BASE_URL}/en/sailing`,
      "x-default": `${BASE_URL}/sailing`,
    },
  },
  openGraph: {
    locale: "is_IS",
    alternateLocale: ["en_US"],
    title: "Sigling til Grímseyjar — Malarhorn Guesthouse",
    description:
      "Siglingar til Grímseyjar frá Drangsnesi — upplifðu stærstu lundabyggð Íslands í Strandasýslu á Vestfjörðum.",
    url: `${BASE_URL}/sailing`,
    images: [
      {
        url: "/Untitled-design-14.png",
        width: 1200,
        height: 630,
        alt: "Sigling til Grímseyjar frá Drangsnesi, Vestfjörðum",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigling til Grímseyjar — Malarhorn Guesthouse",
    description: "Siglingar til Grímseyjar — upplifðu stærstu lundabyggð Íslands frá Drangsnesi.",
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
