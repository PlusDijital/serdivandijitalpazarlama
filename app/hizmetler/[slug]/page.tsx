import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MapPin } from "lucide-react";
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
  const service = cms.serviceLandingPages.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Hizmet Bulunamadı",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [service.primaryKeyword, ...service.secondaryKeywords],
    alternates: {
      canonical: `/hizmetler/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/hizmetler/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const cms = await getCmsData();
  const service = cms.serviceLandingPages.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedPosts = service.relatedPosts
    .map((relatedSlug) => cms.blogPosts.find((post) => post.slug === relatedSlug))
    .filter(Boolean);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.metaDescription,
      serviceType: service.title,
      areaServed: service.localFocus,
      url: `${cms.site.siteUrl}/hizmetler/${service.slug}`,
      provider: {
        "@type": "ProfessionalService",
        name: cms.site.brandName,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Serdivan",
          addressRegion: "Sakarya",
          addressCountry: "TR",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header site={cms.site} header={cms.header} />
      <main className="pt-20">
        <section className="section-shell relative overflow-hidden border-b border-white/6 px-4 py-16 md:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[320px] w-[660px] opacity-10"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250,193,1,0.35) 0%, transparent 65%)",
            }}
          />

          <div className="container mx-auto max-w-5xl relative">
            <Link
              href="/hizmetler"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors duration-200 hover:text-primary"
            >
              <ArrowLeft size={15} />
              Hizmetlere Dön
            </Link>

            <span className="section-label">{service.eyebrow}</span>
            <h1
              className="mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl leading-[0.97]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {service.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
              {service.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[service.primaryKeyword, ...service.secondaryKeywords].map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/65"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20">
          <div className="container mx-auto grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <h2
                className="text-3xl font-black"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Neden bu hizmet sayfası önemli?
              </h2>
              <p className="mt-5 text-base leading-8 text-white/55">
                Bu landing page yalnızca genel bilgi vermek için değil,{" "}
                <strong className="text-white">{service.primaryKeyword}</strong> ve
                ilişkili lokal aramalarda kullanıcı niyeti ile sayfa içeriğini daha
                net eşleştirmek için hazırlandı. Böylece hem organik görünürlük hem
                dönüşüm oranı birlikte desteklenir.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {service.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-2xl border border-white/8 bg-white/4 p-5 text-sm leading-7 text-white/55"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 md:p-10">
              <h2
                className="text-3xl font-black"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Lokal odak
              </h2>
              <div className="mt-6 space-y-3">
                {service.localFocus.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/60"
                  >
                    <MapPin size={14} className="text-primary" />
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/6 px-4 py-16 md:py-20">
          <div className="container mx-auto">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {service.deliverables.map((item) => (
                <div
                  key={item}
                  className="glass-card rounded-3xl p-7 text-sm leading-7 text-white/55"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/8">
                    <Check size={16} className="text-primary" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/6 px-4 py-16 md:py-20">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <span className="section-label">Çalışma Modeli</span>
              <h2
                className="mt-5 text-4xl font-black tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Lokal aramadan
                <span className="text-gradient-gold"> dönüşüme giden akış</span>
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {service.process.map((step, index) => (
                <div key={step.title} className="glass-card rounded-3xl p-8">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary/75">
                    0{index + 1}
                  </div>
                  <h3
                    className="mt-5 text-2xl font-black leading-tight"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/50">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/6 px-4 py-16 md:py-20">
          <div className="container mx-auto grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="section-label">SSS</span>
              <h2
                className="mt-5 text-4xl font-black tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Sık sorulan sorular
              </h2>
            </div>

            <div className="space-y-4">
              {service.faq.map((item) => (
                <div key={item.question} className="glass-card rounded-3xl p-7">
                  <h3
                    className="text-xl font-black leading-tight"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {item.question}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/6 px-4 py-16 md:py-20">
          <div className="container mx-auto">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="section-label">İçerik Kümesi</span>
                <h2
                  className="mt-5 text-4xl font-black tracking-tight md:text-5xl"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  Bu hizmeti destekleyen blog içerikleri
                </h2>
              </div>
              <Link href="/blog" className="btn-ghost">
                Tüm yazıları incele
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass-card rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <span className="section-label">{post.category}</span>
                  <h3
                    className="mt-5 text-2xl font-black leading-tight"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/50">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Yazıyı aç
                    <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div
              className="rounded-3xl border border-primary/20 px-8 py-14 text-center"
              style={{
                background:
                  "linear-gradient(145deg, rgba(250,193,1,0.12), rgba(0,0,0,0.65))",
              }}
            >
              <h2
                className="text-3xl font-black md:text-4xl"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {service.title} için markanıza özel plan hazırlayalım
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/55">
                Ücretsiz ilk görüşmede hedef bölgenizi, bütçenizi ve içerik veya
                reklam tarafında hangi sayfaların öncelikli olması gerektiğini
                birlikte netleştirelim.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/iletisim" className="btn-primary">
                  Ücretsiz görüşme al
                  <ArrowRight size={14} />
                </Link>
                <Link href="/blog" className="btn-ghost">
                  Önce blogu incele
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
