import type { Metadata } from "next";
import { events_data, pick } from "../../lib/constants";

const BASE_URL = "https://www.malarhorn.is";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events_data.find((e) => e.slug === slug);

  if (!event) {
    return { title: "Viðburður" };
  }

  const title = pick(event.title, "is");
  const description = pick(event.description, "is");

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/vidburdir/${slug}`,
      languages: {
        "is-IS": `${BASE_URL}/vidburdir/${slug}`,
        "x-default": `${BASE_URL}/vidburdir/${slug}`,
      },
    },
    openGraph: {
      title: `${title} — Malarhorn`,
      description,
      url: `${BASE_URL}/vidburdir/${slug}`,
      locale: "is_IS",
      images: event.image
        ? [{ url: event.image, width: 1200, height: 630, alt: pick(event.imageAlt ?? event.title, "is") }]
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

export default function EventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
