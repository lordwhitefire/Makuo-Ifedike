import type { MetadataRoute } from "next";
import { identity } from "@/content/identity";

const siteUrl = identity.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
