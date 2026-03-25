import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCmsData } from "@/lib/cms";

type Params = Promise<{
  slug: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getCmsData();
  const post = cms.blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Blog Yazısı Bulunamadı",
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const cms = await getCmsData();
  const post = cms.blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedService = cms.serviceLandingPages.find(
    (service) => service.slug === post.relatedServiceSlug,
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: cms.site.brandName,
    },
    image: post.coverImage ? [`${cms.site.siteUrl}${post.coverImage}`] : undefined,
    mainEntityOfPage: `${cms.site.siteUrl}/blog/${post.slug}`,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header site={cms.site} header={cms.header} />
      <main className="pt-20">
        <section className="section-shell relative overflow-hidden px-4 py-16 md:py-20 border-b border-white/6">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[320px] opacity-10"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250,193,1,0.4) 0%, transparent 65%)",
            }}
          />
          <div className="container mx-auto max-w-3xl relative">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-primary transition-colors duration-200 mb-8"
            >
              <ArrowLeft size={15} />
              Blog&apos;a Dön
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.category ? (
                <span className="rounded-full border border-primary/22 bg-primary/8 px-3 py-1 text-xs font-bold text-primary">
                  {post.category}
                </span>
              ) : null}
              {post.date ? <span className="text-xs text-white/30">{post.date}</span> : null}
              {post.readTime ? (
                <span className="flex items-center gap-1 text-xs text-white/30">
                  <Clock size={11} />
                  {post.readTime} okuma
                </span>
              ) : null}
            </div>

            <h1
              className="text-4xl font-black tracking-tight md:text-5xl leading-[0.97]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {post.title}
            </h1>

            {post.intro ? (
              <p className="mt-6 text-lg leading-7 text-white/55">{post.intro}</p>
            ) : null}
          </div>
        </section>

        <article className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-3xl">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="rounded-3xl mb-12 w-full border border-primary/12 object-cover"
                style={{ aspectRatio: "16/7" }}
              />
            ) : (
              <div
                className="rounded-3xl mb-12 flex items-center justify-center"
                style={{
                  aspectRatio: "16/7",
                  background:
                    "linear-gradient(135deg, rgba(250,193,1,0.12) 0%, rgba(16,16,16,0.9) 100%)",
                  border: "1px solid rgba(250,193,1,0.12)",
                }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">
                  {post.category} · Serdivan Blog
                </span>
              </div>
            )}

            <div className="mb-10 flex flex-wrap gap-2">
              {[post.primaryKeyword, ...post.secondaryKeywords].map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="space-y-10">
              {post.sections.map((section, index) => (
                <div key={`${section.heading}-${index}`}>
                  <h2
                    className="text-2xl font-black mb-4 text-white"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {section.heading}
                  </h2>
                  <p className="text-base leading-8 text-white/60">{section.body}</p>
                </div>
              ))}
            </div>

            {relatedService ? (
              <div className="mt-14 rounded-3xl border border-white/8 bg-white/4 p-8">
                <span className="section-label">İlgili Hizmet</span>
                <h2
                  className="mt-5 text-3xl font-black"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {relatedService.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/55">
                  Bu yazıdaki stratejileri hizmete dönüştürmek isterseniz ilgili
                  landing page üzerinden çalışma modelimizi daha detaylı inceleyebilirsiniz.
                </p>
                <Link
                  href={`/hizmetler/${relatedService.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Hizmet sayfasını aç
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : null}

            <div className="my-14 h-px bg-white/7" />

            <div
              className="rounded-3xl p-8 md:p-10 text-center noise"
              style={{
                background: "linear-gradient(145deg, rgba(250,193,1,0.09), rgba(0,0,0,0.6))",
                border: "1px solid rgba(250,193,1,0.2)",
              }}
            >
              <h3
                className="text-2xl font-black mb-3"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Bu stratejiyi markanıza uygulamak ister misiniz?
              </h3>
              <p className="text-sm text-white/50 mb-6 max-w-md mx-auto">
                Ücretsiz ilk görüşmede projenizi ve hedeflerinizi konuşalım.
              </p>
              <Link href="/iletisim" className="btn-primary">
                Bizimle İletişime Geçin
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
