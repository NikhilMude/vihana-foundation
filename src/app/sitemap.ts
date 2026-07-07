import type { MetadataRoute } from "next";

import { getSiteContent } from "@/lib/siteData";

const siteUrl = "https://vihanafoundation.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const publishedPages = content.pages.filter((page) => page.published);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...publishedPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page.slug.includes("policy") || page.slug.includes("terms") || page.slug.includes("disclaimer") ? 0.4 : 0.7,
    })),
  ];
}
