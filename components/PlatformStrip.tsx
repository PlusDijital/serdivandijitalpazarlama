const PLATFORMS = [
  "Google Ads",
  "Meta Ads",
  "Google İşletme Profili",
  "Google Analytics 4",
  "Search Console",
  "TikTok Ads",
];

/** Çalışılan platformlar: metin tabanlı, logo görseli yok (hız + marka kuralları). */
export default function PlatformStrip() {
  return (
    <section aria-label="Çalıştığımız platformlar" className="border-b border-line bg-surface">
      <div className="container-x flex flex-col items-center gap-4 py-7 lg:flex-row lg:justify-between">
        <p className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-muted">Çalıştığımız platformlar</p>
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 lg:flex-nowrap">
          {PLATFORMS.map((name) => (
            <li key={name} className="whitespace-nowrap text-[0.9375rem] font-bold text-ink-soft">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
