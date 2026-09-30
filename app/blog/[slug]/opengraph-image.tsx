import { ImageResponse } from "next/og";
import { getBlogPostBySlug, getCmsData } from "@/lib/cms";
import { coverTheme } from "@/lib/covers";

export const alt = "Serdivan Reklam Ajansı blog yazısı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getCmsData().blogPosts.map((post) => ({ slug: post.slug }));
}

/** Yazı başına paylaşım görseli (Google Discover, WhatsApp, LinkedIn); derleme anında statik üretilir. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const title = post?.title ?? "Serdivan Reklam Ajansı";
  const category = post?.category ?? "Blog";
  const t = coverTheme(category);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${t.from} 0%, ${t.to} 100%)`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: t.accent,
              color: t.from,
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {category}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 70 ? 56 : 66, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#ffffff",
                color: t.from,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              S
            </div>
            <div style={{ display: "flex", fontWeight: 700 }}>Serdivan Reklam Ajansı</div>
          </div>
          <div style={{ display: "flex", opacity: 0.75 }}>serdivanreklamajansi.com</div>
        </div>
      </div>
    ),
    size,
  );
}
