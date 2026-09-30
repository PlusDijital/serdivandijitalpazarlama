# Yayın kontrol listesi

Sıra önemli. İşaretledikçe ilerleyin.

## 0. Acil: alan adı yenileme

- [ ] `serdivanreklamajansi.com` **18 Kasım 2026'da sona eriyor** (kayıt firması: Atak Domain). Otomatik yenilemeyi açın veya en az 2 yıl yenileyin. Süresi dolan alan adı tüm SEO emeğini sıfırlar.

## 1. Alan adını Cloudflare'e taşıma (DNS)

Alan adı şu an Güzel Hosting DNS'inde (`tr.guzelhosting.com` vb.). Cloudflare Workers'a bağlamak için DNS Cloudflare'de olmalı.

- [ ] Cloudflare paneli > **Add a domain** > `serdivanreklamajansi.com` > Free plan.
- [ ] Cloudflare'in verdiği iki nameserver'ı Atak Domain / Güzel Hosting panelinde alan adının nameserver'ları olarak girin.
- [ ] Alan adında e-posta kullanılıyorsa (MX kayıtları), Cloudflare'in içe aktardığı DNS kayıtlarında MX'in doğru geldiğini kontrol edin.
- [ ] Cloudflare'de alan adı "Active" olana kadar bekleyin (birkaç dakika ile 24 saat).

## 2. Cloudflare oturumu ve yayın

```bash
cd ~/Developer/serdivanreklamajansi
npx wrangler login
npm run deploy
```

- [ ] Cloudflare > Workers & Pages > `serdivanreklamajansi` > Settings > Domains & Routes > **Custom domain** ekle: `serdivanreklamajansi.com` ve `www.serdivanreklamajansi.com`.
- [ ] Rules > Redirect Rules: `www.serdivanreklamajansi.com/*` → `https://serdivanreklamajansi.com/${1}` (301).

## 3. Form: Turnstile ve Resend

- [ ] Cloudflare > Turnstile > Add widget > domain `serdivanreklamajansi.com`, mod "Managed". Site key'i `wrangler.jsonc` içinde `NEXT_PUBLIC_TURNSTILE_SITE_KEY` alanına yazın (şu an Cloudflare test anahtarı var).
- [ ] resend.com hesabı > Domains > `serdivanreklamajansi.com` ekle > verilen SPF/DKIM kayıtlarını Cloudflare DNS'e ekleyin > Verify.
- [ ] Resend > API Keys > yeni anahtar.
- [ ] Gizli değerler:
  ```bash
  npx wrangler secret put RESEND_API_KEY
  npx wrangler secret put TURNSTILE_SECRET_KEY
  ```
- [ ] `npm run deploy` ile tekrar yayınlayın ve formu kendiniz deneyin; e-posta `info@plusdijital.com`'a düşmeli.
- [ ] `info@serdivanreklamajansi.com` adresini (sitede görünen e-posta) Cloudflare > Email Routing ile `info@plusdijital.com`'a yönlendirin.

## 4. Cloudflare hız ve bot ayarları

- [ ] Speed > Optimization: **Rocket Loader kapalı**, Early Hints açık.
- [ ] Scrape Shield: **Email Address Obfuscation kapalı** (PageSpeed'i bozar).
- [ ] Network: HTTP/3 açık. Brotli varsayılan açık.
- [ ] Security > Bots: **"Block AI bots" kapalı**; AI Crawl Control'de GPTBot, ClaudeBot, PerplexityBot, Google-Extended "Allow". Aksi halde yapay zeka aramalarında (GEO) görünmezsiniz.
- [ ] "Managed robots.txt" kapalı; site kendi `robots.txt`'sini üretiyor.

## 5. Ölçüm (PageSpeed'i düşürmeden)

- [ ] Analytics & Logs > **Web Analytics** > site ekle > token'ı kopyalayın > `wrangler.jsonc` vars'a `NEXT_PUBLIC_CF_BEACON_TOKEN` olarak ekleyip yeniden yayınlayın.
- [ ] Google Ads dönüşümü gerekiyorsa **Cloudflare Zaraz** kullanın (üçüncü taraf etiketleri tarayıcı yerine Cloudflare'de çalıştırır):
  - Zaraz > Tools > Google Ads (Conversion ID/Label) ve istenirse Google Analytics 4 ekleyin.
  - Tetikleyici 1: Event Name = `generate_lead` (form başarıyla gönderildiğinde site bu olayı yollar).
  - Tetikleyici 2: Click Listener, CSS selector `[data-track="whatsapp"]` (WhatsApp tıklamaları).
  - Klasik Google etiketi / GTM eklemeyin; mobil PageSpeed'i 100'den belirgin düşürür.

## 6. Arama motorları

- [ ] Google Search Console > Alan adı mülkü (DNS TXT kaydıyla doğrulama, Cloudflare DNS'e ekleyin) > Site haritaları: `https://serdivanreklamajansi.com/sitemap.xml`.
- [ ] Bing Webmaster Tools > "Import from Google Search Console" (en hızlısı) > site haritasını gönderin. Bing, ChatGPT aramasının kaynağıdır.
- [ ] Yandex Webmaster > site ekle > HTML meta doğrulama kodunu `YANDEX_VERIFICATION` olarak ekleyin.
- [ ] Meta etiketiyle doğrulama tercih ederseniz: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `YANDEX_VERIFICATION` değerlerini `wrangler.jsonc` vars'a ekleyip yeniden yayınlayın (derleme anında sayfaya yazılır).
- [ ] Cloudflare > Caching > Configuration > **Crawler Hints** açık (IndexNow ile Bing/Yandex'e değişiklikleri bildirir).

## 7. Yayın sonrası kontrol

- [ ] https://pagespeed.web.dev ile ana sayfa, bir hizmet sayfası, bir blog yazısı (mobil).
- [ ] https://search.google.com/test/rich-results ile ana sayfa (ProfessionalService, FAQPage) ve bir blog yazısı (BlogPosting).
- [ ] `https://serdivanreklamajansi.com/llms.txt` ve `/robots.txt` açılıyor mu?
