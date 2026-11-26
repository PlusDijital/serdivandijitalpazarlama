import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import { getCmsData } from "@/lib/cms";
import { breadcrumbSchema, graph, itemListSchema, webPageSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

const cms = getCmsData();

export const metadata: Metadata = buildPageMetadata(cms.site, cms.blogIndex.seo);

export default function Blog() {
  const [featured, ...rest] = cms.blogPosts;

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema(cms.site, {
            path: "/blog",
            name: cms.blogIndex.seo.title,
            description: cms.blogIndex.seo.description,
            type: "CollectionPage",
            dateModified: cms.blogPosts.map((post) => post.updatedAt).sort().at(-1),
          }),
          breadcrumbSchema(cms.site, [{ name: "Blog", path: "/blog" }]),
          itemListSchema(
            cms.site,
            "Serdivan Reklam Ajansı rehber yazıları",
            cms.blogPosts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })),
          ),
        )}
      />
      <Header site={cms.site} header={cms.header} current="/blog" />
      <main id="icerik">
        <PageHero
          eyebrow={cms.blogIndex.hero.eyebrow}
          title={cms.blogIndex.hero.title}
          description={cms.blogIndex.hero.description}
          crumbs={[{ name: "Blog" }]}
        />

        <section className="section">
          <div className="container-x">
            {featured ? (
              <div className="mb-6">
                <h2 className="eyebrow mb-4">{cms.blogIndex.featuredLabel}</h2>
                <PostCard post={featured} featured />
              </div>
            ) : null}
            <h2 className="sr-only">Tüm yazılar</h2>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug} className="reveal">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
