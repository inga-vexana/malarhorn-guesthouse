import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Malarhorn Guesthouse in Drangsnes, Westfjords Iceland. Send an inquiry or request a group quote.",
  alternates: {
    canonical: `${BASE_URL}/en/contact`,
    languages: {
      "is-IS": `${BASE_URL}/hafa-samband`,
      en: `${BASE_URL}/en/contact`,
      "x-default": `${BASE_URL}/hafa-samband`,
    },
  },
};

export default function ContactEnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
