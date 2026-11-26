import type { Faq, SiteSettings } from "@/lib/cms-types";

type Crumb = { name: string; path: string };
type ServiceRef = { slug: string; title: string };

export function orgId(site: SiteSettings) {
  return `${site.siteUrl}/#organization`;
}

export function websiteId(site: SiteSettings) {
  return `${site.siteUrl}/#website`;
}

export function absoluteUrl(site: SiteSettings, path: string) {
  return path === "/" ? site.siteUrl : `${site.siteUrl}${path}`;
}

export function serviceId(site: SiteSettings, slug: string) {
  return `${site.siteUrl}/hizmetler/${slug}#service`;
}

/** "Kısaca" kutusunun seçicisi: sesli asistanlar ve yapay zeka özetleri için öncelikli metin. */
export const SPEAKABLE_SELECTOR = "[data-kisaca]";

/**
 * Tüm sayfalarda kullanılan işletme varlığı. Açık adres girilmediyse yalnızca
 * ilçe/il bilgisi verilir ve hizmet bölgesi (areaServed) öne çıkar.
 * parentOrganization ile Plus Dijital'e bağlanır; hizmetler hasOfferCatalog ile
 * kendi sayfalarındaki Service varlıklarına (@id) bağlanır.
 */
export function organizationSchema(site: SiteSettings, services: ServiceRef[] = []) {
  const business = site.business ?? {};
  const areaServed = business.areaServed ?? ["Serdivan", "Adapazarı", "Erenler", "Sakarya"];
  const sameAs = [
    ...(business.sameAs ?? []),
    ...(business.googleBusinessProfileUrl ? [business.googleBusinessProfileUrl] : []),
  ].filter(Boolean);
  const hours = business.openingHours;

  return {
    "@type": ["ProfessionalService", "Organization"],
    "@id": orgId(site),
    name: site.brandName,
    alternateName: [site.brandShortName, "Serdivan Reklam Ajansi", "serdivanreklamajansi.com"],
    url: site.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${site.siteUrl}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
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
    areaServed: areaServed.map((name) =>
      name === "Sakarya"
        ? { "@type": "AdministrativeArea", name, containedInPlace: { "@type": "Country", name: "Türkiye" } }
        : { "@type": "City", name, containedInPlace: { "@type": "AdministrativeArea", name: "Sakarya" } },
    ),
    ...(hours
      ? {
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: hours.days,
              opens: hours.opens,
              closes: hours.closes,
            },
          ],
        }
      : {}),
    parentOrganization: {
      "@type": "Organization",
      name: site.parentBrand.name,
      url: site.parentBrand.url,
    },
    knowsLanguage: "tr",
    knowsAbout: [
      "Reklam ajansı hizmetleri",
      "Google Ads",
      "Instagram ve Facebook reklamları",
      "Yerel SEO",
      "Google İşletme Profili",
      "Generative Engine Optimization (GEO)",
      "Sosyal medya yönetimi",
      "Web tasarım",
      "Dijital pazarlama",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      ...(business.phone ? { telephone: business.phone } : {}),
      ...(business.email ? { email: business.email } : {}),
      availableLanguage: "tr",
      areaServed: "TR",
      url: `${site.siteUrl}/iletisim`,
    },
    ...(services.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${site.brandName} hizmetleri`,
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": serviceId(site, service.slug),
                name: service.title,
                url: `${site.siteUrl}/hizmetler/${service.slug}`,
              },
            })),
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(site: SiteSettings) {
  return {
    "@type": "WebSite",
    "@id": websiteId(site),
    url: site.siteUrl,
    name: site.brandName,
    alternateName: site.brandShortName,
    description: site.defaultSeo.description,
    inLanguage: "tr-TR",
    publisher: { "@id": orgId(site) },
  };
}

/**
 * Sayfa varlığı: siteye (isPartOf) ve işletmeye (about) bağlanır.
 * speakable, "Kısaca" kutusu olan sayfalarda o metni işaret eder.
 */
export function webPageSchema(
  site: SiteSettings,
  page: {
    path: string;
    name: string;
    description: string;
    type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
    dateModified?: string;
    speakable?: boolean;
    /** Sayfanın ana konusu başka bir varlıksa (ör. Service) onun @id'si. */
    mainEntityId?: string;
  },
) {
  const url = absoluteUrl(site, page.path);
  return {
    "@type": page.type ?? "WebPage",
    "@id": page.path === "/" ? `${site.siteUrl}/#webpage` : `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": websiteId(site) },
    about: { "@id": orgId(site) },
    ...(page.mainEntityId ? { mainEntity: { "@id": page.mainEntityId } } : {}),
    ...(page.dateModified ? { dateModified: page.dateModified } : {}),
    ...(page.speakable
      ? { speakable: { "@type": "SpeakableSpecification", cssSelector: [SPEAKABLE_SELECTOR] } }
      : {}),
  };
}

export function itemListSchema(site: SiteSettings, name: string, items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(site, item.path),
    })),
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
