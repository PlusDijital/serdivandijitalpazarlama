import type { HomePartnersContent } from "@/lib/cms-types";

export default function Partners({
  content,
}: {
  content: HomePartnersContent;
}) {
  return (
    <section className="py-14 border-y border-white/6 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-white/28">
          {content.eyebrow}
        </p>
      </div>

      <div className="marquee-wrapper relative">
        <div className="marquee-track animate-marquee" style={{ gap: "0px" }}>
          {content.partners.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-8 px-10"
              style={{ flexShrink: 0 }}
            >
              <span
                className="text-lg font-black text-white/20 hover:text-white/70 transition-colors duration-300 cursor-default select-none whitespace-nowrap"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {name}
              </span>
              <span className="w-1 h-1 rounded-full bg-primary/30 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
