import SectionHeading from "@/components/SectionHeading";
import type { Faq as FaqItem } from "@/lib/cms-types";

/** Açılır SSS: <details> ile, JavaScript yok. Metin DOM'da her zaman mevcut (SEO/GEO). */
export default function Faq({
  eyebrow,
  title,
  items,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  items: FaqItem[];
  compact?: boolean;
}) {
  return (
    <section className={compact ? "" : "section"} aria-labelledby="sss">
      <div className={compact ? "" : "container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"}>
        {compact ? (
          <h2 id="sss" className="text-2xl font-extrabold text-ink">
            {title}
          </h2>
        ) : (
          <SectionHeading eyebrow={eyebrow} title={title} />
        )}
        <div className={`divide-y divide-line rounded-[var(--radius-card)] border border-line bg-surface ${compact ? "mt-6" : ""}`}>
          {items.map((item, index) => (
            <details key={item.question} className="group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-lg leading-none text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-[0.9375rem] leading-7 text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
