"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HighlightedText from "@/components/HighlightedText";
import ScrollReveal from "@/components/ScrollReveal";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeServicesContent } from "@/lib/cms-types";

export default function Services({
  content,
}: {
  content: HomeServicesContent;
}) {
  return (
    <section className="section-shell px-4 py-20 md:py-28">
      <div className="container mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.cards.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 120} className={service.span}>
            <Link
              href={service.href}
              className="group relative overflow-hidden rounded-3xl border border-white/8 p-8 transition-all duration-350 hover:-translate-y-1 hover:border-primary/35 glass-card block h-full"
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle, rgba(250,193,1,0.12), transparent 70%)",
                }}
              />

              <div className="relative">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/8">
                    <ContentIcon name={service.icon} size={18} className="text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-primary/18 bg-primary/7 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary/80">
                      {service.tag}
                    </span>
                    <span className="text-xs font-bold text-white/20">{service.num}</span>
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="mt-7 text-xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6.5 text-white/45">
                  {service.description}
                </p>

                {/* Divider + CTA */}
                <div className="mt-7 h-px w-full bg-white/7" />
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs font-semibold text-white/30">
                    {service.footerText}
                  </p>
                  <ArrowUpRight
                    size={16}
                    className="text-white/20 group-hover:text-primary transition-colors duration-300"
                  />
                </div>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
