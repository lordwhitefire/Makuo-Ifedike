import type { MetadataRoute } from "next";
import { identity } from "@/content/identity";

const siteUrl = identity.url.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      other: {
        "llms.txt": `${siteUrl}/llms.txt`,
      },
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
