import type { Metadata } from "next";
import CaseStudies from "@/components/CaseStudies";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import LocalWhy from "@/components/LocalWhy";
import PlatformStrip from "@/components/PlatformStrip";
import Process from "@/components/Process";
import Sectors from "@/components/Sectors";
import Services from "@/components/Services";
import Summary from "@/components/Summary";
import TrustBand from "@/components/TrustBand";
import { getCmsData } from "@/lib/cms";
import { faqSchema, graph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

const cms = getCmsData();

export const metadata: Metadata = buildPageMetadata(cms.site, cms.home.seo);

export default function Home() {
  const { home } = cms;
  return (
    <>
      <JsonLd data={graph(faqSchema(home.faq.items))} />
      <Header site={cms.site} header={cms.header} />
      <main id="icerik">
        <Hero content={home.hero} />
        <PlatformStrip />
        <section className="container-x py-10 md:py-14" aria-label="Özet">
          <div className="max-w-3xl">
            <Summary text={home.summary} />
          </div>
        </section>
        <Services content={home.services} />
        <LocalWhy content={home.local} />
        <Process content={home.process} />
        <Sectors content={home.sectors} />
        <CaseStudies content={home.caseStudies} />
        <Faq eyebrow={home.faq.eyebrow} title={home.faq.title} items={home.faq.items} />
        <TrustBand content={home.trust} />
        <CTA content={home.cta} />
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
