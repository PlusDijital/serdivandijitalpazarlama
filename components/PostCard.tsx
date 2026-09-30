import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import PostCover from "@/components/PostCover";
import { coverTheme } from "@/lib/covers";
import type { BlogPost } from "@/lib/cms-types";

export default function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`card group flex h-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 ${
        featured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`overflow-hidden ${featured ? "md:flex md:w-1/2 md:items-center" : ""}`}
        style={{ backgroundColor: coverTheme(post.category).from }}
      >
        <PostCover
          category={post.category}
          id={`${post.slug}${featured ? "-f" : ""}`}
          className="transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "p-7 md:p-10" : "p-6"}`}>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
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
      </div>
    </Link>
  );
}
