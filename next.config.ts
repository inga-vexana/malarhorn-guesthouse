import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The Icelandic pages moved from English-language slugs to Icelandic
    // ones. Redirect the old URLs so existing links and search rankings
    // carry over.
    const renamed: [string, string][] = [
      ["/accommodation", "/gisting"],
      ["/restaurant", "/veitingastadur"],
      ["/sailing", "/siglingar"],
      ["/about", "/um-okkur"],
      ["/guest", "/gestir"],
      ["/booking", "/bokun"],
      ["/giftcard", "/gjafakort"],
    ];

    return renamed.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
