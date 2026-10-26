import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Hafðu samband",
  description:
    "Hafðu samband við Malarhorn Guesthouse á Drangsnesi. Sendu fyrirspurn eða óskaðu eftir tilboði fyrir hóp.",
  alternates: {
    canonical: `${BASE_URL}/hafa-samband`,
    languages: {
      "is-IS": `${BASE_URL}/hafa-samband`,
      en: `${BASE_URL}/en/contact`,
      "x-default": `${BASE_URL}/hafa-samband`,
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
