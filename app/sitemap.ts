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

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
