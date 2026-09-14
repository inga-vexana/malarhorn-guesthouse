import type { MetadataRoute } from "next";
import { events_data } from "./lib/constants";

const BASE_URL = "https://www.malarhorn.is";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/accommodation", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/restaurant", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sailing", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/giftcard", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  // The events pages are only available in Icelandic, so they are listed without an English alternate.
  const eventRoutes = [
    { path: "/vidburdir", priority: 0.7, changeFrequency: "weekly" as const },
    ...events_data.map((e) => ({
      path: `/vidburdir/${e.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
  ];

  const localizedEntries = routes.flatMap(({ path, priority, changeFrequency }) => {
    const alternates = {
      languages: {
        "is-IS": `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    };

    return [
      {
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates,
      },
      {
        url: `${BASE_URL}/en${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates,
      },
    ];
  });

  const eventEntries = eventRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "is-IS": `${BASE_URL}${path}`,
      },
    },
  }));

  return [...localizedEntries, ...eventEntries];
}
