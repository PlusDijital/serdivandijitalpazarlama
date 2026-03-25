import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import HighlightedText from "@/components/HighlightedText";
import type { HomeCtaContent } from "@/lib/cms-types";

export default function CTA({
  content,
}: {
  content: HomeCtaContent;
}) {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="container mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-14 md:py-18 noise"
          style={{
            background:
              "linear-gradient(145deg, rgba(250,193,1,0.16) 0%, rgba(250,193,1,0.06) 40%, rgba(0,0,0,0.6) 100%)",
            border: "1px solid rgba(250,193,1,0.22)",
            boxShadow: "0 0 100px rgba(250,193,1,0.08), inset 0 1px 0 rgba(250,193,1,0.12)",
          }}
        >
          {/* BG orbs */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #FAC101, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 w-60 h-60 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #FAC101, transparent 70%)" }}
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left copy */}
            <div className="max-w-2xl">
              <span className="section-label">{content.eyebrow}</span>
              <h2
                className="mt-6 text-4xl font-black tracking-tight md:text-5xl xl:text-6xl leading-[0.96]"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                <HighlightedText
                  text={content.title}
                  highlight={content.titleHighlight}
                />
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                {content.description}
              </p>

              {/* Trust chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {content.trustChips.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60"
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 lg:shrink-0">
              <Link href={content.primaryCta.href} className="btn-primary justify-center">
                <Calendar size={16} />
                {content.primaryCta.label}
              </Link>
              <Link href={content.secondaryCta.href} className="btn-ghost justify-center">
                {content.secondaryCta.label}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
