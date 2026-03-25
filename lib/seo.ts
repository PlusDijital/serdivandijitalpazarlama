import type { Metadata } from "next";
import type { SeoSettings, SiteSettings } from "@/lib/cms-types";

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
    alternates: {
      canonical: "/",
    },
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
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.openGraphTitle ?? seo.title,
      description: seo.openGraphDescription ?? seo.description,
      url: seo.canonical,
      siteName: site.brandName,
    },
  };
}
