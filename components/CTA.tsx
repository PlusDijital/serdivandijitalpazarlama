import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeCtaContent } from "@/lib/cms-types";

export default function CTA({ content }: { content: HomeCtaContent }) {
  return (
    <section className="section" aria-labelledby="cta">
      <div className="container-x">
        <div className="cta-panel relative flex flex-col items-start gap-6 overflow-hidden rounded-[1.25rem] p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent-soft">{content.eyebrow}</span>
            <h2 id="cta" className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/80">{content.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {content.trustChips.map((chip) => (
                <li key={chip} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:flex-col">
            <Link href={content.primaryCta.href} className="btn btn-accent">
              {content.primaryCta.label}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href={content.secondaryCta.href} className="btn border border-white/30 text-white hover:bg-white/10">
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
