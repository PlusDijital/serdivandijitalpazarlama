import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import { getCmsData } from "@/lib/cms";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

const cms = getCmsData();

export const metadata: Metadata = buildPageMetadata(cms.site, cms.blogIndex.seo);

export default function Blog() {
  const [featured, ...rest] = cms.blogPosts;

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(cms.site, [{ name: "Blog", path: "/blog" }]))} />
      <Header site={cms.site} header={cms.header} />
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
                <p className="eyebrow mb-4">{cms.blogIndex.featuredLabel}</p>
                <PostCard post={featured} featured />
              </div>
            ) : null}
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
