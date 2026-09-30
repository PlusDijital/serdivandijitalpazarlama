import { BRAND_ICONS, type BrandIconKey } from "@/lib/brand-icons";

/**
 * Platform logosu, marka rengiyle. Şekil BrandSprite içindeki <symbol>'den gelir;
 * BrandSprite'ı kullanan sayfada bir kez render edin.
 */
export default function BrandIcon({
  name,
  size = 24,
  className = "",
  mono = false,
  title,
}: {
  name: BrandIconKey;
  size?: number;
  className?: string;
  mono?: boolean;
  /** Verilirse erişilebilir ad olarak okunur; verilmezse dekoratif sayılır. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={mono ? "currentColor" : BRAND_ICONS[name].hex}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href={`#bi-${name}`} />
    </svg>
  );
}
