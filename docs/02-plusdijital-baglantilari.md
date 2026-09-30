# plusdijital.com'dan verilecek bağlantılar

Amaç: yeni alan adına ilk güven sinyalini vermek. **Az ve doğal** olmalı; her sayfaya footer bağlantısı koymak yerine iki bağlamsal bağlantı yeterli. Aynı anahtar kelimeyi her yerde bağlantı metni yapmayın.

## 1. plusdijital.com/serdivan-reklam-ajansi/ sayfası

"Ofis ve iletişim" bölümünün altına bir paragraf ekleyin:

```html
<p>Serdivan'daki küçük ve orta ölçekli işletmeler için ayrı bir yerel ekibimiz var:
<a href="https://serdivanreklamajansi.com/">Serdivan Reklam Ajansı</a>, Plus Dijital'in Serdivan'a odaklanan markasıdır.
Kafe, klinik ve hizmet işletmelerine yönelik rehberleri orada bulabilirsiniz.</p>
```

## 2. plusdijital.com Hakkımızda sayfası

"Markalarımız" veya benzeri bir alt başlıkla:

```html
<h3>Yerel markamız</h3>
<p><a href="https://serdivanreklamajansi.com/">serdivanreklamajansi.com</a>: Serdivan ve çevresindeki işletmeler için Google Ads,
Instagram reklamı, yerel SEO ve web tasarım hizmetlerimizi yerel odakla sunduğumuz sitemiz.</p>
```

## 3. (İsteğe bağlı) Bir blog yazısından bağlam içi bağlantı

plusdijital.com'da Google Ads veya yerel SEO ile ilgili bir yazıda, konu uygunsa:

```html
Serdivan'daki diş klinikleri için hazırladığımız
<a href="https://serdivanreklamajansi.com/blog/serdivan-dis-klinigi-google-ads">Google Ads rehberine</a> de göz atabilirsiniz.
```

## Yapılmaması gerekenler

- Tüm sayfalara footer'dan "serdivan reklam ajansı" metinli bağlantı (site genelinde tekrar eden bağlantı değer kaybeder ve doğal görünmez).
- Karşılıklı onlarca bağlantı değişimi.
- İki sitede aynı metnin kopyalanması (her iki sayfanın da sıralamasına zarar verir).

## Schema tarafı (WordPress'te bir SEO eklentisi varsa)

plusdijital.com Organization schema'sına `subOrganization` eklenebilir:

```json
"subOrganization": {
  "@type": "Organization",
  "name": "Serdivan Reklam Ajansı",
  "url": "https://serdivanreklamajansi.com"
}
```

Yeni site zaten `parentOrganization` ile Plus Dijital'i işaret ediyor; bu, ilişkiyi iki yönlü hale getirir.
