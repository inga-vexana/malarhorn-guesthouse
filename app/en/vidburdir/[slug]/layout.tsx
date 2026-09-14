import type { Metadata } from "next";
import { events_data, pick } from "../../../lib/constants";

const BASE_URL = "https://www.malarhorn.is";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events_data.find((e) => e.slug === slug);

  if (!event) {
    return { title: "Event" };
  }

  const title = pick(event.title, "en");
  const description = pick(event.description, "en");

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/en/vidburdir/${slug}`,
      languages: {
        "is-IS": `${BASE_URL}/vidburdir/${slug}`,
        en: `${BASE_URL}/en/vidburdir/${slug}`,
        "x-default": `${BASE_URL}/vidburdir/${slug}`,
      },
    },
    openGraph: {
      title: `${title} — Malarhorn`,
      description,
      url: `${BASE_URL}/en/vidburdir/${slug}`,
      locale: "en_US",
      images: event.image
        ? [{ url: event.image, width: 1200, height: 630, alt: pick(event.imageAlt ?? event.title, "en") }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Malarhorn`,
      description,
      images: event.image ? [event.image] : undefined,
    },
  };
}

export default function EventDetailEnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
