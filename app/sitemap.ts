import type { MetadataRoute } from "next";
import { events_data } from "./lib/constants";

const BASE_URL = "https://www.malarhorn.is";

export default function sitemap(): MetadataRoute.Sitemap {
  // Icelandic and English pages live at different slugs (e.g. "/gisting" vs
  // "/accommodation"), so each route lists both paths explicitly.
  const routes = [
    { isPath: "", enPath: "", priority: 1.0, changeFrequency: "weekly" as const },
    {
      isPath: "/gisting",
      enPath: "/accommodation",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      isPath: "/veitingastadur",
      enPath: "/restaurant",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      isPath: "/siglingar",
      enPath: "/sailing",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { isPath: "/um-okkur", enPath: "/about", priority: 0.7, changeFrequency: "yearly" as const },
    {
      isPath: "/gjafakort",
      enPath: "/giftcard",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
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

  const localizedEntries = routes.flatMap(({ isPath, enPath, priority, changeFrequency }) => {
    const alternates = {
      languages: {
        "is-IS": `${BASE_URL}${isPath}`,
        en: `${BASE_URL}/en${enPath}`,
      },
    };

    return [
      {
        url: `${BASE_URL}${isPath}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates,
      },
      {
        url: `${BASE_URL}/en${enPath}`,
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
