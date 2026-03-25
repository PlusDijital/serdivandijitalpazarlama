import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedText from "@/components/HighlightedText";
import { getCmsData } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  return buildPageMetadata(cms.site, cms.blogIndex.seo);
}

const categoryColors: Record<string, string> = {
  SEO: "text-emerald-400 bg-emerald-400/8 border-emerald-400/20",
  "Sosyal Medya": "text-blue-400 bg-blue-400/8 border-blue-400/20",
  "Sağlık Turizmi": "text-purple-400 bg-purple-400/8 border-purple-400/20",
  "Google Ads": "text-primary bg-primary/8 border-primary/20",
  Tasarım: "text-pink-400 bg-pink-400/8 border-pink-400/20",
  "E-Posta": "text-orange-400 bg-orange-400/8 border-orange-400/20",
};

export default async function Blog() {
  const cms = await getCmsData();
  const featured = cms.blogPosts[0];
  const rest = cms.blogPosts.slice(1);

  return (
    <>
      <Header site={cms.site} header={cms.header} />
      <main className="pt-20">
        <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[340px] opacity-12"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250,193,1,0.4) 0%, transparent 65%)",
            }}
          />
          <div className="container mx-auto max-w-3xl text-center relative">
            <span className="section-label">{cms.blogIndex.hero.eyebrow}</span>
            <h1
              className="mt-6 text-5xl font-black tracking-tight md:text-6xl leading-[0.96]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              <HighlightedText
                text={cms.blogIndex.hero.title}
                highlight={cms.blogIndex.hero.titleHighlight}
              />
            </h1>
            <p className="mt-5 text-lg text-white/50 leading-7">
              {cms.blogIndex.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {cms.blogIndex.hero.topicClusters.map((cluster) => (
                <span
                  key={cluster}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/65"
                >
                  {cluster}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="container mx-auto">
            {featured ? (
              <Link href={`/blog/${featured.slug}`} className="group block mb-6">
                <div className="relative overflow-hidden rounded-3xl border border-white/8 p-8 md:p-10 hover:border-primary/30 transition-all duration-350 glass-card">
                  <div
                    className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(250,193,1,0.1), transparent 70%)",
                    }}
                  />
                  <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-bold ${categoryColors[featured.category] ?? "text-primary bg-primary/8 border-primary/20"}`}
                        >
                          {featured.category}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary/70">
                          {cms.blogIndex.featuredLabel}
                        </span>
                      </div>
                      <h2
                        className="text-3xl md:text-4xl font-black leading-tight mb-4"
                        style={{ fontFamily: "var(--font-display), sans-serif" }}
                      >
                        {featured.title}
                      </h2>
                      <p className="text-base leading-7 text-white/50">
                        {featured.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-white/30">
                        <span>{featured.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {featured.readTime} okuma
                        </span>
                      </div>
                    </div>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/40 group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/8 transition-all duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass-card rounded-3xl p-7 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-bold ${categoryColors[post.category] ?? "text-primary bg-primary/8 border-primary/20"}`}
                    >
                      {post.category}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-white/20 group-hover:text-primary transition-colors duration-300"
                    />
                  </div>
                  <h2
                    className="text-lg font-bold leading-tight mb-3 group-hover:text-primary transition-colors duration-200"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm leading-6.5 text-white/45 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-white/25">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
