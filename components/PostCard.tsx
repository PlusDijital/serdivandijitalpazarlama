import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/cms-types";

export default function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`card group flex h-full flex-col transition-colors hover:border-accent ${featured ? "p-8 md:p-10" : "p-6"}`}
    >
      <div className="flex items-center gap-3 text-xs font-semibold text-muted">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">{post.category}</span>
        <time dateTime={post.updatedAt}>{post.date}</time>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} aria-hidden />
          {post.readTime}
        </span>
      </div>
      <h3 className={`mt-4 font-bold leading-tight text-ink ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
        {post.title}
      </h3>
      <p className={`mt-3 flex-1 leading-7 text-muted ${featured ? "text-base" : "text-[0.9375rem]"}`}>{post.excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
        Yazıyı oku
        <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
