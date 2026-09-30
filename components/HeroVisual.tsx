import { MapPin, Search, Star, TrendingUp } from "lucide-react";

/**
 * Hero sağ paneli: saf HTML/CSS, görsel dosyası yok. Dekoratif (aria-hidden).
 * Rakamlar yok; yalnızca "örnek" arayüz göstergeleri.
 */
export default function HeroVisual() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-md select-none">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-soft via-surface to-surface-soft" />

      <div className="card overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search size={18} className="text-muted" />
          <span className="text-[0.9375rem] font-semibold text-ink">serdivan reklam ajansı</span>
        </div>

        <div className="space-y-3 p-5">
          <div className="rounded-xl border border-accent/30 bg-accent-soft/50 p-4">
            <p className="text-xs font-semibold text-accent">serdivanreklamajansi.com</p>
            <p className="mt-1 font-bold text-ink">Serdivan Reklam Ajansı | Google Ads, SEO</p>
            <div className="mt-2 flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
          </div>
          {[70, 55].map((w) => (
            <div key={w} className="rounded-xl border border-line p-4">
              <div className="h-2.5 w-24 rounded-full bg-line" />
              <div className="mt-2.5 h-3 rounded-full bg-surface-soft" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="card absolute -bottom-8 -left-6 hidden w-48 p-4 sm:block">
        <div className="flex items-center gap-2 text-xs font-bold text-muted">
          <TrendingUp size={14} className="text-accent" />
          Örnek aylık rapor
        </div>
        <div className="mt-3 flex h-14 items-end gap-1.5">
          {[35, 50, 42, 64, 58, 82].map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-sm ${i === 5 ? "bg-accent" : "bg-ink/15"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="card absolute -right-4 -top-5 hidden items-center gap-2 px-3.5 py-2.5 sm:flex">
        <MapPin size={16} className="text-accent" />
        <span className="text-xs font-bold text-ink">Serdivan · Sakarya</span>
      </div>
    </div>
  );
}
