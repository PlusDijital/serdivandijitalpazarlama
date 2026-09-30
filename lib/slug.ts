const TR: Record<string, string> = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u" };

/** Türkçe başlıktan çapa (anchor) kimliği üretir: "Neden yerel ajans?" → "neden-yerel-ajans" */
export function slugify(text: string) {
  return text
    .replace(/[çğıİöşü]/gi, (ch) => TR[ch] ?? TR[ch.toLowerCase()] ?? ch)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
