import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Information about which cookies Malarhorn.is uses, why, and how you can manage or withdraw your consent.",
  alternates: {
    canonical: `${BASE_URL}/en/cookie-policy`,
    languages: {
      "is-IS": `${BASE_URL}/vafrakokur`,
      en: `${BASE_URL}/en/cookie-policy`,
      "x-default": `${BASE_URL}/vafrakokur`,
    },
  },
  robots: { index: true, follow: true },
};

export default function CookiePolicyEnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
