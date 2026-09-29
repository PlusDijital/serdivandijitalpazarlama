import type { MetadataRoute } from "next";
import { getCmsData } from "@/lib/cms";

export default function sitemap(): MetadataRoute.Sitemap {
  const cms = getCmsData();
  const siteUrl = cms.site.siteUrl;
  const latestPost = cms.blogPosts
    .map((post) => post.updatedAt)
    .sort()
    .at(-1);
  const contentDate = latestPost ? new Date(latestPost) : new Date();

  return [
    { url: siteUrl, lastModified: contentDate, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/hizmetler`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.9 },
    ...cms.serviceLandingPages.map((service) => ({
      url: `${siteUrl}/hizmetler/${service.slug}`,
      lastModified: contentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${siteUrl}/blog`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.7 },
    ...cms.blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/hakkimizda`, lastModified: contentDate, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/iletisim`, lastModified: contentDate, changeFrequency: "yearly", priority: 0.6 },
  ];
}
