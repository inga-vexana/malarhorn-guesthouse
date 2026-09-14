import type { MetadataRoute } from "next";

const BASE_URL = "https://www.malarhorn.is";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/guest/", "/en/guest/", "/upload-video/", "/en/upload-video/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
