import Breadcrumbs from "@/components/Breadcrumbs";
import Summary from "@/components/Summary";

export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  summary,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { name: string; path?: string }[];
  summary?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-x py-12 md:py-16">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <div className="max-w-3xl">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">{title}</h1>
          {description ? <p className="mt-5 text-lg leading-8 text-ink-soft">{description}</p> : null}
          {children}
        </div>
        {summary ? (
          <div className="mt-8 max-w-3xl">
            <Summary text={summary} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
