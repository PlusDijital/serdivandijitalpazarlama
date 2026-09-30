import type { MetadataRoute } from "next";
import { getCmsData } from "@/lib/cms";

// Yapay zeka arama motorlarının (GEO) siteyi okuyup alıntılayabilmesi için açıkça izin verilir.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  const cms = getCmsData();
  const disallow = ["/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${cms.site.siteUrl}/sitemap.xml`,
    host: cms.site.siteUrl,
  };
}
