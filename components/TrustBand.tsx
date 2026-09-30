import { Check, ArrowUpRight } from "lucide-react";
import type { HomeTrustContent } from "@/lib/cms-types";

export default function TrustBand({ content }: { content: HomeTrustContent }) {
  return (
    <section className="section bg-ink text-white" aria-labelledby="guven">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow text-accent-soft">{content.eyebrow}</span>
          <h2 id="guven" className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/80">{content.description}</p>
          <a
            href={content.cta.href}
            rel="noopener"
            className="btn mt-7 border border-white/30 text-white hover:bg-white/10"
          >
            {content.cta.label}
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.points.map((point) => (
            <li key={point} className="flex items-start gap-3 rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-4 text-[0.9375rem] font-semibold leading-6">
              <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-accent-soft" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
