import type { Faq, SiteSettings } from "@/lib/cms-types";

type Crumb = { name: string; path: string };

export function orgId(site: SiteSettings) {
  return `${site.siteUrl}/#organization`;
}

export function websiteId(site: SiteSettings) {
  return `${site.siteUrl}/#website`;
}

export function absoluteUrl(site: SiteSettings, path: string) {
  return path === "/" ? site.siteUrl : `${site.siteUrl}${path}`;
}

/**
 * Tüm sayfalarda kullanılan işletme varlığı. Açık adres girilmediyse yalnızca
 * ilçe/il bilgisi verilir ve hizmet bölgesi (areaServed) öne çıkar.
 * parentOrganization ile Plus Dijital'e bağlanır.
 */
export function organizationSchema(site: SiteSettings) {
  const business = site.business ?? {};
  const areaServed = business.areaServed ?? ["Serdivan", "Adapazarı", "Erenler", "Sakarya"];
  const sameAs = [
    ...(business.sameAs ?? []),
    ...(business.googleBusinessProfileUrl ? [business.googleBusinessProfileUrl] : []),
  ].filter(Boolean);

  return {
    "@type": ["ProfessionalService", "Organization"],
    "@id": orgId(site),
    name: site.brandName,
    alternateName: [site.brandShortName, "Serdivan Reklam"],
    url: site.siteUrl,
    logo: `${site.siteUrl}/icon`,
    image: `${site.siteUrl}/opengraph-image`,
    description: site.defaultSeo.description,
    slogan: "Serdivan'daki işletmeler için ölçülebilir reklam",
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    ...(business.foundingDate ? { foundingDate: business.foundingDate } : {}),
    address: {
      "@type": "PostalAddress",
      ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}),
      ...(business.postalCode ? { postalCode: business.postalCode } : {}),
      addressLocality: "Serdivan",
      addressRegion: "Sakarya",
      addressCountry: "TR",
    },
    areaServed: areaServed.map((name) => ({
      "@type": name === "Sakarya" ? "AdministrativeArea" : "City",
      name,
    })),
    parentOrganization: {
      "@type": "Organization",
      name: site.parentBrand.name,
      url: site.parentBrand.url,
    },
    knowsAbout: [
      "Reklam ajansı hizmetleri",
      "Google Ads",
      "Instagram ve Facebook reklamları",
      "Yerel SEO",
      "Generative Engine Optimization (GEO)",
      "Sosyal medya yönetimi",
      "Web tasarım",
      "Dijital pazarlama",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      ...(business.email ? { email: business.email } : {}),
      availableLanguage: "tr",
      url: `${site.siteUrl}/iletisim`,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(site: SiteSettings) {
  return {
    "@type": "WebSite",
    "@id": websiteId(site),
    url: site.siteUrl,
    name: site.brandName,
    inLanguage: "tr-TR",
    publisher: { "@id": orgId(site) },
  };
}

export function breadcrumbSchema(site: SiteSettings, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Ana Sayfa", path: "/" }, ...crumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(site, crumb.path),
    })),
  };
}

export function faqSchema(faq: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function graph(...nodes: (object | null | undefined | false)[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  });
}
