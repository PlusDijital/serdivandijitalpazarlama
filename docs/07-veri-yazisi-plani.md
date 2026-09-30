# Veri yazısı: "Sakarya'da sektörlere göre Google Ads tıklama maliyetleri 2026"

Yapay zeka araçları ve diğer siteler özgün veriyi kaynak gösterir. Bu yazı, sitenin en çok bağlantı ve alıntı alacak içeriği olabilir.

**Neden henüz yazılmadı:** Rakamlar Plus Dijital'in yönettiği müşteri hesaplarından gelecek. Bu verinin yayınlanması sizin kararınız; müşteri sözleşmelerinizde anonim, toplu veri kullanımına engel olmadığından emin olun.

## Yöntem

- Kaynak: plus-ads-agent Supabase veritabanındaki son 90 günlük Google Ads verisi (Sakarya hedefli arama kampanyaları).
- Sektör eşlemesi: her hesabı bir sektöre atayın (kafe/restoran, sağlık, emlak, eğitim, hizmet, e-ticaret).
- Yayınlanacak metrikler: sektör başına **medyan** TBM (tıklama başı maliyet), medyan tıklama oranı, dönüşüm başı maliyet aralığı.
- Gizlilik kuralı: bir sektörde en az 3 hesap yoksa o sektörü yayınlamayın; hesap adı, tekil hesap rakamı veya tanınabilir detay yok.
- Dönem ve kaynak yazıda açıkça belirtilir: "Plus Dijital'in yönettiği X hesap, Temmuz–Eylül 2026".

## Onay verirseniz yapılacaklar

1. Supabase'den sektör bazlı medyan değerleri çeken salt okunur sorgu.
2. Sonuçları size tablo olarak gösterme (yayından önce onayınız).
3. Blog yazısı + yazıya gömülü tablo + `Dataset` schema işaretlemesi.
4. llms.txt'ye yazının eklenmesi (otomatik).
