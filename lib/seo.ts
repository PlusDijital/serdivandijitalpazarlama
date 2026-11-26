import type { Metadata } from "next";
import type { SeoSettings, SiteSettings } from "@/lib/cms-types";

export const FEED_PATH = "/feed.xml";

/**
 * Sayfa "alternates" alanı üst düzeydekini tümüyle ezer; bu yüzden kanonik adres ve
 * RSS bağlantısı her sayfada birlikte verilir.
 */
export function pageAlternates(site: SiteSettings, canonical: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical,
    types: {
      "application/rss+xml": [{ url: FEED_PATH, title: `${site.brandName} Blog` }],
    },
  };
}

/** Open Graph ve X/Twitter kartı: sayfa düzeyinde verilince üst düzeydeki alanlar miras alınmaz. */
export function socialMetadata(
  site: SiteSettings,
  page: {
    title: string;
    description: string;
    path: string;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
    /**
     * Kendi opengraph-image dosyası olmayan sayfalarda true: sayfa "openGraph" verdiğinde kökteki
     * dosya tabanlı görsel miras alınmaz, bu yüzden site görseli açıkça eklenir.
     */
    defaultImage?: boolean;
  },
): Pick<Metadata, "openGraph" | "twitter"> {
  const images = page.defaultImage
    ? [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.brandName, type: "image/png" }]
    : undefined;

  return {
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: site.brandName,
      locale: "tr_TR",
      ...(images ? { images } : {}),
      ...(page.type === "article"
        ? {
            type: "article" as const,
            publishedTime: page.publishedTime,
            modifiedTime: page.modifiedTime,
            section: page.section,
            tags: page.tags,
            authors: [site.brandName],
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      ...(images ? { images: images.map((image) => image.url) } : {}),
    },
  };
}

export function buildRootMetadata(site: SiteSettings): Metadata {
  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: site.defaultSeo.defaultTitle,
      template: site.defaultSeo.titleTemplate,
    },
    description: site.defaultSeo.description,
    applicationName: site.applicationName,
    keywords: site.defaultSeo.keywords,
    authors: [{ name: site.brandName, url: site.siteUrl }],
    creator: site.brandName,
    publisher: site.brandName,
    category: "business",
    alternates: pageAlternates(site, "/"),
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: site.siteUrl,
      siteName: site.brandName,
      title: site.defaultSeo.openGraphTitle,
      description: site.defaultSeo.openGraphDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: site.defaultSeo.twitterTitle,
      description: site.defaultSeo.twitterDescription,
    },
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
      ...(process.env.YANDEX_VERIFICATION ? { yandex: process.env.YANDEX_VERIFICATION } : {}),
      ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
    },
    // Yerel arama için konum ipuçları (Bing ve bazı dizinler okur). TR-54: Sakarya.
    other: {
      "geo.region": "TR-54",
      "geo.placename": "Serdivan, Sakarya",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function buildPageMetadata(
  site: SiteSettings,
  seo: SeoSettings,
): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: pageAlternates(site, seo.canonical),
    ...socialMetadata(site, {
      title: seo.openGraphTitle ?? seo.title,
      description: seo.openGraphDescription ?? seo.description,
      path: seo.canonical,
      // Ana sayfa kökteki opengraph-image dosyasını kendisi alır.
      defaultImage: seo.canonical !== "/",
    }),
  };
}
