import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import { LangProvider } from "./components/LangContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
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
    "Grimsey sailing",
    "Icelandic guesthouse",
    "hot pots Iceland",
  ],
  authors: [{ name: "Malarhorn Guesthouse" }],
  creator: "Malarhorn Guesthouse",
  alternates: {
    canonical: BASE_URL,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LodgingBusiness",
      "@id": `${BASE_URL}/#lodging`,
      name: "Malarhorn Guesthouse",
      url: BASE_URL,
      logo: `${BASE_URL}/Untitled-200-x-200-px.png`,
      image: `${BASE_URL}/Malarhorn-Guesthouse-Arjan-Wilmsen-72-scaled.jpg`,
      description:
        "A peaceful seaside guesthouse in Drangsnes, Westfjords Iceland, offering ocean view rooms, a restaurant, hot pots, and sailing tours to Grímsey island.",
      telephone: "",
      email: "malarhorn@malarhornguesthouse.is",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Drangsnes",
        addressLocality: "Drangsnes",
        addressRegion: "Westfjords",
        postalCode: "510",
        addressCountry: "IS",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 65.6922,
        longitude: -21.4328,
      },
      starRating: {
        "@type": "Rating",
        ratingValue: "3",
      },
      priceRange: "$$",
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Ocean View", value: true },
        { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
        { "@type": "LocationFeatureSpecification", name: "Hot Tub", value: true },
        { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      ],
      sameAs: [
        "https://www.facebook.com/malarhorn",
        "https://www.instagram.com/malarhornguesthouse",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Malarhorn Guesthouse",
      description: "Official website of Malarhorn Guesthouse in Drangsnes, Iceland.",
      inLanguage: ["en", "is"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} bg-[#f4f0e8]`}>
      <head>
        {/* Structured Data — JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <LangProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
