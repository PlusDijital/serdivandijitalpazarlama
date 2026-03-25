"use client";

import HighlightedText from "@/components/HighlightedText";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import type { HomeResultsContent } from "@/lib/cms-types";

export default function Results({
  content,
}: {
  content: HomeResultsContent;
}) {
  return (
    <section className="section-shell px-4 py-20 md:py-28">
      <div className="container mx-auto">

        {/* Heading */}
        <ScrollReveal>
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="section-label">{content.eyebrow}</span>
              <h2
                className="mt-5 text-4xl font-black tracking-tight md:text-5xl leading-[0.97]"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                <HighlightedText
                  text={content.title}
                  highlight={content.titleHighlight}
                />
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-white/45">
              {content.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {/* Big card — wide */}
          <ScrollReveal direction="scale" className="xl:col-span-2">
            <div
              className="relative overflow-hidden rounded-3xl border border-primary/18 p-8 md:p-10 noise hover:border-primary/35 transition-all duration-400 animate-pulse-gold h-full"
              style={{ background: "linear-gradient(145deg, rgba(250,193,1,0.07) 0%, rgba(0,0,0,0.5) 100%)" }}
            >
              <div
                className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, #FAC101, transparent 70%)" }}
              />
              <p className="text-sm font-semibold text-white/40">{content.stats[0]?.label}</p>
              <div className="mt-4 flex items-end gap-2">
                <span
                  className="text-7xl font-black leading-none text-gradient-gold"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  <AnimatedCounter value={content.stats[0]?.value ?? "0"} duration={2200} />
                </span>
                {content.stats[0]?.unit ? (
                  <span className="mb-2 text-2xl font-bold text-primary/60">
                    {content.stats[0].unit}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-white/35">{content.stats[0]?.sub}</p>

              {/* Mini chart bars */}
              <div className="mt-8 flex items-end gap-1.5 h-14">
                {content.chartBars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: i === 9
                        ? "#FAC101"
                        : `rgba(250,193,1,${0.12 + i * 0.025})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Medium cards */}
          {content.stats.slice(1).map((stat, i) => (
            <ScrollReveal key={stat.label} delay={200 + i * 120}>
              <div
                className="relative overflow-hidden rounded-3xl border border-white/8 p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 glass-card group h-full"
              >
                <div
                  className="pointer-events-none absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, #FAC101, transparent 70%)" }}
                />
                <p className="text-xs font-semibold text-white/35">{stat.label}</p>
                <div
                  className="mt-5 text-6xl font-black leading-none text-gradient-gold"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  <AnimatedCounter value={stat.value} duration={2000} />
                </div>
                <p className="mt-4 text-xs text-white/30">{stat.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
