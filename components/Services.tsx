import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ContentIcon } from "@/lib/icon-map";
import type { HomeServicesContent } from "@/lib/cms-types";

export default function Services({ content }: { content: HomeServicesContent }) {
  return (
    <section className="section" aria-labelledby="hizmetler">
      <div className="container-x">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card) => (
            <li key={card.href} className="reveal">
              <Link
                href={card.href}
                className="card group flex h-full flex-col p-6 transition-colors hover:border-accent"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <ContentIcon name={card.icon} size={20} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-7 text-muted">{card.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                  Detayları gör
                  <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
