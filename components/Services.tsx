import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import SectionHeading from "@/components/SectionHeading";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeServicesContent } from "@/lib/cms-types";

export default function Services({ content }: { content: HomeServicesContent }) {
  return (
    <section className="section" aria-labelledby="hizmetler">
      <div className="container-x">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card, index) => (
            <li
              key={card.href}
              className={`reveal ${index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""} ${
                index === content.cards.length - 1 && content.cards.length % 2 === 1 ? "sm:col-span-2" : ""
              }`}
            >
              <Link
                href={card.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border p-6 transition-all duration-200 hover:-translate-y-0.5 md:p-7 ${
                  index === 0
                    ? "border-ink bg-ink text-white shadow-card"
                    : "card-glow border-line bg-surface shadow-card hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      card.brand
                        ? index === 0
                          ? "bg-white"
                          : "border border-line bg-surface shadow-card"
                        : index === 0
                          ? "bg-white/10 text-accent-soft"
                          : "bg-accent-soft text-accent"
                    }`}
                  >
                    {card.brand ? <BrandIcon name={card.brand} size={24} /> : <ContentIcon name={card.icon} size={22} />}
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className={`transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      index === 0 ? "text-white/60" : "text-muted"
                    }`}
                  />
                </div>
                <h3 className={`mt-6 text-xl font-bold ${index === 0 ? "lg:text-2xl" : "text-ink"}`}>{card.title}</h3>
                <p className={`mt-2.5 flex-1 text-[0.9375rem] leading-7 ${index === 0 ? "text-white/80" : "text-muted"}`}>
                  {card.description}
                </p>
                {index === 0 ? (
                  <div className="mt-8 hidden rounded-xl border border-white/10 bg-white/5 p-4 lg:block">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-soft">En çok tercih edilen</p>
                    <p className="mt-2 text-sm leading-6 text-white/80">
                      Arama anında görünmek, {"Serdivan'daki hizmet işletmeleri için en hızlı müşteri kaynağı."}
                    </p>
                  </div>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
