// SEO ajanının yazısını (content/ajan/<slug>.json) yayın öncesi denetler. Sorun varsa 1 ile çıkar.
//   node scripts/ajan-kontrol.mjs content/ajan/<slug>.json [--json]
import { readFileSync, readdirSync } from "node:fs";
import { basename } from "node:path";

const [dosya, bicim] = process.argv.slice(2);
const hatalar = [];
const uyarilar = [];
const hata = (m) => hatalar.push(m);

let y;
try {
  y = JSON.parse(readFileSync(dosya, "utf8"));
} catch (e) {
  console.log(`HATA: JSON okunamadı: ${e.message}`);
  process.exit(1);
}

// Sitedeki mevcut yazı ve hizmet bilgileri (TS içerik dosyalarından)
const tsMetin = readdirSync("content").filter((d) => d.endsWith(".ts")).map((d) => readFileSync(`content/${d}`, "utf8"));
const blogTs = tsMetin.filter((m) => m.includes("BlogPost")).join("\n");
const hizmetTs = tsMetin.filter((m) => !m.includes("BlogPost")).join("\n");
const tsSluglar = [...blogTs.matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
const hizmetSluglar = [...hizmetTs.matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
const kategoriler = new Set([...blogTs.matchAll(/^\s{4}category: "([^"]+)"/gm)].map((m) => m[1]));
const ajanSluglar = readdirSync("content/ajan").filter((d) => d.endsWith(".json") && d !== basename(dosya))
  .map((d) => JSON.parse(readFileSync(`content/ajan/${d}`, "utf8")).slug);

const zorunlu = ["slug", "title", "metaTitle", "metaDescription", "excerpt", "date", "readTime", "category", "intro",
  "primaryKeyword", "secondaryKeywords", "relatedServiceSlug", "sections", "summary", "faq", "publishedAt", "updatedAt", "authorName"];
for (const a of zorunlu) if (y[a] === undefined || y[a] === "" || (Array.isArray(y[a]) && !y[a].length)) hata(`${a} eksik`);
if (y.coverImage === undefined) hata("coverImage alanı olmalı (boş metin olabilir)");

if (!/^[a-z0-9]+(-[a-z0-9]+){1,7}$/.test(y.slug ?? "")) hata("slug küçük harf, Türkçe karaktersiz, tireli 2-8 kelime olmalı");
if (`${y.slug}.json` !== basename(dosya)) hata("slug dosya adıyla aynı olmalı");
if (tsSluglar.includes(y.slug) || ajanSluglar.includes(y.slug)) hata(`slug sitede zaten var: ${y.slug}`);
if ((y.metaTitle ?? "").length > 60) hata(`metaTitle 60 karakterden uzun (${y.metaTitle.length})`);
const md = (y.metaDescription ?? "").length;
if (md < 120 || md > 160) hata(`metaDescription 120-160 karakter olmalı (${md})`);
if (!hizmetSluglar.includes(y.relatedServiceSlug)) hata(`relatedServiceSlug sitede yok: ${y.relatedServiceSlug}`);
if (kategoriler.size && !kategoriler.has(y.category)) uyarilar.push(`yeni kategori: ${y.category} (mevcut: ${[...kategoriler].join(", ")})`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(y.publishedAt ?? "") || !/^\d{4}-\d{2}-\d{2}$/.test(y.updatedAt ?? "")) hata("publishedAt/updatedAt YYYY-AA-GG olmalı");
if (!/^\d{1,2} (Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık) \d{4}$/.test(y.date ?? "")) hata("date '24 Ekim 2026' biçiminde olmalı");
if (y.authorName !== "Serdivan Reklam Ajansı Ekibi") hata("authorName 'Serdivan Reklam Ajansı Ekibi' olmalı");

const bolumler = Array.isArray(y.sections) ? y.sections : [];
if (bolumler.length < 5 || bolumler.length > 10) hata(`5-10 bölüm olmalı (${bolumler.length})`);
for (const [i, b] of bolumler.entries()) if (!b.heading || !b.body) hata(`${i + 1}. bölümde heading/body eksik`);
const sss = Array.isArray(y.faq) ? y.faq : [];
if (sss.length < 3 || sss.length > 6) hata(`SSS 3-6 soru olmalı (${sss.length})`);
for (const [i, f] of sss.entries()) if (!f.question || !f.answer) hata(`${i + 1}. SSS'de question/answer eksik`);

const govde = [y.intro, y.summary, ...bolumler.flatMap((b) => [b.heading, b.body]), ...sss.flatMap((f) => [f.question, f.answer])].join("\n");
const kelime = govde.split(/\s+/).filter(Boolean).length;
if (kelime < 900 || kelime > 2400) hata(`uzunluk 900-2400 kelime olmalı (${kelime})`);
const ozetK = (y.summary ?? "").split(/\s+/).filter(Boolean).length;
if (ozetK < 30 || ozetK > 80) uyarilar.push(`summary 30-80 kelime önerilir (${ozetK})`);

// Metin düz yazı olarak basılır: link, HTML, markdown başlığı olmamalı
if (/https?:\/\/|\]\(|<[a-z/]|^#{1,6} /im.test(govde)) hata("metinde link, HTML ya da # başlık var (bu sitede düz metin kullanılır)");
const yasak = [/garanti(li|si|) (ediyor|veriyor|ederiz|veririz)/i, /birinci sıra/i, /1\. sıra/i, /%\s?100/, /en iyi ajans/i, /kesin sonuç/i];
// Olumsuz kullanım serbest ("kimse 1. sıra garantisi veremez", "garanti veren ajanslardan uzak durun")
const olumsuz = /değil|veremez|vermez|edemez|etmez|olamaz|yoktur|kimse|hiçbir|uzak dur|dikkat|şüphe|vaat eden|veren ajans|uyarı/i;
for (const cumle of govde.split(/(?<=[.!?])\s+|\n+/)) {
  for (const d of yasak) if (d.test(cumle) && !olumsuz.test(cumle)) hata(`abartılı vaat: "${cumle.trim().slice(0, 100)}"`);
}
const anahtar = (y.primaryKeyword ?? "").toLocaleLowerCase("tr");
if (anahtar) {
  const say = govde.toLocaleLowerCase("tr").split(anahtar).length - 1;
  if (say / (kelime / 100) > 2.5) hata(`anahtar kelime doldurma: "${anahtar}" ${say} kez`);
  if (say === 0) uyarilar.push("ana anahtar kelime metinde hiç geçmiyor");
}

if (bicim === "--json") {
  console.log(JSON.stringify({ dosya, kelime, hatalar, uyarilar }, null, 1));
} else {
  for (const h of hatalar) console.log(`HATA: ${h}`);
  for (const u of uyarilar) console.log(`UYARI: ${u}`);
  console.log(hatalar.length ? `❌ ${hatalar.length} hata` : `✅ ${kelime} kelime, kontroller temiz`);
}
process.exit(hatalar.length ? 1 : 0);
