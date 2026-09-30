import { Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { HomeCaseStudiesContent } from "@/lib/cms-types";

/** Vaka çalışmaları: yalnızca gerçek, izinli örnekler girildiğinde görünür (items boşsa hiç render edilmez). */
export default function CaseStudies({ content }: { content: HomeCaseStudiesContent }) {
  if (content.items.length === 0) return null;

  return (
    <section className="section" aria-labelledby="vakalar">
      <div className="container-x">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.items.map((item) => (
            <li key={item.client} className="card reveal flex flex-col p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">{item.sector}</span>
                <span className="text-muted">{item.area}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink">{item.client}</h3>
              <dl className="mt-4 space-y-3 text-[0.9375rem] leading-7">
                <div>
                  <dt className="font-bold text-ink">Durum</dt>
                  <dd className="text-muted">{item.challenge}</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Yaptığımız</dt>
                  <dd className="text-muted">{item.work}</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">Sonuç</dt>
                  <dd className="font-semibold text-accent">{item.result}</dd>
                </div>
              </dl>
              {item.quote ? (
                <blockquote className="mt-5 border-t border-line pt-5">
                  <Quote size={18} aria-hidden className="text-accent" />
                  <p className="mt-2 text-[0.9375rem] italic leading-7 text-ink-soft">{item.quote}</p>
                  {item.quoteAuthor ? (
                    <footer className="mt-2 text-sm font-bold text-ink">{item.quoteAuthor}</footer>
                  ) : null}
                </blockquote>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
