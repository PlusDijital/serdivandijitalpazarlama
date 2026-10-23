// SEO ajanının eklediği yazıları (content/ajan/*.json) siteye bağlar.
// `npm run build` ve `npm run dev` bu betiği önce çalıştırır; content/ajan-index.ts dosyasını üretir.
// Ajan yalnızca content/ajan/ altına dosya ekler; üretilen dosya git'te değildir.
import { readdirSync, writeFileSync } from "node:fs";

const dosyalar = readdirSync("content/ajan").filter((d) => d.endsWith(".json")).sort();
const satirlar = [
  "// OTOMATİK ÜRETİLİR: scripts/ajan-indeks.mjs. Elle düzenleme.",
  'import type { BlogPost } from "@/lib/cms-types";',
  ...dosyalar.map((d, i) => `import y${i} from "./ajan/${d}";`),
  "",
  `export const ajanPosts: BlogPost[] = ([${dosyalar.map((_, i) => `y${i}`).join(", ")}] as BlogPost[])`,
  "  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));",
  "",
];
writeFileSync("content/ajan-index.ts", satirlar.join("\n"));
console.log(`ajan-indeks: ${dosyalar.length} yazı`);
