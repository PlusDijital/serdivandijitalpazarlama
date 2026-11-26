import type { Metadata } from "next";
import BrandSprite from "@/components/BrandSprite";
import CaseStudies from "@/components/CaseStudies";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import LatestGuides from "@/components/LatestGuides";
import LocalWhy from "@/components/LocalWhy";
import PlatformStrip from "@/components/PlatformStrip";
import Process from "@/components/Process";
import QuickFacts from "@/components/QuickFacts";
import Sectors from "@/components/Sectors";
import Services from "@/components/Services";
import TrustBand from "@/components/TrustBand";
import { getCmsData } from "@/lib/cms";
import { faqSchema, graph, webPageSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

const cms = getCmsData();

export const metadata: Metadata = buildPageMetadata(cms.site, cms.home.seo);

export default function Home() {
  const { home } = cms;
  const latestUpdate = cms.blogPosts.map((post) => post.updatedAt).sort().at(-1);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema(cms.site, {
            path: "/",
            name: home.seo.title,
            description: home.seo.description,
            dateModified: latestUpdate,
            speakable: true,
          }),
          faqSchema(home.faq.items),
        )}
      />
      <BrandSprite />
      <Header site={cms.site} header={cms.header} current="/" />
      <main id="icerik">
        <Hero content={home.hero} />
        <PlatformStrip />
        <QuickFacts summary={home.summary} facts={home.facts} />
        <Services content={home.services} />
        <LocalWhy content={home.local} />
        <Process content={home.process} />
        <Sectors content={home.sectors} />
        <CaseStudies content={home.caseStudies} />
        <LatestGuides content={home.guides} posts={cms.blogPosts.slice(0, 3)} />
        <div className="border-t border-line bg-surface">
          <Faq eyebrow={home.faq.eyebrow} title={home.faq.title} items={home.faq.items} />
        </div>
        <TrustBand content={home.trust} />
        <CTA content={home.cta} />
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
