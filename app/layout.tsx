import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { LangProvider } from "./components/LangContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TrackingCapture from "./components/TrackingCapture";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const BASE_URL = "https://www.malarhorn.is";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Malarhorn Guesthouse — Drangsnes, Westfjords, Iceland",
    template: "%s | Malarhorn Guesthouse",
  },
  description:
    "A peaceful seaside guesthouse in Drangsnes, Westfjords Iceland. Ocean views, hot pots, restaurant, and sailing tours to Grímsey island.",
  keywords: [
    "Malarhorn Guesthouse",
    "Drangsnes",
    "Westfjords Iceland",
    "Strandir",
    "Iceland accommodation",
    "Grímsey sailing",
    "Icelandic guesthouse",
    "hot pots Iceland",
  ],
  authors: [{ name: "Malarhorn Guesthouse" }],
  creator: "Malarhorn Guesthouse",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "is-IS": BASE_URL,
      en: `${BASE_URL}/en`,
      "x-default": BASE_URL,
    },
  },
  verification: {
    google: "oC1HXMCcfoaJNMuRsaiwT3cFB29Sx4KKf3DNuCpPSvw",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Malarhorn Guesthouse",
    title: "Malarhorn Guesthouse — Drangsnes, Westfjords, Iceland",
    description:
      "A peaceful seaside guesthouse in Drangsnes, Westfjords Iceland. Ocean views, hot pots, restaurant, and sailing tours to Grímsey island.",
    images: [
      {
        url: "/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg",
        width: 1200,
        height: 630,
        alt: "Malarhorn Guesthouse — Drangsnes, Westfjords, Iceland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malarhorn Guesthouse — Drangsnes, Westfjords, Iceland",
    description:
      "A peaceful seaside guesthouse in Drangsnes, Westfjords Iceland. Ocean views, hot pots, restaurant, and sailing tours to Grímsey island.",
    images: ["/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const htmlLang = pathname.startsWith("/en") ? "en" : "is";

  return (
    <html lang={htmlLang} className={`${cormorant.variable} ${jost.variable} bg-[#f4f0e8]`}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5HNKH2TD');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5HNKH2TD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <TrackingCapture />
        <LangProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
