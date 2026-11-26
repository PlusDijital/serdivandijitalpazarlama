import Summary from "@/components/Summary";

/**
 * "Kısaca" özeti + künye. Künye bir tanım listesidir (dl): arama motorları ve yapay zeka
 * asistanları "hizmet bölgesi neresi, çalışma saatleri ne" gibi sorulara buradan doğrudan cevap alır.
 */
export default function QuickFacts({
  summary,
  facts,
}: {
  summary: string;
  facts: { label: string; value: string }[];
}) {
  return (
    <section className="container-x py-10 md:py-14" aria-label="Özet ve künye">
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <Summary text={summary} />
        <div className="card p-6 md:p-7">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Künye</h2>
          <dl className="mt-3 divide-y divide-line">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[6.75rem_1fr] gap-3 sm:grid-cols-[8.5rem_1fr] py-2.5 text-[0.9375rem] leading-6">
                <dt className="font-semibold text-muted">{fact.label}</dt>
                <dd className="font-semibold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
