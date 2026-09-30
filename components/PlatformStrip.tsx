import BrandIcon from "@/components/BrandIcon";
import type { BrandIconKey } from "@/lib/brand-icons";

const PLATFORMS: { key: BrandIconKey; label: string }[] = [
  { key: "googleads", label: "Google Ads" },
  { key: "meta", label: "Meta Ads" },
  { key: "instagram", label: "Instagram" },
  { key: "googlemaps", label: "İşletme Profili" },
  { key: "googleanalytics", label: "Analytics 4" },
  { key: "googlesearchconsole", label: "Search Console" },
  { key: "tiktok", label: "TikTok Ads" },
  { key: "youtube", label: "YouTube Ads" },
];

/** Çalışılan platformlar: satır içi SVG logolar (ek istek ve JS yok). */
export default function PlatformStrip() {
  return (
    <section aria-labelledby="platformlar" className="border-b border-line bg-surface">
      <div className="container-x py-10">
        <h2 id="platformlar" className="text-center text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Çalıştığımız platformlar
        </h2>
        <ul className="mt-6 grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-8">
          {PLATFORMS.map((p) => (
            <li
              key={p.key}
              className="platform-chip group flex flex-col items-center justify-center gap-2 rounded-xl border border-line bg-bg px-1.5 py-3 text-center sm:px-3 sm:py-4"
            >
              <BrandIcon
                name={p.key}
                size={26}
                className="grayscale-[35%] transition duration-200 group-hover:scale-110 group-hover:grayscale-0"
              />
              <span className="text-[0.6875rem] font-bold leading-tight text-ink-soft sm:text-[0.8125rem]">{p.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
