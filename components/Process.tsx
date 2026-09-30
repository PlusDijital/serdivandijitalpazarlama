import SectionHeading from "@/components/SectionHeading";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeProcessContent } from "@/lib/cms-types";

export default function Process({ content }: { content: HomeProcessContent }) {
  return (
    <section className="section" aria-labelledby="surec">
      <div className="container-x">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <ol className="process-steps mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li key={step.title} className="card reveal relative p-6">
              <div className="flex items-center justify-between">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white ring-4 ring-surface">
                  <ContentIcon name={step.icon} size={20} />
                </span>
                <span className="text-sm font-extrabold text-accent">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-7 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
