"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Zap, Star } from "lucide-react";
import HighlightedText from "@/components/HighlightedText";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";
import AnimatedCounter from "@/components/AnimatedCounter";
import type { HomeHeroContent } from "@/lib/cms-types";

export default function Hero({
  content,
}: {
  content: HomeHeroContent;
}) {
  return (
    <section className="section-shell relative overflow-hidden min-h-screen flex items-center px-4 pt-24 pb-16 md:pt-28 md:pb-20">
      {/* Background orbs */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[520px] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(250,193,1,0.35) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 w-[400px] h-[400px] opacity-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="content-grid container mx-auto w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ── LEFT: Copy ───────────────────────── */}
          <div className="relative max-w-2xl">
            {/* Badge */}
            <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
              <span className="section-label">{content.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1
              className="mt-6 text-5xl font-black leading-[0.96] tracking-tight md:text-6xl xl:text-7xl animate-fade-up"
              style={{ fontFamily: "var(--font-display), sans-serif", animationDelay: "80ms" }}
            >
              <HighlightedText
                text={content.title}
                highlight={content.titleHighlight}
              />
            </h1>

            {/* Subtext */}
            <p
              className="mt-6 max-w-xl text-base leading-7 text-white/55 md:text-lg animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              {content.description}
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              <Link href={content.primaryCta.href} className="btn-primary">
                {content.primaryCta.label}
                <ArrowRight size={16} />
              </Link>
              <Link href={content.secondaryCta.href} className="btn-ghost">
                {content.secondaryCta.label}
              </Link>
            </div>

            {/* Stat chips */}
            <div
              className="mt-10 grid grid-cols-3 gap-3 animate-fade-up"
              style={{ animationDelay: "320ms" }}
            >
              {content.metrics.map((m) => (
                <div
                  key={m.label}
                  className="glass-card rounded-2xl p-4 text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="text-2xl font-black text-gradient-gold"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    <AnimatedCounter value={m.value} duration={1800} />
                  </div>
                  <div className="mt-1 text-xs text-white/45 leading-5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Dashboard Card ─────────────── */}
          <div className="relative animate-float">
            {/* Floating accent badge */}
            <div
              className="absolute -top-5 -left-5 z-10 flex items-center gap-2 glass-card-gold rounded-full px-4 py-2.5 animate-scale-in"
              style={{ animationDelay: "500ms" }}
            >
              <Star size={12} className="text-primary fill-primary" />
              <span className="text-xs font-semibold text-primary">{content.ratingBadge}</span>
            </div>

            {/* Floating trend badge */}
            <div
              className="absolute -bottom-4 -right-3 z-10 flex items-center gap-2 glass-card rounded-full px-4 py-2.5 animate-scale-in"
              style={{ animationDelay: "600ms" }}
            >
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-white/80">{content.trendBadge}</span>
            </div>

            {/* Main card */}
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl animate-scale-in"
              style={{
                background: "linear-gradient(145deg, rgba(16,16,16,0.95), rgba(0,0,0,0.98))",
                animationDelay: "400ms",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary/75">
                    {content.panelEyebrow}
                  </p>
                  <h2 className="mt-1.5 text-lg font-semibold">{content.panelTitle}</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5">
                  <Zap size={11} className="text-primary" />
                  <span className="text-xs font-semibold text-primary">{content.panelStatus}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* ROAS bar */}
                <div className="rounded-2xl border border-emerald-400/18 bg-emerald-400/8 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-emerald-300/80">{content.goalLabel}</p>
                    <p className="text-sm font-bold text-emerald-300">{content.goalValue}</p>
                  </div>
                  <AnimatedProgressBar progress={content.goalProgress} />
                  <p className="mt-2 text-xs text-emerald-400/60">{content.goalProgressText}</p>
                </div>

                {/* Two mini cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card rounded-2xl p-4">
                    <p className="text-xs text-white/40">{content.focusLabel}</p>
                    <p className="mt-2 text-base font-bold leading-tight whitespace-pre-line">
                      {content.focusValue}
                    </p>
                  </div>
                  <div className="glass-card rounded-2xl p-4">
                    <p className="text-xs text-white/40">{content.conversionLabel}</p>
                    <p className="mt-2 text-base font-bold leading-tight whitespace-pre-line">
                      {content.conversionValue}
                    </p>
                  </div>
                </div>

                {/* Service tags */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p className="text-xs text-white/40 mb-3">Aktif Servisler</p>
                  <div className="flex flex-wrap gap-2">
                    {content.activeServices.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
