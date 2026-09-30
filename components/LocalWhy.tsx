import SectionHeading from "@/components/SectionHeading";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeLocalContent } from "@/lib/cms-types";

export default function LocalWhy({ content }: { content: HomeLocalContent }) {
  return (
    <section className="section border-y border-line bg-surface" aria-labelledby="yerel">
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Hizmet verdiğimiz bölgeler">
            {content.areas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm font-semibold text-ink-soft"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
        <ul className="space-y-4">
          {content.points.map((point) => (
            <li key={point.title} className="card reveal flex gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <ContentIcon name={point.icon} size={20} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{point.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-7 text-muted">{point.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
