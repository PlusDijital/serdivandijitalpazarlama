import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeSectorsContent } from "@/lib/cms-types";

export default function Sectors({ content }: { content: HomeSectorsContent }) {
  return (
    <section className="section border-y border-line bg-surface" aria-labelledby="sektorler">
      <div className="container-x">
        <SectionHeading id="sektorler" eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => {
            const body = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent shadow-card">
                  <ContentIcon name={item.icon} size={18} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 flex-1 text-sm leading-6 text-muted">{item.description}</p>
                  {item.href && item.linkLabel ? (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                      {item.linkLabel}
                      <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  ) : null}
                </div>
              </>
            );
            const cardClass = "flex h-full gap-4 rounded-[var(--radius-card)] border border-line bg-bg p-5";

            return (
              <li key={item.title} className="reveal">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`group ${cardClass} transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={cardClass}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
