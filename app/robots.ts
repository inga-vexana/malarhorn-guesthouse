import type { MetadataRoute } from "next";

const BASE_URL = "https://www.malarhorn.is";
const DISALLOW = ["/api/", "/guest/", "/en/guest/", "/upload-video/", "/en/upload-video/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
