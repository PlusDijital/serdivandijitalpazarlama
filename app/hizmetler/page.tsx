import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { getCmsData } from "@/lib/cms";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

const cms = getCmsData();

export const metadata: Metadata = buildPageMetadata(cms.site, cms.servicesIndex.seo);

export default function ServicesPage() {
  const page = cms.servicesIndex;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(cms.site, [{ name: "Hizmetler", path: "/hizmetler" }]))} />
      <Header site={cms.site} header={cms.header} />
      <main id="icerik">
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          description={page.hero.description}
          crumbs={[{ name: "Hizmetler" }]}
          summary={page.summary}
        />

        <section className="section">
          <div className="container-x">
            <ul className="grid gap-5 md:grid-cols-2">
              {cms.serviceLandingPages.map((service) => (
                <li key={service.slug} className="reveal">
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="card group flex h-full flex-col p-6 transition-colors hover:border-accent md:p-8"
                  >
                    <span className="eyebrow">{service.eyebrow}</span>
                    <h2 className="mt-3 text-2xl font-bold text-ink">{service.title}</h2>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-muted">
                      {service.summary ?? service.metaDescription}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
                        <MapPin size={13} aria-hidden />
                        {service.localFocus.join(" · ")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                        Sayfayı aç
                        <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CTA content={cms.home.cta} />
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
