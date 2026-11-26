import { getCmsData } from "@/lib/cms";

export const dynamic = "force-static";

function esc(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** RSS 2.0: rehber yazıları. Besleme okuyucuları ve içerik keşfeden botlar için. */
export function GET() {
  const cms = getCmsData();
  const { site } = cms;
  const posts = [...cms.blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const latest = posts.map((post) => post.updatedAt).sort().at(-1);

  const items = posts
    .map((post) => {
      const url = `${site.siteUrl}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${esc(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${post.publishedAt}T09:00:00+03:00`).toUTCString()}</pubDate>`,
        `      <category>${esc(post.category)}</category>`,
        `      <description>${esc(post.summary ?? post.metaDescription)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${esc(site.brandName)} Blog</title>`,
    `    <link>${site.siteUrl}/blog</link>`,
    `    <description>${esc(cms.blogIndex.seo.description)}</description>`,
    "    <language>tr-TR</language>",
    ...(latest ? [`    <lastBuildDate>${new Date(`${latest}T09:00:00+03:00`).toUTCString()}</lastBuildDate>`] : []),
    `    <atom:link href="${site.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
