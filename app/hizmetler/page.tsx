import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedText from "@/components/HighlightedText";
import { getCmsData } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  return buildPageMetadata(cms.site, cms.servicesIndex.seo);
}

export default async function ServicesPage() {
  const cms = await getCmsData();
  const page = cms.servicesIndex;

  return (
    <>
      <Header site={cms.site} header={cms.header} />
      <main className="pt-20">
        <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[360px] w-[720px] opacity-12"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250,193,1,0.38) 0%, transparent 65%)",
            }}
          />

          <div className="container mx-auto max-w-5xl text-center relative">
            <span className="section-label">{page.hero.eyebrow}</span>
            <h1
              className="mt-6 text-5xl font-black tracking-tight md:text-6xl xl:text-7xl leading-[0.96]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              <HighlightedText
                text={page.hero.title}
                highlight={page.hero.titleHighlight}
              />
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/55">
              {page.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {page.hero.keywordCluster.map((keyword) => (
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

        <section className="px-4 pb-24">
          <div className="container mx-auto">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {cms.serviceLandingPages.map((service) => (
                <Link
                  key={service.slug}
                  href={`/hizmetler/${service.slug}`}
                  className="group glass-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="section-label">{service.eyebrow}</span>
                      <h2
                        className="mt-5 text-2xl font-black leading-tight"
                        style={{ fontFamily: "var(--font-display), sans-serif" }}
                      >
                        {service.title}
                      </h2>
                    </div>
                    <ArrowRight
                      size={18}
                      className="mt-1 text-white/30 transition-colors duration-200 group-hover:text-primary"
                    />
                  </div>

                  <p className="mt-4 text-sm leading-7 text-white/50">
                    {service.heroDescription}
                  </p>

                  <div className="mt-6 space-y-2">
                    {service.secondaryKeywords.slice(0, 3).map((keyword) => (
                      <div
                        key={keyword}
                        className="flex items-center gap-2 text-xs font-semibold text-white/40"
                      >
                        <Search size={12} className="text-primary" />
                        {keyword}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.localFocus.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/45"
                      >
                        <MapPin size={11} className="text-primary/70" />
                        {area}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTA content={cms.home.cta} />
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
