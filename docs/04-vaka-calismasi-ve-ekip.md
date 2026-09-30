# Vaka çalışması ve ekip bölümü

Sitede iki bölüm hazır ama **boş olduğu için gizli**. Gerçek bilgiler girilince otomatik görünür.

- Vaka çalışmaları: ana sayfada SSS'nin üstünde.
- Ekip: Hakkımızda sayfasında; her kişi için schema'ya `Person` kaydı da eklenir.

> Uydurma örnek, isim veya rakam kullanmayın. Hem yasal risk (Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği) hem de Google'ın güven değerlendirmesi açısından zarar verir. Müşteriden yazılı izin alın.

## Vaka çalışması için müşteriye sorulacaklar

1. İşletmenin adını kullanabilir miyiz? (Hayırsa: "Serdivan'da bir diş kliniği" gibi anonim)
2. Sektör ve bölge (ör. Kafe, Esentepe)
3. Çalışmaya başlamadan önceki durum (1-2 cümle)
4. Ne yaptık? (kanal, süre, ana değişiklikler)
5. Ölçülen sonuç (dönem ve kaynak belirterek: "3 ayda aylık form talebi 12'den 31'e, Google Ads verisi")
6. Kısa bir görüş cümlesi ve kimin adına yazılacağı (isteğe bağlı)

## Koda ekleme

`lib/cms-defaults.ts` > `home.caseStudies.items`:

```ts
items: [
  {
    client: "Örnek Kafe",            // veya "Serdivan'da bir kafe"
    sector: "Kafe",
    area: "Esentepe, Serdivan",
    challenge: "Hafta içi öğleden sonra saatleri boş kalıyordu.",
    work: "Kampüs çevresine 3 km yarıçaplı Instagram hikaye reklamları ve Google Haritalar profil düzenlemesi.",
    result: "2 ayda profil ziyaretleri 3 kat, yol tarifi talepleri 2 kat arttı (Meta ve Google İşletme verisi).",
    quote: "…",                      // isteğe bağlı
    quoteAuthor: "Ad Soyad, işletme sahibi",
  },
],
```

## Ekip ekleme

Fotoğrafı 400x400 WebP olarak `public/ekip/ad-soyad.webp` yoluna koyun.

`lib/cms-defaults.ts` > `about.team.items`:

```ts
items: [
  {
    name: "Ad Soyad",
    role: "Google Ads Uzmanı",
    bio: "Plus Dijital'de 6 yıldır yerel işletmelerin Google Ads hesaplarını yönetiyor.",
    photo: "/ekip/ad-soyad.webp",
    linkedin: "https://www.linkedin.com/in/…",
  },
],
```

Sonra `npm run deploy`.
