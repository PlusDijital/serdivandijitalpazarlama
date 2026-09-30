import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { getCmsData } from "@/lib/cms";
import { ContentIcon } from "@/lib/icon-map";
import { breadcrumbSchema, graph, orgId } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

const cms = getCmsData();

export const metadata: Metadata = buildPageMetadata(cms.site, cms.contact.seo);

export default function ContactPage() {
  const content = cms.contact;
  const structuredData = graph(
    {
      "@type": "ContactPage",
      "@id": `${cms.site.siteUrl}/iletisim#contact`,
      url: `${cms.site.siteUrl}/iletisim`,
      name: content.seo.title,
      about: { "@id": orgId(cms.site) },
    },
    breadcrumbSchema(cms.site, [{ name: "İletişim", path: "/iletisim" }]),
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <Header site={cms.site} header={cms.header} />
      <main id="icerik">
        <PageHero
          eyebrow={content.hero.eyebrow}
          title={content.hero.title}
          description={content.hero.description}
          crumbs={[{ name: "İletişim" }]}
        />

        <section className="section">
          <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">{content.infoTitle}</h2>
              <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{content.infoDescription}</p>

              <ol className="mt-6 space-y-3">
                {content.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-ink">{step.title}</p>
                      <p className="text-sm leading-6 text-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <ul className="mt-8 space-y-3">
                {content.contactItems.map((item) => (
                  <li key={`${item.label}-${item.value}`} className="card flex items-center gap-4 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <ContentIcon name={item.icon} size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-muted">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-bold text-ink hover:text-accent">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-ink">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-[var(--radius-card)] border-l-4 border-accent bg-accent-soft/60 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{content.trustNote.eyebrow}</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{content.trustNote.body}</p>
              </div>
            </div>

            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-extrabold text-ink">{content.form.title}</h2>
              <ContactForm form={content.form} whatsapp={cms.site.business?.whatsapp} />
            </div>
          </div>
        </section>
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
