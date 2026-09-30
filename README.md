# Serdivan Reklam Ajansı — serdivanreklamajansi.com

Plus Dijital'in Serdivan'a odaklanan yerel marka sitesi. Next.js 16 (App Router) + Tailwind v4, Cloudflare Workers üzerinde OpenNext adaptörüyle çalışır. İçerik koddan gelir; admin paneli yoktur.

> **Önemli:** Projeyi Masaüstü veya Belgeler gibi iCloud ile eşitlenen bir klasörde çalıştırmayın. "Depolamayı optimize et" açıkken `node_modules` ve `.next` buluta boşaltılıyor; derleme dakikalarca sürüyor, sunucu açılmıyor. Çalışma kopyası: `~/Developer/serdivanreklamajansi`.

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

## Yayın ve büyüme dokümanları

Adım adım yapılacaklar `docs/` klasöründe:

| Dosya | İçerik |
|---|---|
| `docs/01-yayin-kontrol-listesi.md` | Alan adı yenileme, DNS'i Cloudflare'e taşıma, yayın, form anahtarları, ölçüm, Search Console/Bing |
| `docs/02-plusdijital-baglantilari.md` | plusdijital.com'a eklenecek hazır bağlantı metinleri |
| `docs/03-dizin-kayitlari.md` | Armut, Yandex, Bing Places vb. için hazır kayıt metinleri |
| `docs/04-vaka-calismasi-ve-ekip.md` | Vaka çalışması ve ekip bölümünü doldurma |
| `docs/05-google-ads-kampanya-plani.md` | Anahtar kelimeler, negatifler, reklam metinleri, bütçe |
| `docs/06-geo-takip.md` | Yapay zeka aramalarında aylık görünürlük takibi |
| `docs/07-veri-yazisi-plani.md` | Sektörel tıklama maliyeti veri yazısı planı |

Yerel önizleme için `.dev.vars.example` dosyasını `.dev.vars` olarak kopyalayıp doldurun.

## Form akışı

`/iletisim` → `POST /api/contact` → Turnstile doğrulama → Resend ile `CONTACT_TO_EMAIL` adresine e-posta. Bal küpü alanı ve IP başına basit hız sınırı vardır.

## SEO / GEO

- Her sayfada "Kısaca" özet kutusu ve JSON-LD (ProfessionalService + parentOrganization, Service, FAQPage, BlogPosting, BreadcrumbList).
- `/llms.txt` ve `/llms-full.txt` yapay zeka asistanları için.
- `robots.txt` GPTBot, ClaudeBot, PerplexityBot vb. botlara açıkça izin verir.
- Hedef: PageSpeed mobil 4×100. Ana sayfada client JavaScript yok; tek font; hero'da görsel yok.
