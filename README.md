# Serdivan Reklam Ajansı — serdivanreklamajansi.com

Plus Dijital'in Serdivan'a odaklanan yerel marka sitesi. Next.js 16 (App Router) + Tailwind v4, Cloudflare Workers üzerinde OpenNext adaptörüyle çalışır. İçerik koddan gelir; admin paneli yoktur.

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu (http://localhost:3010) |
| `npm run build` | Next üretim derlemesi |
| `npm run preview` | OpenNext derlemesi + Workers runtime'da yerel önizleme |
| `npm run deploy` | OpenNext derlemesi + Cloudflare Workers'a yayın |
| `npm run cf-typegen` | Cloudflare binding tipleri |

## İçerik nerede?

- Marka, menü, footer, ana sayfa, hakkımızda, iletişim: `lib/cms-defaults.ts`
- Hizmet sayfaları: `content/services-a.ts`, `content/services-b.ts`
- Blog yazıları: `content/blog-a.ts`, `content/blog-b.ts`, `content/blog-c.ts`
- Telefon/WhatsApp girilirse (`site.business`) sitede, schema'da ve `llms.txt`'de otomatik görünür.

## İlk yayın (Cloudflare)

1. Cloudflare'de Turnstile widget'ı oluştur (domain: serdivanreklamajansi.com). Site key'i `wrangler.jsonc` içindeki `NEXT_PUBLIC_TURNSTILE_SITE_KEY` alanına yaz.
2. Resend hesabında `serdivanreklamajansi.com` domainini doğrula (SPF/DKIM DNS kayıtları) ve API key al.
3. Gizli değerleri yükle:
   ```bash
   npx wrangler login
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```
4. Yayınla: `npm run deploy`
5. Cloudflare panelinde Worker'a custom domain ekle: `serdivanreklamajansi.com` ve `www.serdivanreklamajansi.com`. `www` için Redirect Rule: `https://serdivanreklamajansi.com/${1}` (301).
6. `serdivandijital.com` domainini Cloudflare'e alıp Redirect Rule ile tüm yolları `https://serdivanreklamajansi.com/${1}` adresine 301 yönlendir.
7. Cloudflare > Speed: **Rocket Loader kapalı**, **Email Obfuscation kapalı**, Early Hints açık, Brotli açık, HTTP/3 açık.
8. Cloudflare > Bots: **AI crawler engelleme kapalı** (GEO için yapay zeka botları siteyi okuyabilmeli). Managed robots.txt kapalı; site kendi `robots.txt`'sini üretir.
9. Google Search Console ve Bing Webmaster'a domaini ekle, `https://serdivanreklamajansi.com/sitemap.xml` gönder. `GOOGLE_SITE_VERIFICATION` değerini `wrangler.jsonc` vars'a ekle.

Yerel önizleme için `.dev.vars.example` dosyasını `.dev.vars` olarak kopyalayıp doldur.

## Form akışı

`/iletisim` → `POST /api/contact` → Turnstile doğrulama → Resend ile `CONTACT_TO_EMAIL` adresine e-posta. Bal küpü alanı ve IP başına basit hız sınırı vardır.

## SEO / GEO

- Her sayfada "Kısaca" özet kutusu ve JSON-LD (ProfessionalService + parentOrganization, Service, FAQPage, BlogPosting, BreadcrumbList).
- `/llms.txt` ve `/llms-full.txt` yapay zeka asistanları için.
- `robots.txt` GPTBot, ClaudeBot, PerplexityBot vb. botlara açıkça izin verir.
- Hedef: PageSpeed mobil 4×100. Ana sayfada client JavaScript yok; tek font; hero'da görsel yok.
