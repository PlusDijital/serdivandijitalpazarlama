"use client";

import { ContentIcon } from "@/lib/icon-map";
import ScrollReveal from "@/components/ScrollReveal";
import type { HomeProcessContent } from "@/lib/cms-types";

export default function Process({
  content,
}: {
  content: HomeProcessContent;
}) {
  return (
    <section className="section-shell px-4 py-20 md:py-28">
      <div className="container mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-14 text-center">
            <span className="section-label">{content.eyebrow}</span>
            <h2
              className="mt-5 text-4xl font-black tracking-tight md:text-5xl leading-[0.97]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {content.title}
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-base leading-7 text-white/45">
              {content.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Steps — desktop: horizontal, mobile: vertical */}
        <div className="relative">

          {/* Connecting line — desktop only */}
          <div
            className="hidden xl:block absolute top-[2.6rem] left-[12%] right-[12%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(250,193,1,0.22) 20%, rgba(250,193,1,0.22) 80%, transparent)",
            }}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {content.steps.map((step, i) => {
              return (
                <ScrollReveal key={step.num} delay={i * 150}>
                  <div className="group relative flex flex-col items-center text-center xl:items-center">

                    {/* Circle */}
                    <div
                      className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 transition-all duration-400 group-hover:border-primary group-hover:glow-gold-sm"
                      style={{ background: "rgba(250,193,1,0.06)" }}
                    >
                      <ContentIcon name={step.icon} size={28} className="text-primary" />
                      <span
                        className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-black"
                        style={{ background: "#FAC101" }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    {/* Card */}
                    <div
                      className="mt-6 w-full rounded-2xl border border-white/8 p-6 glass-card hover:border-primary/25 transition-all duration-300 hover:-translate-y-1"
                    >
                      <h3
                        className="text-base font-bold mb-3"
                        style={{ fontFamily: "var(--font-display), sans-serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm leading-6.5 text-white/45 mb-4">
                        {step.description}
                      </p>
                      <div className="rounded-full border border-white/8 bg-white/3 px-3 py-1.5 inline-flex">
                        <span className="text-xs font-semibold text-white/30 tracking-wide">
                          {step.detail}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
