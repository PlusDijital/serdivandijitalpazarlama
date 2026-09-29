import { defaultCmsData } from "@/lib/cms-defaults";
import type { BlogPost, CmsData, ServiceLandingPage } from "@/lib/cms-types";

/**
 * İçerik doğrudan koddan gelir (lib/cms-defaults.ts ve content/*).
 * Dosya sistemi kullanılmaz; Cloudflare Workers'ta sorunsuz çalışır.
 */
export function getCmsData(): CmsData {
  return defaultCmsData;
}

export function getServiceBySlug(slug: string): ServiceLandingPage | undefined {
  return defaultCmsData.serviceLandingPages.find((service) => service.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return defaultCmsData.blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsBySlugs(slugs: string[]): BlogPost[] {
  return slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => Boolean(post));
}
