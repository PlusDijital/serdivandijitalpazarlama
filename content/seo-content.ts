export type { ServiceLandingPage } from "@/lib/cms-types";

import type { BlogPost as FullBlogPost } from "@/lib/cms-types";

/** İçerik dosyalarında kapak görseli/tarih/yazar alanları merkezi olarak eklenir. */
export type BlogPost = Omit<FullBlogPost, "coverImage" | "publishedAt" | "updatedAt" | "authorName">;
