import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PostCover from "@/components/PostCover";
import RichText from "@/components/RichText";
import { getBlogPostBySlug, getCmsData, getServiceBySlug } from "@/lib/cms";
import { breadcrumbSchema, faqSchema, graph, orgId } from "@/lib/schema";
import { slugify } from "@/lib/slug";

type Params = Promise<{ slug: string }>;

const cms = getCmsData();

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
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      locale: "tr_TR",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedService = getServiceBySlug(post.relatedServiceSlug);
  const pageUrl = `${cms.site.siteUrl}/blog/${post.slug}`;
  const faq = post.faq ?? [];
  const toc = post.sections.map((section) => ({ ...section, id: slugify(section.heading) }));
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
      image: {
        "@type": "ImageObject",
        url: `${pageUrl}/opengraph-image`,
        width: 1200,
        height: 630,
      },
      mainEntityOfPage: pageUrl,
      articleSection: post.category,
      about: post.primaryKeyword,
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
      <Header site={cms.site} header={cms.header} />
      <main id="icerik">
        <PageHero
          eyebrow={post.category}
          title={post.title}
          description={post.intro}
          crumbs={[{ name: "Blog", path: "/blog" }, { name: post.title }]}
          summary={post.summary}
        >
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-muted">
            <span>{post.authorName}</span>
            <time dateTime={post.updatedAt}>{post.date}</time>
            <span>{post.readTime} okuma</span>
          </p>
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
                  <h2 id={section.id} className="mb-4 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
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
                    Hizmet sayfasını aç
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                </div>
              ) : null}

              <div className="rounded-[var(--radius-card)] bg-ink p-8 text-center text-white">
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
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
