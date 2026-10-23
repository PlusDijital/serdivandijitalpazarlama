# Serdivan Reklam Ajansı — SEO ajanı yazım rehberi

SEO-GEO ajanı (PlusDijital/seo-geo-ajani) bu siteye yazarken bu dosyaya uyar. Ortak kurallar o repodaki `ortak/kurallar.md` dosyasındadır; bu dosya daha katıysa bu dosya geçerlidir.

## Biz kimiz (yazıda kullanılabilecek doğru bilgiler)
- Serdivan Reklam Ajansı, Sakarya merkezli Google Partner ajans **Plus Dijital**'in Serdivan ilçesine odaklanan yerel markasıdır.
- Kafe, restoran, klinik, emlak, eğitim ve hizmet işletmeleri için Google Ads, Instagram/Facebook reklamları, yerel SEO, sosyal medya, web tasarım ve GEO (yapay zekâ aramalarında görünürlük) hizmeti verir. **Tabela veya baskı işi yapmaz.**
- Çalışma ilkeleri: medya bütçesi ile hizmet bedeli ayrı yazılır; reklam hesabı işletmenin adına açılır.
- Telefon 0531 633 95 96, e-posta info@serdivanreklamajansi.com. Fiyat yazılmaz; site fiyat yerine teklif ister.
- Bunların dışında ajans hakkında bilgi gerekiyorsa yalnızca `lib/cms-defaults.ts` ve `content/` içinde yazanları kullan. **Repoda olmayan bilgiyi ajans hakkında yazma.**

## Okur ve açı
- Okur: Serdivan ve Sakarya'da küçük/orta işletme sahibi. Pratik, bütçe bilinçli, "benim işletmem için ne yapmalıyım" sorusunun cevabını arıyor.
- Bu sitenin açısı: **yerel ve pratik**. Kardeş sitelerimizle (plusdijital.com: kapsamlı rehber ve Türkiye geneli; sakaryaseoajansi.com: SEO uzmanlığı) aynı kelimeye yazılsa bile burada Serdivan/Sakarya'daki işletme türlerinden örnekler, karar listeleri, fiyat ve bütçe soruları öne çıkar.
- Örnek kişi adları açıkça örnek olmalı ("Serdivan'da bir kafe işleten Ayşe Hanım"). Gerçek müşteri, vaka, rakam uydurulmaz.

## Ses
- "Siz" diye hitap, ajans adına "biz". Sade, net Türkçe; kısa paragraflar (2-4 cümle).
- Her bölüm ilk cümlesinde sorunun cevabını verir; giriş lafı ve "günümüzde dijital dünya…" tarzı dolgu yok.
- Abartılı vaat yok (garanti, 1. sıra, %100, en iyi ajans, kesin sonuç). Olumsuz kullanım serbest ("kimse sıralama garantisi veremez").

## Biçim (zorunlu)
- Dosya: `content/ajan/<slug>.json`. Mevcut TypeScript yazılarına (`content/blog-*.ts`) ve hizmet dosyalarına dokunulmaz.
- Alanlar `lib/cms-types.ts` > `BlogPost` tipiyle birebir: `slug, title, metaTitle, metaDescription, excerpt, date, readTime, category, intro, primaryKeyword, secondaryKeywords, relatedServiceSlug, sections, summary, faq, coverImage, publishedAt, updatedAt, authorName`.
  - `date`: "24 Ekim 2026" biçimi; `publishedAt`/`updatedAt`: YYYY-AA-GG; `coverImage`: ""; `authorName`: "Serdivan Reklam Ajansı Ekibi".
  - `faq`: `[{"question": "...", "answer": "..."}]`, 3-6 soru, cevaplar 40-80 kelime ve kendi başına anlamlı.
  - `sections`: 5-10 bölüm, `{"heading": "...", "body": "..."}`. Başlıklar soru ya da net bilgi.
  - `summary`: 40-60 kelimelik "Kısaca" özeti (yapay zekâ cevap motorları bunu alıntılar).
  - `category`: mevcut kategorilerden biri: Ajans Seçimi, Dijital Strateji, Fiyatlar, Google Ads, Reklam, Sosyal Medya, Sosyal Medya Reklamları, Web Tasarım, Yapay Zeka ve Arama, Yerel SEO.
  - `relatedServiceSlug`: serdivan-web-tasarim, serdivan-google-ads-yonetimi, serdivan-instagram-reklam-yonetimi, serdivan-geo-yapay-zeka-arama-optimizasyonu, serdivan-dijital-pazarlama-ajansi, serdivan-seo-ajansi, serdivan-sosyal-medya-ajansi.
- **Metin düz yazıdır:** paragraflar `\n\n` ile ayrılır, madde listesi satırları `- `, numaralı liste `1. ` ile başlar. Metin içinde link, HTML, `#` başlık, kalın/italik işaret **kullanılmaz** (sayfa bunları göstermez). İç bağlantı `relatedServiceSlug` ile verilir.
- `metaTitle` ≤ 60 karakter, `metaDescription` 120-160 karakter. Uzunluk 900-2400 kelime.
- Kaynak gösterimi: platform kuralı ya da rakam yazılacaksa metin içinde kaynağın adı geçer ("Google Ads Yardım Merkezi'ne göre…"); doğrulanmamış bilgi yazılmaz.

## Güncelleme
Ajan yalnızca kendi yazdığı `content/ajan/*.json` dosyalarını güncelleyebilir: `slug` ve `publishedAt` değişmez, `updatedAt` ve `date` güncellenir.

## Yayın öncesi kontroller
- `node scripts/ajan-kontrol.mjs content/ajan/<slug>.json` → "kontroller temiz".
- `npm run build` hatasız (tip denetimi alan hatalarını yakalar).
