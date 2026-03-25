import type { MetadataRoute } from "next";
import { getCmsData } from "@/lib/cms";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const cms = await getCmsData();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${cms.site.siteUrl}/sitemap.xml`,
    host: cms.site.siteUrl,
  };
}
