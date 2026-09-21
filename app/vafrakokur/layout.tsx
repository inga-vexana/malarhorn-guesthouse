import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  title: "Vafrakökur",
  description:
    "Upplýsingar um hvaða vafrakökur Malarhorn.is notar, af hverju, og hvernig þú getur stillt eða dregið samþykki þitt til baka.",
  alternates: {
    canonical: `${BASE_URL}/vafrakokur`,
    languages: {
      "is-IS": `${BASE_URL}/vafrakokur`,
      en: `${BASE_URL}/en/cookie-policy`,
      "x-default": `${BASE_URL}/vafrakokur`,
    },
  },
  robots: { index: true, follow: true },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
