import Breadcrumbs from "@/components/Breadcrumbs";
import Summary from "@/components/Summary";

export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  summary,
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { name: string; path?: string }[];
  summary?: string;
  /** Geniş ekranda başlığın sağında duran kutu (ör. hizmet sayfasında hızlı bilgi + iletişim). */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero-bg border-b border-line">
      <div className="container-x py-12 md:py-16">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <div className={aside ? "grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:gap-14" : ""}>
          <div>
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
          {aside}
        </div>
      </div>
    </section>
  );
}
