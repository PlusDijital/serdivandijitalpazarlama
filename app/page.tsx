import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Results from "@/components/Results";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { getCmsData } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  return buildPageMetadata(cms.site, cms.home.seo);
}

export default async function Home() {
  const cms = await getCmsData();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: cms.home.structuredData.name,
    url: cms.site.siteUrl,
    description: cms.home.structuredData.description,
    areaServed: cms.home.structuredData.areaServed,
    address: {
      "@type": "PostalAddress",
      addressLocality: cms.home.structuredData.addressLocality,
      addressRegion: cms.home.structuredData.addressRegion,
      addressCountry: cms.home.structuredData.addressCountry,
    },
    serviceType: cms.home.structuredData.serviceType,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header site={cms.site} header={cms.header} />
      <main>
        <Hero content={cms.home.hero} />
        <Partners content={cms.home.partners} />
        <Results content={cms.home.results} />
        <hr className="section-divider" />
        <Services content={cms.home.services} />
        <hr className="section-divider" />
        <Process content={cms.home.process} />
        <hr className="section-divider" />
        <Testimonials content={cms.home.testimonials} />
        <CTA content={cms.home.cta} />
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
