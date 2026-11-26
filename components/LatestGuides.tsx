import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import type { BlogPost, HomeGuidesContent } from "@/lib/cms-types";

/** Ana sayfada öne çıkan rehberler: en güncel yazılara doğrudan iç bağlantı. */
export default function LatestGuides({ content, posts }: { content: HomeGuidesContent; posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="section" aria-labelledby="rehberler">
      <div className="container-x">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="rehberler" eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <Link href={content.cta.href} className="btn btn-secondary shrink-0">
            {content.cta.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="reveal">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
