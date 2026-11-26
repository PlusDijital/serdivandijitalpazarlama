import { MapPin, Search, Sparkles, TrendingUp } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import type { BrandIconKey } from "@/lib/brand-icons";

const CHANNELS: BrandIconKey[] = ["googleads", "meta", "instagram", "googlemaps"];

/**
 * Hero sağ paneli: saf HTML/CSS, görsel dosyası yok. Dekoratif (aria-hidden).
 * Rakam yok; arama sonucu, yapay zeka özeti ve rapor yalnızca "örnek" arayüz göstergeleridir.
 */
export default function HeroVisual() {
  return (
    <div aria-hidden className="hero-in relative mx-auto w-full max-w-md select-none">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-soft via-surface to-surface-soft" />
      <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full border border-dashed border-accent/30" />

      <div className="card overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search size={18} className="text-muted" />
          <span className="text-[0.9375rem] font-semibold text-ink">serdivan reklam ajansı</span>
          <span className="ml-auto h-4 w-px animate-pulse bg-accent" />
        </div>

        <div className="space-y-3 p-5">
          <div className="rounded-xl border border-accent/30 bg-accent-soft/50 p-4">
            <p className="text-xs font-semibold text-accent">serdivanreklamajansi.com</p>
            <p className="mt-1 font-bold text-ink">Serdivan Reklam Ajansı | Google Ads, SEO</p>
            <p className="mt-1.5 text-xs leading-5 text-muted">Google Ads · Instagram reklamı · Yerel SEO · Web tasarım</p>
          </div>

          <div className="rounded-xl border border-line bg-bg p-4">
            <p className="flex items-center gap-1.5 text-xs font-bold text-ink-soft">
              <Sparkles size={13} className="text-accent" />
              Yapay zeka özeti
            </p>
            <div className="mt-3 h-2.5 w-11/12 rounded-full bg-line" />
            <div className="mt-2 h-2.5 w-8/12 rounded-full bg-line" />
            <div className="mt-3 flex gap-1.5">
              <span className="h-5 w-16 rounded-full bg-accent-soft" />
              <span className="h-5 w-12 rounded-full bg-surface-soft" />
            </div>
          </div>

          <div className="rounded-xl border border-line p-4">
            <div className="h-2.5 w-24 rounded-full bg-line" />
            <div className="mt-2.5 h-3 w-7/12 rounded-full bg-surface-soft" />
          </div>
        </div>
      </div>

      <div className="float-slow card absolute -bottom-8 -left-6 hidden w-48 p-4 sm:block">
        <div className="flex items-center gap-2 text-xs font-bold text-muted">
          <TrendingUp size={14} className="text-accent" />
          Örnek aylık rapor
        </div>
        <div className="mt-3 flex h-14 items-end gap-1.5">
          {[35, 50, 42, 64, 58, 82].map((h, i) => (
            <span
              key={i}
              className={`bar-grow flex-1 rounded-sm ${i === 5 ? "bg-accent" : "bg-ink/15"}`}
              style={{ height: `${h}%`, animationDelay: `${0.35 + i * 0.08}s` }}
            />
          ))}
        </div>
      </div>

      <div className="float-slower card absolute -right-8 top-1/2 hidden flex-col gap-2.5 p-3 sm:flex">
        {CHANNELS.map((key) => (
          <span key={key} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg">
            <BrandIcon name={key} size={20} />
          </span>
        ))}
      </div>

      <div className="card absolute -right-4 -top-5 hidden items-center gap-2 px-3.5 py-2.5 sm:flex">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <MapPin size={16} className="text-accent" />
        <span className="text-xs font-bold text-ink">Serdivan · Sakarya</span>
      </div>
    </div>
  );
}
