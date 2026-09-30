import { BRAND_ICONS, type BrandIconKey } from "@/lib/brand-icons";

/**
 * Logo yollarını sayfada bir kez tanımlar; BrandIcon bunlara <use> ile başvurur.
 * Böylece aynı logo birden çok yerde kullanılsa da SVG verisi HTML'de tekrarlanmaz.
 */
export default function BrandSprite() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute" }}>
      {(Object.keys(BRAND_ICONS) as BrandIconKey[]).map((key) => (
        <symbol key={key} id={`bi-${key}`} viewBox="0 0 24 24">
          <path d={BRAND_ICONS[key].path} />
        </symbol>
      ))}
    </svg>
  );
}
