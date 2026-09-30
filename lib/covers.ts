/** Blog kapakları için kategori → motif ve renk eşlemesi. Hem sayfa içi SVG hem OG görseli kullanır. */
export type CoverMotif = "ads" | "search" | "web" | "social";

export type CoverTheme = {
  motif: CoverMotif;
  from: string;
  to: string;
  accent: string;
  soft: string;
};

const THEMES: Record<CoverMotif, CoverTheme> = {
  ads: { motif: "ads", from: "#0b1b33", to: "#15325c", accent: "#34d3a8", soft: "#1f3f6b" },
  search: { motif: "search", from: "#0a3d33", to: "#0e7c66", accent: "#fcd34d", soft: "#12665a" },
  web: { motif: "web", from: "#1e1b4b", to: "#3730a3", accent: "#a5f3fc", soft: "#3f3a8a" },
  social: { motif: "social", from: "#3b0d2e", to: "#831843", accent: "#fbcfe8", soft: "#6b1d4d" },
};

const CATEGORY_MOTIF: Record<string, CoverMotif> = {
  "Ajans Seçimi": "ads",
  Fiyatlar: "ads",
  Reklam: "ads",
  "Google Ads": "ads",
  "Sosyal Medya Reklamları": "social",
  "Sosyal Medya": "social",
  "Dijital Strateji": "ads",
  "Web Tasarım": "web",
  "Yerel SEO": "search",
  "Yapay Zeka ve Arama": "search",
};

export function coverTheme(category: string): CoverTheme {
  return THEMES[CATEGORY_MOTIF[category] ?? "ads"];
}
