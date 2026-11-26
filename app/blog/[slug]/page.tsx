import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, RefreshCw } from "lucide-react";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import PostCover from "@/components/PostCover";
import RichText from "@/components/RichText";
import { getBlogPostBySlug, getCmsData, getServiceBySlug } from "@/lib/cms";
import { formatDate } from "@/lib/date";
import type { BlogPost } from "@/lib/cms-types";
import { breadcrumbSchema, faqSchema, graph, orgId, SPEAKABLE_SELECTOR, websiteId } from "@/lib/schema";
import { pageAlternates, socialMetadata } from "@/lib/seo";
import { slugify } from "@/lib/slug";

type Params = Promise<{ slug: string }>;

const cms = getCmsData();

/** Benzer yazılar: önce aynı hizmete bağlı olanlar, sonra aynı kategori, eksik kalırsa en yeniler. */
function relatedPostsFor(post: BlogPost, limit = 3): BlogPost[] {
  const others = cms.blogPosts.filter((item) => item.slug !== post.slug);
  const score = (item: BlogPost) =>
    (item.relatedServiceSlug === post.relatedServiceSlug ? 2 : 0) + (item.category === post.category ? 1 : 0);
  return others
    .map((item, index) => ({ item, index, score: score(item) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((entry) => entry.item);
}

function wordCount(post: BlogPost) {
  return [post.intro, post.summary ?? "", ...post.sections.flatMap((s) => [s.heading, s.body])]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function generateStaticParams() {
  return cms.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog Yazısı Bulunamadı" };

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    alternates: pageAlternates(cms.site, `/blog/${post.slug}`),
    ...socialMetadata(cms.site, {
      title: post.metaTitle,
      description: post.metaDescription,
      path: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: post.category,
      tags: [post.primaryKeyword, ...post.secondaryKeywords],
    }),
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedService = getServiceBySlug(post.relatedServiceSlug);
  const relatedPosts = relatedPostsFor(post);
  const pageUrl = `${cms.site.siteUrl}/blog/${post.slug}`;
  const faq = post.faq ?? [];
  const toc = post.sections.map((section) => ({ ...section, id: slugify(section.heading) }));
  const updated = post.updatedAt !== post.publishedAt;
  const structuredData = graph(
    {
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      headline: post.title,
      description: post.summary ?? post.metaDescription,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: "tr-TR",
      author: { "@id": orgId(cms.site) },
      publisher: { "@id": orgId(cms.site) },
      isPartOf: { "@id": websiteId(cms.site) },
      image: {
        "@type": "ImageObject",
        url: `${pageUrl}/opengraph-image`,
        width: 1200,
        height: 630,
      },
      mainEntityOfPage: pageUrl,
      articleSection: post.category,
      about: post.primaryKeyword,
      keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
      wordCount: wordCount(post),
      ...(post.summary
        ? { speakable: { "@type": "SpeakableSpecification", cssSelector: [SPEAKABLE_SELECTOR] } }
        : {}),
    },
    breadcrumbSchema(cms.site, [
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    faq.length > 0 && faqSchema(faq),
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="read-progress" aria-hidden />
      <Header site={cms.site} header={cms.header} current={`/blog/${post.slug}`} />
      <main id="icerik">
        <PageHero
          eyebrow={post.category}
          title={post.title}
          description={post.intro}
          crumbs={[{ name: "Blog", path: "/blog" }, { name: post.title }]}
          summary={post.summary}
        >
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted">
            <li className="text-ink-soft">{post.authorName}</li>
            <li className="inline-flex items-center gap-1.5">
              <CalendarDays size={15} aria-hidden className="text-accent" />
              <span className="sr-only">Yayın tarihi: </span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </li>
            {updated ? (
              <li className="inline-flex items-center gap-1.5">
                <RefreshCw size={14} aria-hidden className="text-accent" />
                Güncelleme: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </li>
            ) : null}
            <li className="inline-flex items-center gap-1.5">
              <Clock size={15} aria-hidden className="text-accent" />
              {post.readTime} okuma
            </li>
          </ul>
        </PageHero>

        <article className="section">
          <div className="container-x">
            <div className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-[var(--radius-card)] border border-line shadow-card">
              <PostCover category={post.category} id={post.slug} />
            </div>

            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[14rem_1fr]">
              <nav aria-label="İçindekiler" className="toc hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">İçindekiler</p>
                  <ol className="mt-4 space-y-2.5 border-l border-line pl-4">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="block text-sm font-semibold leading-5 text-ink-soft">
                          {item.heading}
                        </a>
                      </li>
                    ))}
                    {faq.length > 0 ? (
                      <li>
                        <a href="#sss" className="block text-sm font-semibold leading-5 text-ink-soft">
                          Sık sorulan sorular
                        </a>
                      </li>
                    ) : null}
                  </ol>
                </div>
              </nav>

              <div className="min-w-0 max-w-3xl space-y-12">
                <details className="toc rounded-[var(--radius-card)] border border-line bg-surface p-5 lg:hidden">
                  <summary className="cursor-pointer text-sm font-bold text-ink">İçindekiler</summary>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-semibold text-ink-soft">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>{item.heading}</a>
                      </li>
                    ))}
                  </ol>
                </details>

                {toc.map((section, index) => (
                  <section key={`${section.id}-${index}`} aria-labelledby={section.id} className="scroll-mt-28">
                    <h2 id={section.id} className="mb-4 scroll-mt-28 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                      {section.heading}
                    </h2>
                    <RichText text={section.body} />
                  </section>
                ))}

                {faq.length > 0 ? <Faq title="Sık sorulan sorular" items={faq} compact /> : null}

                {relatedService ? (
                  <div className="card p-7">
                    <span className="eyebrow">İlgili hizmet</span>
                    <h2 className="mt-3 text-2xl font-extrabold text-ink">{relatedService.title}</h2>
                    <p className="mt-3 text-[0.9375rem] leading-7 text-muted">
                      {relatedService.summary ?? relatedService.metaDescription}
                    </p>
                    <Link
                      href={`/hizmetler/${relatedService.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent"
                    >
                      {relatedService.title} sayfasını aç
                      <ArrowRight size={15} aria-hidden />
                    </Link>
                  </div>
                ) : null}

                <div className="cta-panel rounded-[var(--radius-card)] p-8 text-center text-white">
                  <h2 className="text-2xl font-extrabold">Bunu işletmenize uygulamak ister misiniz?</h2>
                  <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-7 text-white/80">
                    {"Ücretsiz analizle mevcut durumunuzu inceleyip WhatsApp'tan hızlıca dönelim."}
                  </p>
                  <Link href="/iletisim" className="btn btn-accent mt-6">
                    Ücretsiz Teklif Al
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 ? (
          <section className="section border-t border-line bg-surface" aria-labelledby="benzer-rehberler">
            <div className="container-x">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="eyebrow">Okumaya devam edin</span>
                  <h2 id="benzer-rehberler" className="mt-4 text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl">
                    Benzer rehberler
                  </h2>
                </div>
                <Link href="/blog" className="btn btn-secondary">
                  Tüm rehberler
                </Link>
              </div>
              <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((item) => (
                  <li key={item.slug} className="reveal">
                    <PostCard post={item} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
