import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mohannv.dev";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/projects",
          "/projects/*",
          "/lab",
          "/studio",
          "/journal",
          "/journal/*",
          "/resume",
          "/contact",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/api/admin",
          "/api/admin/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
