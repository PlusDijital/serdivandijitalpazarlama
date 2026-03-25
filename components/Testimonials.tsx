"use client";

import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { HomeTestimonialsContent } from "@/lib/cms-types";

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className="text-primary fill-primary" />
      ))}
    </div>
  );
}

export default function Testimonials({
  content,
}: {
  content: HomeTestimonialsContent;
}) {
  return (
    <section className="section-shell px-4 py-20 md:py-28">
      <div className="container mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="section-label">{content.eyebrow}</span>
            <h2
              className="mt-5 text-4xl font-black tracking-tight md:text-5xl leading-[0.97]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {content.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Featured testimonial */}
          <ScrollReveal direction="left">
          <div
            className="relative overflow-hidden rounded-3xl p-8 md:p-10 noise h-full"
            style={{
              background:
                "linear-gradient(145deg, rgba(250,193,1,0.08) 0%, rgba(16,16,16,0.95) 100%)",
              border: "1px solid rgba(250,193,1,0.18)",
              boxShadow: "0 0 60px rgba(250,193,1,0.06)",
            }}
          >
            {/* Quote icon */}
            <Quote
              size={40}
              className="text-primary/20 mb-6"
              style={{ fill: "rgba(250,193,1,0.08)" }}
            />

            {/* Stars */}
            <Stars />

            {/* Quote text */}
            <p
              className="mt-5 text-xl md:text-2xl font-semibold leading-[1.5] text-white/85"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              &ldquo;{content.featured.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <img
                src={content.featured.avatar}
                alt={content.featured.name}
                className="h-12 w-12 rounded-full border border-primary/25 object-cover"
              />
              <div>
                <p className="font-bold text-white">{content.featured.name}</p>
                <p className="text-sm text-white/45">
                  {content.featured.role} · {content.featured.company}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p
                  className="text-2xl font-black text-gradient-gold"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {content.featured.metric}
                </p>
                <p className="text-xs text-white/35">{content.featured.metricLabel}</p>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Supporting testimonials */}
          <div className="flex flex-col gap-4">
            {content.items.map((t) => (
              <div
                key={t.name}
                className="glass-card rounded-2xl p-6 hover:border-primary/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Stars />
                <p className="mt-3 text-sm leading-6.5 text-white/60">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-9 w-9 rounded-full border border-white/12 object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/35">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
