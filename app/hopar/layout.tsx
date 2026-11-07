import type { Metadata } from "next";

const BASE_URL = "https://www.malarhorn.is";
const TITLE = "Hópar á Malarhorni | Gisting og hópaferðir á Drangsnesi";
const DESCRIPTION =
  "Skipuleggðu hópferð á Drangsnes. Malarhorn býður gistingu og aðstöðu fyrir minni hópa, árshátíðir, starfsmannaferðir og samverustundir.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/hopar`,
    languages: {
      "is-IS": `${BASE_URL}/hopar`,
      "x-default": `${BASE_URL}/hopar`,
    },
  },
  openGraph: {
    type: "website",
    locale: "is_IS",
    url: `${BASE_URL}/hopar`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/Untitled-design-12.png",
        width: 1600,
        height: 1200,
        alt: "Gistihúsin á Malarhorni við sjóinn á Drangsnesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/Untitled-design-12.png"],
  },
};

export default function GroupsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
