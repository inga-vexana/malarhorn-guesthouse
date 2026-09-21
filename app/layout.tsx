import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { LangProvider } from "./components/LangContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TrackingCapture from "./components/TrackingCapture";
import CookieConsent from "./components/CookieConsent";
import { getConsentInitScript } from "./lib/consent";
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
        {/*
          Google Consent Mode v2 (Basic Consent Mode): initializes dataLayer
          and sets consent defaults to "denied" before anything else runs.
          Google Tag Manager (GTM-5HNKH2TD) is only requested from this
          script if a stored, unexpired consent choice already granted an
          optional category — otherwise it stays unloaded until the visitor
          responds to the cookie banner. This must run before any other
          script, so it uses strategy="beforeInteractive".
        */}
        <Script
          id="consent-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: getConsentInitScript() }}
        />
      </head>
      <body>
        <TrackingCapture />
        <LangProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </LangProvider>
      </body>
    </html>
  );
}
