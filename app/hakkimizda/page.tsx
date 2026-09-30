import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { getCmsData } from "@/lib/cms";
import { ContentIcon } from "@/lib/icon-map";
import { breadcrumbSchema, graph, orgId } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

const cms = getCmsData();

export const metadata: Metadata = buildPageMetadata(cms.site, cms.about.seo);

export default function About() {
  const about = cms.about;

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(cms.site, [{ name: "Hakkımızda", path: "/hakkimizda" }]),
          ...about.team.items.map((member) => ({
            "@type": "Person",
            name: member.name,
            jobTitle: member.role,
            description: member.bio,
            worksFor: { "@id": orgId(cms.site) },
            ...(member.photo ? { image: `${cms.site.siteUrl}${member.photo}` } : {}),
            ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
          })),
        )}
      />
      <Header site={cms.site} header={cms.header} />
      <main id="icerik">
        <PageHero
          eyebrow={about.hero.eyebrow}
          title={about.hero.title}
          description={about.hero.description}
          crumbs={[{ name: "Hakkımızda" }]}
          summary={about.summary}
        />

        <section className="section">
          <div className="container-x grid gap-6 md:grid-cols-2">
            {[about.mission, about.vision].map((block) => (
              <div key={block.title} className="card p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <ContentIcon name={block.icon} size={18} />
                  </span>
                  <h2 className="text-xl font-extrabold text-ink">{block.title}</h2>
                </div>
                <p className="mt-5 text-[1.0625rem] leading-8 text-ink-soft">{block.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-surface py-16 md:py-20">
          <div className="container-x">
            <SectionHeading eyebrow={about.values.eyebrow} title={about.values.title} />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.items.map((value) => (
                <li key={value.title} className="reveal rounded-[var(--radius-card)] border border-line bg-bg p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-accent shadow-card">
                    <ContentIcon name={value.icon} size={18} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-7 text-muted">{value.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container-x">
            <div className="rounded-[var(--radius-card)] bg-ink p-8 text-white md:p-12">
              <span className="eyebrow text-accent-soft">{about.parentBrand.eyebrow}</span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight">{about.parentBrand.title}</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">{about.parentBrand.body}</p>
              <a
                href={about.parentBrand.cta.href}
                rel="noopener"
                className="btn mt-6 border border-white/30 text-white hover:bg-white/10"
              >
                {about.parentBrand.cta.label}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </div>
        </section>


        {about.team.items.length > 0 ? (
          <section className="border-t border-line bg-surface py-16 md:py-20">
            <div className="container-x">
              <SectionHeading eyebrow={about.team.eyebrow} title={about.team.title} />
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {about.team.items.map((member) => (
                  <li key={member.name} className="card flex gap-4 p-6">
                    {member.photo ? (
                      // Küçük, tembel yüklenen sabit boyutlu fotoğraf; next/image Workers'ta optimize etmiyor.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.photo}
                        alt={member.name}
                        width={72}
                        height={72}
                        loading="lazy"
                        decoding="async"
                        className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-accent-soft text-2xl font-extrabold text-accent">
                        {member.name.charAt(0)}
                      </span>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-ink">{member.name}</h3>
                      <p className="text-sm font-semibold text-accent">{member.role}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{member.bio}</p>
                      {member.linkedin ? (
                        <a href={member.linkedin} rel="noopener" className="mt-2 inline-block text-sm font-bold text-ink hover:text-accent">
                          LinkedIn
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="border-t border-line bg-surface py-16">
          <div className="container-x text-center">
            <h2 className="text-3xl font-extrabold text-ink">{about.cta.title}</h2>
            <p className="mx-auto mt-3 max-w-lg text-lg leading-8 text-ink-soft">{about.cta.description}</p>
            <Link href={about.cta.button.href} className="btn btn-primary mt-7">
              {about.cta.button.label}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
