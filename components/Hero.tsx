import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeHeroContent } from "@/lib/cms-types";

/** LCP öğesi metindir; sağ panel saf HTML/CSS, görsel dosyası yok. */
export default function Hero({ content }: { content: HomeHeroContent }) {
  return (
    <section className="hero-bg relative overflow-hidden border-b border-line">
      <div className="container-x grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink-soft shadow-card">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {content.eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[4.25rem]">
            {content.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">{content.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={content.primaryCta.href} className="btn btn-primary px-7">
              {content.primaryCta.label}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href={content.secondaryCta.href} className="btn btn-secondary px-7">
              {content.secondaryCta.label}
            </Link>
          </div>

          <ul className="mt-10 grid gap-3 border-t border-line pt-8 sm:grid-cols-3">
            {content.trustPoints.map((point) => (
              <li key={point.text} className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-ink-soft">
                <ContentIcon name={point.icon} size={18} className="mt-0.5 shrink-0 text-accent" />
                {point.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
