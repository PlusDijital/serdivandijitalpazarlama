export type ServiceLandingPage = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  localFocus: string[];
  benefits: string[];
  deliverables: string[];
  process: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  relatedPosts: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  intro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  relatedServiceSlug: string;
  sections: { heading: string; body: string }[];
};

export const serviceLandingPages: ServiceLandingPage[] = [
  {
    slug: "serdivan-dijital-pazarlama-ajansi",
    navLabel: "Serdivan Dijital Pazarlama",
    eyebrow: "Serdivan Merkezli Büyüme Partneri",
    title: "Serdivan Dijital Pazarlama Ajansı",
    metaTitle: "Serdivan Dijital Pazarlama Ajansı | Performans Odaklı Büyüme",
    metaDescription:
      "Serdivan Dijital Pazarlama Ajansı ile Google Ads, SEO, Meta reklamları, landing page ve içerik üretimini tek strateji altında yönetin.",
    heroTitle: "Serdivan Dijital Pazarlama Ajansı ile lokal görünürlükten ölçülebilir büyümeye geçin.",
    heroDescription:
      "Serdivan ve Sakarya'da hizmet veren markalar için reklam yönetimi, SEO, sosyal medya ve dönüşüm optimizasyonunu aynı çatı altında kurguluyoruz.",
    primaryKeyword: "Serdivan Dijital Pazarlama",
    secondaryKeywords: [
      "Serdivan dijital reklam ajansı",
      "Serdivan performans pazarlama",
      "Serdivan sosyal medya ajansı",
      "Serdivan SEO ajansı",
      "Sakarya dijital pazarlama ajansı",
    ],
    localFocus: ["Serdivan", "Sakarya", "Adapazarı", "Erenler"],
    benefits: [
      "Lokal arama niyetine uygun içerik ve reklam kurgusu",
      "Google Ads, Meta Ads ve SEO'nun aynı raporda yönetilmesi",
      "Serdivan merkezli markalar için hızlı toplantı ve operasyon akışı",
    ],
    deliverables: [
      "Kanal bazlı büyüme stratejisi",
      "Landing page ve teklif akışı optimizasyonu",
      "Google Ads ve Meta reklam kampanya yönetimi",
      "Yerel SEO ve içerik kümesi planı",
      "Haftalık raporlama ve dönüşüm analizi",
    ],
    process: [
      {
        title: "Mevcut görünürlüğü analiz ediyoruz",
        description:
          "Markanızın Serdivan ve Sakarya bölgesindeki arama görünürlüğünü, reklam performansını ve rakip yoğunluğunu birlikte değerlendiriyoruz.",
      },
      {
        title: "Tek kanal değil, tam funnel kuruyoruz",
        description:
          "Reklam, SEO, içerik ve landing page kurgusunu aynı hedef etrafında topluyor; yalnızca trafik değil dönüşüm odaklı plan yapıyoruz.",
      },
      {
        title: "Veriyle ölçekliyoruz",
        description:
          "Arama terimi raporları, form verileri ve dönüşüm sinyalleriyle bütçeyi en verimli kampanyalara kaydırıyoruz.",
      },
    ],
    faq: [
      {
        question: "Serdivan Dijital Pazarlama Ajansı hangi işletmeler için uygundur?",
        answer:
          "Özellikle Sakarya ve çevresinde hizmet satan, lead toplayan veya e-ticaret yapan işletmeler için uygundur. Klinikler, üreticiler, yerel markalar ve danışmanlık şirketleri bu modelden hızlı sonuç alır.",
      },
      {
        question: "Serdivan merkezli olmak SEO açısından avantaj sağlar mı?",
        answer:
          "Evet. Yerel içerik, Google Business Profile, bölgesel sayfa optimizasyonu ve yakın lokasyon niyetine uygun anahtar kelimeler birlikte kullanıldığında daha güçlü lokal sinyal üretilir.",
      },
      {
        question: "Dijital pazarlama ve SEO birlikte mi yürütülmeli?",
        answer:
          "Çoğu durumda evet. Reklam kısa vadede talebi yakalar, SEO ise orta ve uzun vadede maliyeti dengeler. İki kanal birlikte çalıştığında daha sürdürülebilir büyüme elde edilir.",
      },
    ],
    relatedPosts: [
      "serdivan-dijital-pazarlama-stratejisi",
      "sakarya-reklam-ajansi-nasil-secilir",
      "sakarya-google-ads-yonetimi",
    ],
  },
  {
    slug: "sakarya-reklam-ajansi",
    navLabel: "Sakarya Reklam Ajansı",
    eyebrow: "Google Ads ve Meta Reklam Yönetimi",
    title: "Sakarya Reklam Ajansı",
    metaTitle: "Sakarya Reklam Ajansı | Google Ads ve Meta Ads Yönetimi",
    metaDescription:
      "Sakarya Reklam Ajansı olarak Google Ads, Meta Ads, kreatif üretim ve dönüşüm odaklı kampanya yönetimi ile ölçülebilir büyüme sağlıyoruz.",
    heroTitle: "Sakarya Reklam Ajansı arayan markalar için kampanyayı değil, sonucu optimize ediyoruz.",
    heroDescription:
      "Sakarya reklam ajansları arasında fark yaratmak için bütçeyi, kreatifi, hedeflemeyi ve landing page performansını aynı anda iyileştiriyoruz.",
    primaryKeyword: "Sakarya Reklam Ajansı",
    secondaryKeywords: [
      "Sakarya reklam ajansları",
      "Sakarya dijital reklam ajansı",
      "Sakarya Google Ads ajansı",
      "Sakarya Meta reklam yönetimi",
      "Sakarya performans pazarlama",
    ],
    localFocus: ["Sakarya", "Serdivan", "Adapazarı", "Arifiye"],
    benefits: [
      "Bölgesel hedefleme ve ticari arama niyetine göre reklam kurgusu",
      "Kreatif, kitle ve teklif stratejisinin aynı ekipte yönetilmesi",
      "Tıklama değil lead, satış ve randevu hedefli performans optimizasyonu",
    ],
    deliverables: [
      "Google Ads arama ve performans maksimum kampanyaları",
      "Meta Ads funnel kurgusu",
      "Remarketing ve lookalike stratejileri",
      "Açılış sayfası ve teklif metni optimizasyonu",
      "Haftalık performans raporu ve toplantı akışı",
    ],
    process: [
      {
        title: "Arama niyeti ve rakip yoğunluğu çıkarılır",
        description:
          "Sakarya reklam ajansı, Google Ads yönetimi ve benzeri ticari terimlerde kullanıcı niyetini ve teklif rekabetini analiz ediyoruz.",
      },
      {
        title: "Kampanya yapısı satın alma yolculuğuna göre kurulur",
        description:
          "Soğuk kitle, değerlendirme ve remarketing aşamalarını ayrı mesajlarla yönetiyor; her kanal için farklı hedef tanımlıyoruz.",
      },
      {
        title: "Bütçe verimsiz kümelerden alınır, kazananlara aktarılır",
        description:
          "Anahtar kelime, cihaz, şehir ve saat kırılımında bütçe dağılımını düzenleyerek dönüşüm başı maliyeti aşağı çekiyoruz.",
      },
    ],
    faq: [
      {
        question: "Sakarya reklam ajansı seçerken nelere bakılmalı?",
        answer:
          "Yalnızca kreatif örneklerine değil; dönüşüm takibi, raporlama kalitesi, landing page yaklaşımı ve sektör deneyimine bakılmalı. Reklam bütçesini açıklayabilen ekipler daha güvenilirdir.",
      },
      {
        question: "Google Ads ve Meta Ads aynı anda kullanılmalı mı?",
        answer:
          "Çoğu sektörde evet. Google talebi yakalar, Meta yeni talep yaratır ve yeniden pazarlamada güçlü sonuç verir. İki kanal birlikte daha dengeli bir büyüme sağlar.",
      },
      {
        question: "Sakarya reklam ajansları arasında fiyat mı performans mı önemli?",
        answer:
          "Düşük ajans ücreti tek başına avantaj değildir. Önemli olan toplam edinme maliyeti, kampanya şeffaflığı ve getirinin sürdürülebilirliğidir.",
      },
    ],
    relatedPosts: [
      "sakarya-reklam-ajansi-nasil-secilir",
      "sakarya-google-ads-yonetimi",
      "sakarya-sosyal-medya-ajansi-secimi",
    ],
  },
  {
    slug: "sakarya-seo-ajansi",
    navLabel: "Sakarya SEO Ajansı",
    eyebrow: "Lokal SEO ve Organik Büyüme",
    title: "Sakarya SEO Ajansı",
    metaTitle: "Sakarya SEO Ajansı | Lokal SEO ve İçerik Stratejisi",
    metaDescription:
      "Sakarya SEO Ajansı hizmetimizle lokal aramalarda görünürlüğünüzü artırın. Teknik SEO, içerik kümeleri ve dönüşüm odaklı sayfa optimizasyonu sunuyoruz.",
    heroTitle: "Sakarya SEO Ajansı desteğiyle sadece sıralama değil, nitelikli talep üretin.",
    heroDescription:
      "Sakarya SEO ajansı arayan işletmeler için teknik SEO, lokal sayfa kurgusu, içerik planı ve dahili bağlantı mimarisini birlikte yönetiyoruz.",
    primaryKeyword: "Sakarya SEO Ajansı",
    secondaryKeywords: [
      "Sakarya SEO",
      "Serdivan SEO ajansı",
      "Sakarya yerel SEO",
      "Sakarya organik trafik",
      "Sakarya web tasarım SEO",
    ],
    localFocus: ["Sakarya", "Serdivan", "Adapazarı", "Karasu"],
    benefits: [
      "Şehir ve hizmet odaklı aramalarda daha güçlü görünürlük",
      "İçerik kümeleriyle uzun kuyruk aramalardan lead toplama",
      "Teknik sorunları azaltıp kullanıcı deneyimini güçlendirme",
    ],
    deliverables: [
      "Teknik SEO denetimi ve önceliklendirme",
      "Yerel landing page ve başlık optimizasyonu",
      "İçerik kümesi ve blog planı",
      "Dahili bağlantı ve canonical düzeni",
      "Search Console takibi ve aylık SEO raporu",
    ],
    process: [
      {
        title: "İndekslenebilirlik ve teknik temel düzeltilir",
        description:
          "Başlık yapısı, metadata, sitemap, robots, sayfa hızı ve dahili bağlantılar üzerinden teknik SEO temeli sağlamlaştırılır.",
      },
      {
        title: "Lokal anahtar kelime kümeleri oluşturulur",
        description:
          "Sakarya reklam ajansı, Sakarya SEO ajansı, Serdivan dijital pazarlama ve ilgili ticari terimlere göre içerik kümeleri planlanır.",
      },
      {
        title: "İçerik ve sayfa sinyalleri büyütülür",
        description:
          "Hizmet sayfaları, blog yazıları, FAQ alanları ve schema işaretlemeleri ile konu otoritesi kademeli olarak artırılır.",
      },
    ],
    faq: [
      {
        question: "Sakarya SEO Ajansı ile çalışmanın farkı nedir?",
        answer:
          "Lokal rekabeti bilen bir ekip, şehir bazlı arama niyetini ve kullanıcıların hangi terimlerle teklif aradığını daha iyi kurgular. Bu da daha yüksek niyetli trafik anlamına gelir.",
      },
      {
        question: "SEO çalışması ne kadar sürede sonuç verir?",
        answer:
          "Teknik altyapı güçlü ise ilk hareketler birkaç hafta içinde görülebilir. Rekabetin yoğun olduğu ticari terimlerde anlamlı kazanımlar genellikle birkaç ay içinde oluşur.",
      },
      {
        question: "Blog içerikleri gerçekten SEO'ya katkı sağlar mı?",
        answer:
          "Evet, özellikle hizmet sayfalarını destekleyen ve ticari niyete bağlanan yazılar lokal aramalarda otorite kurmanıza ciddi katkı sağlar.",
      },
    ],
    relatedPosts: [
      "sakarya-seo-ajansi-ne-yapar",
      "sakarya-web-tasarim-seo-uyumu",
      "serdivan-dijital-pazarlama-stratejisi",
    ],
  },
  {
    slug: "sakarya-sosyal-medya-ajansi",
    navLabel: "Sakarya Sosyal Medya Ajansı",
    eyebrow: "İçerik, Topluluk ve Reklam Senkronu",
    title: "Sakarya Sosyal Medya Ajansı",
    metaTitle: "Sakarya Sosyal Medya Ajansı | İçerik ve Reklam Yönetimi",
    metaDescription:
      "Sakarya Sosyal Medya Ajansı hizmetimizle içerik üretimi, reklam yönetimi ve topluluk büyütmeyi tek stratejide birleştiriyoruz.",
    heroTitle: "Sakarya Sosyal Medya Ajansı arayan markalar için görünürlük, içerik ve reklam aynı masada.",
    heroDescription:
      "Sosyal medya içerik planı, performans reklamları ve marka dili birlikte kurgulanmadığında etki düşer. Biz bu üç alanı tek hedefte topluyoruz.",
    primaryKeyword: "Sakarya Sosyal Medya Ajansı",
    secondaryKeywords: [
      "Sakarya sosyal medya yönetimi",
      "Serdivan sosyal medya ajansı",
      "Sakarya Instagram reklamları",
      "Sakarya içerik üretimi",
      "Sakarya Meta Ads ajansı",
    ],
    localFocus: ["Sakarya", "Serdivan", "Adapazarı"],
    benefits: [
      "İçerik planı ile reklam mesajının uyumlu ilerlemesi",
      "Organik ve ücretli görünürlüğün tek KPI setinde takip edilmesi",
      "Yerel markalar için daha güçlü hatırlanırlık ve güven sinyali",
    ],
    deliverables: [
      "Aylık içerik planı ve kreatif üretim",
      "Instagram ve Facebook reklam yönetimi",
      "Topluluk ve mesajlaşma akışı önerileri",
      "Kampanya bazlı içerik serileri",
      "Aylık performans ve içerik raporu",
    ],
    process: [
      {
        title: "Marka tonu ve hedef kitle netleştirilir",
        description:
          "Önce mesaj dili, içerik temaları ve hedef kitle beklentileri belirlenir; ardından reklam ve içerik takvimi buna göre kurulur.",
      },
      {
        title: "İçerik ve reklam aynı brief'te buluşur",
        description:
          "Organik paylaşımlar ile Meta reklamlarında kullanılan vaat, görsel dil ve teklif yapısı senkronize edilir.",
      },
      {
        title: "Topluluk tepkisine göre içerik optimize edilir",
        description:
          "Kaydedilme, tıklama, mesaj ve form verilerine göre hangi içeriklerin satışa yakın trafik ürettiği takip edilir.",
      },
    ],
    faq: [
      {
        question: "Sakarya sosyal medya ajansı seçerken en kritik kriter nedir?",
        answer:
          "Tasarım kalitesi kadar içeriğin satışa nasıl bağlandığı da önemlidir. İçerik ve reklamı birlikte düşünen ekipler daha etkili sonuç üretir.",
      },
      {
        question: "Sosyal medya yönetimi SEO'ya da katkı sağlar mı?",
        answer:
          "Dolaylı olarak evet. Marka aramalarını artırır, içerik görünürlüğünü güçlendirir ve kullanıcıların markayla daha çok etkileşime girmesini sağlar.",
      },
      {
        question: "Sosyal medya ajansı ile reklam ajansı aynı ekip olabilir mi?",
        answer:
          "Olabilir ve çoğu zaman avantajlıdır. Aynı ekip hem içerik akışını hem performans reklamlarını yönettiğinde öğrenme döngüsü daha hızlı oluşur.",
      },
    ],
    relatedPosts: [
      "sakarya-sosyal-medya-ajansi-secimi",
      "sakarya-reklam-ajansi-nasil-secilir",
      "serdivan-dijital-pazarlama-stratejisi",
    ],
  },
  {
    slug: "sakarya-web-tasarim-ve-landing-page",
    navLabel: "Sakarya Landing Page",
    eyebrow: "Web Tasarım ve Dönüşüm Optimizasyonu",
    title: "Sakarya Web Tasarım ve Landing Page Optimizasyonu",
    metaTitle: "Sakarya Web Tasarım | Landing Page ve Dönüşüm Optimizasyonu",
    metaDescription:
      "Sakarya web tasarım ve landing page optimizasyonu ile reklam trafiğinizi daha yüksek dönüşüme çevirin. Hız, mesaj ve teklif yapısını iyileştiriyoruz.",
    heroTitle: "Sakarya web tasarım ve landing page kurgusunu yalnızca estetik için değil dönüşüm için tasarlıyoruz.",
    heroDescription:
      "Reklam ve SEO trafiğinin boşa gitmemesi için sayfa yapısı, teklif hiyerarşisi, hız ve form akışını birlikte geliştiriyoruz.",
    primaryKeyword: "Sakarya web tasarım",
    secondaryKeywords: [
      "Sakarya landing page",
      "Serdivan web tasarım",
      "Sakarya dönüşüm optimizasyonu",
      "Sakarya SEO uyumlu web tasarım",
      "Sakarya lead odaklı web sitesi",
    ],
    localFocus: ["Sakarya", "Serdivan", "Adapazarı"],
    benefits: [
      "Reklam trafiğini daha yüksek form ve teklif oranına taşıma",
      "SEO ve kullanıcı deneyimini aynı sayfada dengeleme",
      "Mesaj karmaşasını azaltarak daha net teklif akışı kurma",
    ],
    deliverables: [
      "Landing page bilgi mimarisi",
      "Teklif formu ve CTA optimizasyonu",
      "Hız ve mobil deneyim iyileştirmeleri",
      "SEO uyumlu başlık, metin ve şema yapısı",
      "A/B test önerileri ve dönüşüm analizi",
    ],
    process: [
      {
        title: "Kullanıcı kayıpları bulunur",
        description:
          "Isı haritası olmasa bile sayfa yapısı, CTA görünürlüğü, form sürtünmesi ve bilgi yoğunluğu üzerinden kullanıcı kayıpları tespit edilir.",
      },
      {
        title: "Mesaj hiyerarşisi sadeleştirilir",
        description:
          "Başlık, alt başlık, sosyal kanıt ve teklif bölümleri daha hızlı taranabilir bir sıraya oturtulur.",
      },
      {
        title: "Hız ve SEO ile desteklenir",
        description:
          "Mobil uyumluluk, teknik performans ve metadata yapısı düzeltilerek hem reklam kalitesi hem organik görünürlük desteklenir.",
      },
    ],
    faq: [
      {
        question: "Sakarya web tasarım hizmeti SEO ile birlikte düşünülmeli mi?",
        answer:
          "Kesinlikle evet. Tasarım, başlık yapısı, içerik düzeni ve hız birlikte kurgulanmazsa hem kullanıcı deneyimi hem arama görünürlüğü zayıflar.",
      },
      {
        question: "Landing page ile normal web sitesi arasında ne fark var?",
        answer:
          "Landing page tek bir teklif ve dönüşüm hedefine odaklanır. Normal web sitesi daha geniş bilgi verirken landing page dönüşüm oranını yükseltmek için tasarlanır.",
      },
      {
        question: "Reklam kampanyaları için ayrı sayfa gerekli mi?",
        answer:
          "Çoğu durumda evet. Reklam mesajı ile sayfa vaadi eşleştiğinde kalite puanı ve dönüşüm oranı daha iyi olur.",
      },
    ],
    relatedPosts: [
      "sakarya-web-tasarim-seo-uyumu",
      "sakarya-google-ads-yonetimi",
      "sakarya-seo-ajansi-ne-yapar",
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "sakarya-reklam-ajansi-nasil-secilir",
    title: "Sakarya Reklam Ajansı Nasıl Seçilir?",
    metaTitle: "Sakarya Reklam Ajansı Nasıl Seçilir? | Serdivan Dijital Pazarlama",
    metaDescription:
      "Sakarya reklam ajansı seçerken dikkat etmeniz gereken kriterleri; raporlama, strateji, kreatif kalite ve dönüşüm odaklı bakış açısıyla inceliyoruz.",
    excerpt:
      "Sakarya reklam ajansları arasında karar verirken yalnızca fiyat değil, strateji, raporlama ve dönüşüm kabiliyeti değerlendirilmelidir.",
    date: "13 Mart 2026",
    readTime: "6 dk",
    category: "Reklam Yönetimi",
    intro:
      "Sakarya reklam ajansı arayan işletmeler için en kritik soru şudur: ajans size gerçekten satış ve talep getirecek mi? Bunu anlamak için birkaç temel kritere birlikte bakmak gerekir.",
    primaryKeyword: "Sakarya Reklam Ajansı",
    secondaryKeywords: [
      "Sakarya reklam ajansları",
      "Sakarya dijital reklam ajansı",
      "Serdivan reklam ajansı",
    ],
    relatedServiceSlug: "sakarya-reklam-ajansi",
    sections: [
      {
        heading: "Raporlama dili anlaşılır mı?",
        body:
          "Bir ajans yalnızca tıklama ve gösterim anlatıyorsa eksik anlatıyordur. Form, teklif, satış, randevu ve maliyet bazlı rapor sunan ekipler karar vermeyi kolaylaştırır.",
      },
      {
        heading: "Kreatif ile performans aynı ekipte mi düşünülüyor?",
        body:
          "Sakarya reklam ajansları arasında önemli farklardan biri budur. Görsel, metin ve hedefleme ayrı düşünülürse kampanya performansı dağılır. En iyi sonuç, kreatif ve medya planlamasının ortak hedefte buluştuğu ekiplerden gelir.",
      },
      {
        heading: "Landing page yaklaşımı var mı?",
        body:
          "Reklamı iyi olup sayfası zayıf olan markalar bütçe yakar. Ajansın teklif metni, form akışı ve sayfa yapısı hakkında da fikir üretebilmesi gerekir.",
      },
      {
        heading: "Yerel niyeti anlayabiliyor mu?",
        body:
          "Sakarya ve Serdivan gibi lokal odaklı aramalarda kullanıcı beklentisi farklıdır. Bölgesel terimleri bilen, şehir bazlı kampanya yapısı kuran ajanslar daha hızlı öğrenir.",
      },
    ],
  },
  {
    slug: "sakarya-seo-ajansi-ne-yapar",
    title: "Sakarya SEO Ajansı Ne Yapar?",
    metaTitle: "Sakarya SEO Ajansı Ne Yapar? | Lokal SEO Rehberi",
    metaDescription:
      "Sakarya SEO ajansı ile çalıştığınızda teknik SEO, lokal görünürlük, içerik kümeleri ve dönüşüm odaklı optimizasyon süreçlerinde neler yapılır öğrenin.",
    excerpt:
      "Sakarya SEO ajansı yalnızca sıralama takibi yapmaz; teknik altyapı, içerik planı ve lokal arama görünürlüğünü birlikte yönetir.",
    date: "12 Mart 2026",
    readTime: "7 dk",
    category: "SEO",
    intro:
      "Sakarya SEO ajansı arayan birçok işletme, hizmetin yalnızca birkaç teknik ayardan ibaret olduğunu düşünür. Oysa etkili SEO; teknik temel, içerik planı ve kullanıcı deneyiminin birleşimidir.",
    primaryKeyword: "Sakarya SEO Ajansı",
    secondaryKeywords: [
      "Sakarya SEO",
      "Serdivan SEO ajansı",
      "Sakarya yerel SEO",
    ],
    relatedServiceSlug: "sakarya-seo-ajansi",
    sections: [
      {
        heading: "Teknik zemini kurar",
        body:
          "Başlık etiketleri, canonical düzeni, sitemap, robots, dahili bağlantılar ve sayfa hızı gibi teknik konular SEO'nun temelidir. Zayıf altyapı üzerine içerik eklemek sürdürülebilir olmaz.",
      },
      {
        heading: "Lokal arama niyetine uygun sayfalar oluşturur",
        body:
          "Sakarya reklam ajansı, Sakarya SEO ajansı veya Serdivan dijital pazarlama gibi ticari terimlerde görünmek için şehir ve hizmet odaklı landing page'ler gerekir.",
      },
      {
        heading: "Blog ile konu otoritesi inşa eder",
        body:
          "Hizmet sayfalarını destekleyen blog yazıları, daha uzun kuyruklu aramaları yakalayarak ana sayfa ve hizmet sayfalarına güç aktarır.",
      },
      {
        heading: "Dönüşümü de izler",
        body:
          "Sadece sıralama artışı değil, hangi sayfanın form getirdiği ve hangi içeriklerin ticari niyet taşıdığı da takip edilmelidir.",
      },
    ],
  },
  {
    slug: "serdivan-dijital-pazarlama-stratejisi",
    title: "Serdivan Dijital Pazarlama Stratejisi Nasıl Kurulur?",
    metaTitle: "Serdivan Dijital Pazarlama Stratejisi | Lokal Büyüme Rehberi",
    metaDescription:
      "Serdivan dijital pazarlama stratejisi kurarken reklam, SEO, sosyal medya ve landing page optimizasyonu nasıl aynı plana bağlanır öğrenin.",
    excerpt:
      "Serdivan Dijital Pazarlama yaklaşımında en etkili model; reklam, SEO ve içerik üretimini aynı büyüme hedefi altında birleştirmektir.",
    date: "11 Mart 2026",
    readTime: "6 dk",
    category: "Dijital Pazarlama",
    intro:
      "Serdivan'da faaliyet gösteren işletmelerin dijital pazarlamada fark yaratabilmesi için yalnızca reklam açması yetmez. Kanal uyumu, teklif netliği ve lokal güven sinyalleri birlikte çalışmalıdır.",
    primaryKeyword: "Serdivan Dijital Pazarlama",
    secondaryKeywords: [
      "Serdivan dijital pazarlama ajansı",
      "Serdivan reklam ajansı",
      "Serdivan sosyal medya ajansı",
    ],
    relatedServiceSlug: "serdivan-dijital-pazarlama-ajansi",
    sections: [
      {
        heading: "Lokal güven sinyallerini görünür kılın",
        body:
          "Adres, şehir vurgusu, müşteri referansları ve bölgesel hizmet tanımı özellikle Serdivan odaklı aramalarda güven oluşturan ilk sinyallerdir.",
      },
      {
        heading: "Reklam ve SEO'yu ayrı değil, tamamlayıcı düşünün",
        body:
          "Google Ads hızlı veri sağlar; SEO bu veriyi uzun vadeli görünürlüğe çevirir. Aynı anahtar kelime kümelerini iki kanalda da takip etmek daha güçlü öğrenme üretir.",
      },
      {
        heading: "Her kampanya için uygun landing page hazırlayın",
        body:
          "Genel ana sayfaya trafik göndermek yerine, teklif bazlı sayfalar kullanmak hem kalite puanını hem dönüşüm oranını artırır.",
      },
      {
        heading: "İçerik kümeleriyle uzmanlık sinyali oluşturun",
        body:
          "Serdivan dijital pazarlama, Sakarya reklam ajansı ve lokal SEO gibi kümeler üzerinden düzenli içerik yayınlamak konu otoritesi kurmanıza yardımcı olur.",
      },
    ],
  },
  {
    slug: "sakarya-google-ads-yonetimi",
    title: "Sakarya Google Ads Yönetimi ile Daha Nitelikli Lead Nasıl Toplanır?",
    metaTitle: "Sakarya Google Ads Yönetimi | Daha Nitelikli Lead Rehberi",
    metaDescription:
      "Sakarya Google Ads yönetiminde anahtar kelime, reklam metni, lokasyon hedefleme ve landing page uyumuyla daha kaliteli lead toplamanın yollarını keşfedin.",
    excerpt:
      "Sakarya Google Ads yönetimi yalnızca reklam vermek değildir; doğru arama niyeti, lokasyon hedefleme ve landing page uyumu ile dönüşüm artırılır.",
    date: "10 Mart 2026",
    readTime: "7 dk",
    category: "Google Ads",
    intro:
      "Sakarya'da Google Ads kullanan işletmelerin önemli bir kısmı tıklama alır ama yeterince nitelikli lead toplayamaz. Sorun genellikle anahtar kelime ve teklif sayfası uyumsuzluğundan kaynaklanır.",
    primaryKeyword: "Sakarya Google Ads Yönetimi",
    secondaryKeywords: [
      "Sakarya Google Ads ajansı",
      "Google Ads danışmanlığı Sakarya",
      "Sakarya reklam ajansı",
    ],
    relatedServiceSlug: "sakarya-reklam-ajansi",
    sections: [
      {
        heading: "Arama niyeti ticari mi, bilgi amaçlı mı ayırın",
        body:
          "Sakarya reklam ajansı, Google Ads danışmanlığı Sakarya gibi terimler daha ticari niyet taşırken genel bilgi terimleri daha üst huni trafik getirir. Kampanyaları bu niyete göre bölmek gerekir.",
      },
      {
        heading: "Lokasyon hedeflemesini daraltın",
        body:
          "Bütçeniz sınırlıysa önce Sakarya, Serdivan ve yakın bölgeleri önceliklendirmek gereksiz gösterim ve tıklamaları azaltır.",
      },
      {
        heading: "Reklam vaadi ile sayfa mesajı aynı olsun",
        body:
          "Reklamda teklif edilen hizmet sayfada birkaç saniye içinde net biçimde görünmelidir. Aksi durumda kalite puanı düşer ve kullanıcı terk eder.",
      },
      {
        heading: "Arama terimi raporu düzenli temizlenmeli",
        body:
          "Düşük niyetli sorguları negatif anahtar kelime listesine almak, aynı bütçeyle daha iyi lead kalitesi yakalamanın en hızlı yollarından biridir.",
      },
    ],
  },
  {
    slug: "sakarya-sosyal-medya-ajansi-secimi",
    title: "Sakarya Sosyal Medya Ajansı Seçerken Nelere Dikkat Edilmeli?",
    metaTitle: "Sakarya Sosyal Medya Ajansı Seçimi | İçerik ve Reklam Uyum Rehberi",
    metaDescription:
      "Sakarya sosyal medya ajansı seçerken içerik kalitesi, reklam entegrasyonu, raporlama ve marka tonu yönetimi açısından bakmanız gereken başlıkları öğrenin.",
    excerpt:
      "Sakarya sosyal medya ajansı seçerken yalnızca tasarım kalitesine değil içerik stratejisi ve reklam entegrasyonuna da bakılmalıdır.",
    date: "9 Mart 2026",
    readTime: "5 dk",
    category: "Sosyal Medya",
    intro:
      "Sosyal medya ajansı seçimi çoğu zaman yalnızca görsel beğenisine göre yapılıyor. Oysa sürdürülebilir sonuç için içerik kalitesi kadar reklam ve dönüşüm bağlantısı da önemlidir.",
    primaryKeyword: "Sakarya Sosyal Medya Ajansı",
    secondaryKeywords: [
      "Sakarya sosyal medya yönetimi",
      "Serdivan sosyal medya ajansı",
      "Sakarya Instagram reklamları",
    ],
    relatedServiceSlug: "sakarya-sosyal-medya-ajansi",
    sections: [
      {
        heading: "İçerik takvimi satış hedefiyle ilişkili mi?",
        body:
          "Takvim sadece paylaşım sıklığına değil; ürün, teklif ve kampanya dönemlerine göre planlanmalıdır. İçerik satıştan koparsa etkileşim artabilir ama gelir artmayabilir.",
      },
      {
        heading: "Reklam ve organik içerik konuşuyor mu?",
        body:
          "Sakarya sosyal medya ajansı seçerken bu noktayı mutlaka sorun. Reklam mesajı ile organik içerik dili aynı olduğunda kullanıcı güveni daha hızlı oluşur.",
      },
      {
        heading: "Raporlarda yalnızca beğeni mi var?",
        body:
          "Kaydetme, DM, profil ziyareti, form, tıklama ve kampanya katkısı gibi daha iş odaklı metrikler raporda yer almalıdır.",
      },
    ],
  },
  {
    slug: "sakarya-web-tasarim-seo-uyumu",
    title: "Sakarya Web Tasarım ve SEO Uyumunu Birlikte Kurmak",
    metaTitle: "Sakarya Web Tasarım ve SEO Uyumu | Dönüşüm Odaklı Rehber",
    metaDescription:
      "Sakarya web tasarım sürecinde SEO uyumu, mobil deneyim, hız ve landing page yapısının birlikte nasıl planlanması gerektiğini öğrenin.",
    excerpt:
      "Sakarya web tasarım projelerinde SEO sonradan eklenmemeli; baştan bilgi mimarisi, hız ve içerik yapısıyla birlikte düşünülmelidir.",
    date: "8 Mart 2026",
    readTime: "6 dk",
    category: "Web Tasarım",
    intro:
      "Web tasarım ve SEO çoğu zaman farklı aşamalar gibi ele alınıyor. Oysa özellikle lokal hizmet satışı yapan işletmelerde bu iki alan aynı stratejinin parçalarıdır.",
    primaryKeyword: "Sakarya web tasarım",
    secondaryKeywords: [
      "Sakarya SEO uyumlu web tasarım",
      "Serdivan web tasarım",
      "Sakarya landing page",
    ],
    relatedServiceSlug: "sakarya-web-tasarim-ve-landing-page",
    sections: [
      {
        heading: "Sayfa hiyerarşisi arama niyetini desteklemeli",
        body:
          "Başlık yapısı, hizmet blokları, sosyal kanıt ve iletişim alanları kullanıcıların tarama davranışına göre yerleşmelidir. SEO uyumlu yapı aynı zamanda daha iyi okunabilirlik sağlar.",
      },
      {
        heading: "Mobil hız reklam performansını da etkiler",
        body:
          "Yavaş açılan sayfalar yalnızca SEO'da değil reklam kalitesinde de sorun çıkarır. Özellikle mobil cihaz yoğun sektörlerde hız doğrudan maliyetle ilişkilidir.",
      },
      {
        heading: "Landing page kurgusu her hizmet için ayrı olabilir",
        body:
          "Sakarya SEO ajansı, Sakarya reklam ajansı veya sosyal medya yönetimi gibi farklı niyetler için tek sayfa yerine ayrı hedef sayfalar daha iyi sonuç verir.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return serviceLandingPages.find((service) => service.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
