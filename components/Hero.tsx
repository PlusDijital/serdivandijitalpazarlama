import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeHeroContent } from "@/lib/cms-types";

/** LCP öğesi metindir: görsel yok, animasyon yok. */
export default function Hero({ content }: { content: HomeHeroContent }) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-x py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">{content.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={content.primaryCta.href} className="btn btn-primary">
              {content.primaryCta.label}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href={content.secondaryCta.href} className="btn btn-secondary">
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {content.trustPoints.map((point) => (
            <li key={point.text} className="flex items-start gap-3 text-sm font-semibold text-ink-soft">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <ContentIcon name={point.icon} size={16} />
              </span>
              <span className="pt-1">{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
