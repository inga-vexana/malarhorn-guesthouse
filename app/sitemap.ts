import type { MetadataRoute } from "next";

const BASE_URL = "https://www.malarhornguesthouse.is";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/accommodation", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/restaurant", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sailing", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/giftcard", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return routes.flatMap(({ path, priority, changeFrequency }) => {
    const isUrl = `${BASE_URL}${path}`;
    const enUrl = `${BASE_URL}/en${path}`;
    const alternates = {
      languages: {
        is: isUrl,
        en: enUrl,
        "x-default": isUrl,
      },
    };

    return [
      {
        url: isUrl,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates,
      },
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates,
      },
    ];
  });
}
