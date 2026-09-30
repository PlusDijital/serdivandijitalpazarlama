import SectionHeading from "@/components/SectionHeading";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeSectorsContent } from "@/lib/cms-types";

export default function Sectors({ content }: { content: HomeSectorsContent }) {
  return (
    <section className="section border-y border-line bg-surface" aria-labelledby="sektorler">
      <div className="container-x">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <li key={item.title} className="reveal flex gap-4 rounded-[var(--radius-card)] border border-line bg-bg p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent shadow-card">
                <ContentIcon name={item.icon} size={18} />
              </span>
              <div>
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
