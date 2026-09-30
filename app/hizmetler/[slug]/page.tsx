import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin } from "lucide-react";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import RichText from "@/components/RichText";
import SectionHeading from "@/components/SectionHeading";
import { getBlogPostsBySlugs, getCmsData, getServiceBySlug } from "@/lib/cms";
import { breadcrumbSchema, faqSchema, graph, orgId } from "@/lib/schema";

type Params = Promise<{ slug: string }>;

const cms = getCmsData();

export function generateStaticParams() {
  return cms.serviceLandingPages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Hizmet Bulunamadı" };

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/hizmetler/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/hizmetler/${service.slug}`,
      type: "website",
      locale: "tr_TR",
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedPosts = getBlogPostsBySlugs(service.relatedPosts);
  const otherServices = cms.serviceLandingPages.filter((item) => item.slug !== service.slug);
  const pageUrl = `${cms.site.siteUrl}/hizmetler/${service.slug}`;
  const structuredData = graph(
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: service.title,
      description: service.summary ?? service.metaDescription,
      serviceType: service.primaryKeyword,
      url: pageUrl,
      provider: { "@id": orgId(cms.site) },
      areaServed: service.localFocus.map((name) => ({ "@type": "City", name })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} kapsamı`,
        itemListElement: service.deliverables.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item },
        })),
      },
    },
    breadcrumbSchema(cms.site, [
      { name: "Hizmetler", path: "/hizmetler" },
      { name: service.title, path: `/hizmetler/${service.slug}` },
    ]),
    service.faq.length > 0 && faqSchema(service.faq),
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <Header site={cms.site} header={cms.header} />
      <main id="icerik">
        <PageHero
          eyebrow={service.eyebrow}
          title={service.heroTitle}
          description={service.heroDescription}
          crumbs={[{ name: "Hizmetler", path: "/hizmetler" }, { name: service.title }]}
          summary={service.summary}
        >
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/iletisim" className="btn btn-primary">
              Ücretsiz Teklif Al
              <ArrowRight size={16} aria-hidden />
            </Link>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
              <MapPin size={15} aria-hidden className="text-accent" />
              {service.localFocus.join(" · ")}
            </span>
          </div>
        </PageHero>

        <section className="section">
          <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="card p-7 md:p-8">
              <h2 className="text-2xl font-extrabold text-ink">Bu hizmetle ne kazanırsınız?</h2>
              <ul className="mt-6 space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-[0.9375rem] leading-7 text-ink-soft">
                    <Check size={18} aria-hidden className="mt-1 shrink-0 text-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-7 md:p-8">
              <h2 className="text-2xl font-extrabold text-ink">Kapsam</h2>
              <ul className="mt-6 space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 rounded-lg bg-surface-soft px-4 py-3 text-[0.9375rem] leading-6 text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {service.sections && service.sections.length > 0 ? (
          <section className="border-y border-line bg-surface py-16 md:py-20">
            <div className="container-x">
              <div className="mx-auto max-w-3xl space-y-12">
                {service.sections.map((section) => (
                  <article key={section.heading}>
                    <h2 className="mb-4 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{section.heading}</h2>
                    <RichText text={section.body} />
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Süreç" title="Nasıl ilerliyoruz?" />
            <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <li key={step.title} className="card reveal p-6">
                  <span className="text-sm font-extrabold text-accent">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-7 text-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {service.faq.length > 0 ? (
          <div className="border-y border-line bg-surface">
            <Faq eyebrow="SSS" title="Sık sorulan sorular" items={service.faq} />
          </div>
        ) : null}

        {relatedPosts.length > 0 ? (
          <section className="section">
            <div className="container-x">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <SectionHeading eyebrow="Rehberler" title="Bu hizmetle ilgili yazılar" />
                <Link href="/blog" className="btn btn-secondary">
                  Tüm yazılar
                </Link>
              </div>
              <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <li key={post.slug} className="reveal">
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="border-t border-line bg-surface py-14">
          <div className="container-x">
            <h2 className="text-xl font-extrabold text-ink">Diğer hizmetler</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/hizmetler/${item.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-bg px-4 py-3.5 text-sm font-semibold text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.title}
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container-x">
            <div className="card p-8 text-center md:p-12">
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                {service.title} için işletmenize özel plan hazırlayalım
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                {"Formu doldurun ya da WhatsApp'tan yazın; mevcut durumunuzu ücretsiz inceleyip somut önerilerle dönelim."}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/iletisim" className="btn btn-primary">
                  Ücretsiz Teklif Al
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <Link href="/blog" className="btn btn-secondary">
                  Önce rehberleri oku
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
