import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedText from "@/components/HighlightedText";
import { getCmsData } from "@/lib/cms";
import { ContentIcon } from "@/lib/icon-map";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  return buildPageMetadata(cms.site, cms.about.seo);
}

export default async function About() {
  const cms = await getCmsData();
  const about = cms.about;

  return (
    <>
      <Header site={cms.site} header={cms.header} />
      <main className="pt-20">
        <section className="section-shell relative overflow-hidden px-4 py-20 md:py-28">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[400px] opacity-15"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250,193,1,0.4) 0%, transparent 65%)",
            }}
          />
          <div className="container mx-auto max-w-4xl text-center relative">
            <span className="section-label">{about.hero.eyebrow}</span>
            <h1
              className="mt-6 text-5xl font-black tracking-tight md:text-6xl xl:text-7xl leading-[0.96]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              <HighlightedText
                text={about.hero.title}
                highlight={about.hero.titleHighlight}
              />
            </h1>
            <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-7">
              {about.hero.description}
            </p>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {about.stats.map((item) => (
                <div
                  key={item.label}
                  className="glass-card rounded-3xl p-8 text-center hover:border-primary/30 transition-all duration-300"
                >
                  <div
                    className="text-5xl font-black text-gradient-gold"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {item.value}
                  </div>
                  <div className="mt-2 text-sm text-white/40">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 border-t border-white/6">
          <div className="container mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass-card rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center">
                    <ContentIcon
                      name={about.mission.icon}
                      size={16}
                      className="text-primary"
                    />
                  </div>
                  <h2
                    className="text-xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {about.mission.title}
                  </h2>
                </div>
                <p className="text-base leading-7 text-white/55">{about.mission.body}</p>
              </div>
              <div className="glass-card rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center">
                    <ContentIcon
                      name={about.vision.icon}
                      size={16}
                      className="text-primary"
                    />
                  </div>
                  <h2
                    className="text-xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {about.vision.title}
                  </h2>
                </div>
                <p className="text-base leading-7 text-white/55">{about.vision.body}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 border-t border-white/6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="section-label">{about.values.eyebrow}</span>
              <h2
                className="mt-5 text-4xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                <HighlightedText
                  text={about.values.title}
                  highlight={about.values.titleHighlight}
                />
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {about.values.items.map((value) => (
                <div
                  key={value.title}
                  className="glass-card rounded-3xl p-7 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-10 w-10 rounded-xl border border-primary/20 bg-primary/8 flex items-center justify-center mb-5">
                    <ContentIcon name={value.icon} size={18} className="text-primary" />
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm leading-6.5 text-white/45">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 border-t border-white/6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="section-label">{about.team.eyebrow}</span>
              <h2
                className="mt-5 text-4xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                <HighlightedText
                  text={about.team.title}
                  highlight={about.team.titleHighlight}
                />
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {about.team.items.map((member) => (
                <div
                  key={member.name}
                  className="glass-card rounded-3xl p-8 text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-20 w-20 rounded-full border-2 border-primary/25 mx-auto mb-5 object-cover group-hover:border-primary/50 transition-colors duration-300"
                  />
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mt-1 mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm leading-6 text-white/45">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 border-t border-white/6">
          <div className="container mx-auto text-center">
            <h2
              className="text-3xl font-black mb-4"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {about.cta.title}
            </h2>
            <p className="text-white/45 mb-8 max-w-lg mx-auto">
              {about.cta.description}
            </p>
            <Link href={about.cta.button.href} className="btn-primary">
              {about.cta.button.label}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
