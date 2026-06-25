import type { MetadataRoute } from "next";

const BASE_URL = "https://www.malarhornguesthouse.is";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/guest/", "/upload-video/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
