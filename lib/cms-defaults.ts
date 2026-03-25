import { blogPosts, serviceLandingPages } from "@/content/seo-content";
import type { BlogPost, CmsData } from "@/lib/cms-types";

function withBlogDefaults(posts: typeof blogPosts): BlogPost[] {
  return posts.map((post) => ({
    ...post,
    coverImage: "",
    publishedAt: "2026-03-14",
    updatedAt: "2026-03-14",
    authorName: "Serdivan Dijital Pazarlama Ajansı",
  }));
}

export const defaultCmsData: CmsData = {
  site: {
    siteUrl: "https://serdivandijital.com",
    brandName: "Serdivan Dijital Pazarlama Ajansı",
    brandShortName: "Serdivan",
    logoInitial: "S",
    applicationName: "Serdivan Dijital Pazarlama Ajansı",
    defaultSeo: {
      defaultTitle: "Serdivan Dijital Pazarlama Ajansı | Sakarya SEO ve Reklam Yönetimi",
      titleTemplate: "%s | Serdivan Dijital Pazarlama Ajansı",
      description:
        "Serdivan Dijital Pazarlama Ajansı; Sakarya ve Türkiye genelinde Google Ads, Meta Ads, SEO, kreatif üretim ve performans pazarlaması hizmetleri sunar.",
      keywords: [
        "Serdivan dijital pazarlama ajansı",
        "Sakarya dijital pazarlama",
        "Google Ads yönetimi",
        "Meta reklam ajansı",
        "SEO ajansı Sakarya",
        "sağlık turizmi pazarlama",
        "e-ticaret performans pazarlama",
      ],
      openGraphTitle: "Serdivan Dijital Pazarlama Ajansı | Sakarya SEO ve Reklam Yönetimi",
      openGraphDescription:
        "Google Ads, Meta Ads, SEO ve kreatif üretimle Serdivan ve Sakarya'da ölçülebilir büyüme odaklı dijital pazarlama hizmetleri sunuyoruz.",
      twitterTitle: "Serdivan Dijital Pazarlama Ajansı",
      twitterDescription:
        "Sakarya ve Türkiye geneline performans pazarlama, SEO ve reklam yönetimi hizmetleri sunuyoruz.",
    },
  },
  header: {
    navLinks: [
      { href: "/", label: "Ana Sayfa" },
      { href: "/hizmetler", label: "Hizmetler" },
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/blog", label: "Blog" },
      { href: "/iletisim", label: "İletişim" },
    ],
    cta: { href: "/iletisim", label: "Teklif Al" },
    mobileCtaLabel: "Ücretsiz Teklif Al",
  },
  footer: {
    topPrompt: "Projenizi konuşmak ister misiniz?",
    topTitle: "Ücretsiz strateji görüşmesi için ulaşın.",
    topCta: { href: "/iletisim", label: "Teklif Al" },
    brandDescription:
      "E-ticaret ve Sağlık Turizmi odaklı performance-driven dijital pazarlama ajansı. Serdivan, Sakarya merkezli ve performans odaklı.",
    quickLinksTitle: "Hızlı Bağlantılar",
    serviceLinksTitle: "Hizmetlerimiz",
    contactTitle: "İletişim",
    socialLinks: [
      { icon: "instagram", href: "#", label: "Instagram" },
      { icon: "linkedin", href: "#", label: "LinkedIn" },
      { icon: "twitter", href: "#", label: "Twitter" },
    ],
    quickLinks: [
      { href: "/", label: "Ana Sayfa" },
      { href: "/hizmetler", label: "Hizmetler" },
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/blog", label: "Blog" },
      { href: "/iletisim", label: "İletişim" },
    ],
    serviceLinks: [
      { href: "/hizmetler/sakarya-reklam-ajansi", label: "Sakarya Reklam Ajansı" },
      { href: "/hizmetler/sakarya-seo-ajansi", label: "Sakarya SEO Ajansı" },
      {
        href: "/hizmetler/serdivan-dijital-pazarlama-ajansi",
        label: "Serdivan Dijital Pazarlama",
      },
      {
        href: "/hizmetler/sakarya-sosyal-medya-ajansi",
        label: "Sakarya Sosyal Medya Ajansı",
      },
      {
        href: "/hizmetler/sakarya-web-tasarim-ve-landing-page",
        label: "Sakarya Web Tasarım",
      },
    ],
    contactItems: [
      {
        icon: "mail",
        label: "E-posta",
        value: "info@serdivandijital.com",
        href: "mailto:info@serdivandijital.com",
      },
      {
        icon: "phone",
        label: "Telefon",
        value: "+90 XXX XXX XX XX",
        href: "tel:+90",
      },
      {
        icon: "map-pin",
        label: "Adres",
        value: "Serdivan, Sakarya",
        href: "",
      },
    ],
    workingHoursLabel: "Çalışma Saatleri",
    workingHoursValue: "Pzt – Cuma: 09:00–18:00",
    copyrightText:
      "© {year} Serdivan Dijital Pazarlama Ajansı. Tüm hakları saklıdır.",
    legalLinks: [
      { href: "#", label: "Gizlilik Politikası" },
      { href: "#", label: "Kullanım Koşulları" },
    ],
  },
  home: {
    seo: {
      title: "Serdivan Dijital Pazarlama Ajansı | Google Ads, SEO ve Meta Reklam Yönetimi",
      description:
        "Serdivan Dijital Pazarlama Ajansı ile Sakarya'da Google Ads, Meta Ads, SEO, kreatif üretim ve performans pazarlaması hizmetleriyle markanızı büyütün.",
      keywords: [
        "Serdivan Dijital Pazarlama Ajansı",
        "Sakarya SEO ajansı",
        "Google Ads danışmanlığı",
        "Meta reklam yönetimi",
        "dijital reklam ajansı Serdivan",
      ],
      canonical: "/",
      openGraphTitle: "Serdivan Dijital Pazarlama Ajansı",
      openGraphDescription:
        "Sakarya Serdivan merkezli dijital pazarlama ajansı ile SEO, Google Ads ve Meta Ads tarafında ölçülebilir büyüme sağlayın.",
    },
    structuredData: {
      name: "Serdivan Dijital Pazarlama Ajansı",
      description:
        "Serdivan ve Sakarya merkezli, Google Ads, Meta Ads, SEO, kreatif üretim ve performans pazarlaması hizmetleri sunan dijital ajans.",
      areaServed: ["Serdivan", "Sakarya", "Turkey"],
      addressLocality: "Serdivan",
      addressRegion: "Sakarya",
      addressCountry: "TR",
      serviceType: [
        "Google Ads Yönetimi",
        "Meta Ads Yönetimi",
        "SEO",
        "Kreatif Üretim",
        "Dönüşüm Optimizasyonu",
        "Sağlık Turizmi Pazarlaması",
      ],
    },
    hero: {
      eyebrow: "Serdivan / Sakarya Merkezli Ajans",
      title: "Serdivan Dijital\nPazarlama Ajansı\nile Ölçülebilir Büyüme",
      titleHighlight: "ile Ölçülebilir Büyüme",
      description:
        "Sakarya Serdivan merkezli ekibimiz; Google Ads, Meta Ads, SEO, kreatif üretim ve dönüşüm optimizasyonunu tek strateji altında birleştirerek e-ticaret ve sağlık turizmi markalarına ölçülebilir büyüme sağlıyor.",
      primaryCta: {
        href: "/iletisim",
        label: "Ücretsiz Strateji Görüşmesi",
      },
      secondaryCta: {
        href: "/hakkimizda",
        label: "Ekibi Tanı",
      },
      metrics: [
        { value: "5+", label: "Yıllık Deneyim" },
        { value: "700+", label: "Marka & Operasyon" },
        { value: "12M+", label: "Aylık Reklam TL" },
      ],
      ratingBadge: "4.9 / 5 Müşteri Puanı",
      trendBadge: "ROAS +38% bu ay",
      panelEyebrow: "Growth Control Room",
      panelTitle: "Strateji Özeti",
      panelStatus: "Q2 Aktif",
      goalLabel: "ROAS Hedefi",
      goalValue: "+38% ↑",
      goalProgress: 78,
      goalProgressText: "%78 hedefe ulaşıldı",
      focusLabel: "Odak Kanal",
      focusValue: "Google\n+ Meta Ads",
      conversionLabel: "Dönüşüm",
      conversionValue: "CRM &\nForm Akışı",
      activeServices: ["Paid Media", "SEO", "Creative", "CRO", "Reporting"],
    },
    partners: {
      eyebrow: "Güvenilen Partner Ekosistemi",
      partners: [
        "Google",
        "Meta Ads",
        "Semrush",
        "ikas",
        "TikTok Ads",
        "Shopify",
        "HubSpot",
        "Klaviyo",
        "Google",
        "Meta Ads",
        "Semrush",
        "ikas",
        "TikTok Ads",
        "Shopify",
        "HubSpot",
        "Klaviyo",
      ],
    },
    results: {
      eyebrow: "Rakamlarla Serdivan",
      title: "Ölçülebilir sonuçlar,\ngerçek büyüme.",
      titleHighlight: "gerçek büyüme.",
      description:
        "Her kampanya, haftalık raporlarla şeffaf biçimde izlenir. Başarıyı sezgiye değil veriye bağlıyoruz.",
      stats: [
        {
          value: "12M+",
          unit: "TL",
          label: "Aylık yönetilen reklam bütçesi",
          sub: "Google, Meta & TikTok dahil",
          wide: true,
        },
        {
          value: "%340",
          unit: "",
          label: "Ortalama ROAS",
          sub: "E-ticaret kampanyaları",
          wide: false,
        },
        {
          value: "700+",
          unit: "",
          label: "Desteklenen marka",
          sub: "2019'dan bu yana",
          wide: false,
        },
        {
          value: "5+",
          unit: "",
          label: "Yıllık sektör deneyimi",
          sub: "E-ticaret & sağlık turizmi",
          wide: false,
        },
      ],
      chartBars: [45, 60, 40, 78, 55, 90, 72, 85, 68, 95],
    },
    services: {
      eyebrow: "Core Services",
      title: "Strateji tek,\nteslimat net.",
      titleHighlight: "teslimat net.",
      description:
        "Tüm kanalları aynı ritimde yönetiyor; raporlama, uygulama ve optimizasyonu tek ekiple senkronize ediyoruz.",
      cards: [
        {
          icon: "bar-chart-3",
          tag: "Paid Media",
          num: "01",
          title: "Dijital Reklam Yönetimi",
          description:
            "Google Ads, Meta Ads ve TikTok platformlarında veri odaklı reklam yönetimiyle ölçülebilir dönüşüm sağlıyoruz.",
          span: "xl:col-span-2",
          href: "/hizmetler/sakarya-reklam-ajansi",
          footerText: "Strateji → Uygulama → Rapor",
        },
        {
          icon: "search",
          tag: "Organic Growth",
          num: "02",
          title: "SEO & İçerik Pazarlama",
          description:
            "Arama motorlarında kalıcı görünürlük ve organik trafik artışı için bütüncül SEO stratejisi.",
          span: "",
          href: "/hizmetler/sakarya-seo-ajansi",
          footerText: "Strateji → Uygulama → Rapor",
        },
        {
          icon: "shopping-cart",
          tag: "Commerce Ops",
          num: "03",
          title: "E-ticaret Kurulum & Yönetim",
          description:
            "ikas, Shopify üzerinde baştan sona e-ticaret kurulumu ve operasyonel yönetim.",
          span: "",
          href: "/hizmetler/serdivan-dijital-pazarlama-ajansi",
          footerText: "Strateji → Uygulama → Rapor",
        },
        {
          icon: "share-2",
          tag: "Content System",
          num: "04",
          title: "Sosyal Medya Yönetimi",
          description:
            "Markanıza özel içerik takvimi, topluluk yönetimi ve büyüme odaklı strateji.",
          span: "",
          href: "/hizmetler/sakarya-sosyal-medya-ajansi",
          footerText: "Strateji → Uygulama → Rapor",
        },
        {
          icon: "pen-tool",
          tag: "Conversion Design",
          num: "05",
          title: "UI/UX & Kreatif Üretim",
          description:
            "Dönüşüm oranını artıran landing page tasarımları, reklam kreatifleri ve marka görselleri.",
          span: "",
          href: "/hizmetler/sakarya-web-tasarim-ve-landing-page",
          footerText: "Strateji → Uygulama → Rapor",
        },
        {
          icon: "globe",
          tag: "International Reach",
          num: "06",
          title: "Sağlık Turizmi Pazarlama",
          description:
            "Uluslararası hastalara ulaşmak için çok dilli SEO, hedefli reklam ve landing page stratejisi.",
          span: "",
          href: "/hizmetler/serdivan-dijital-pazarlama-ajansi",
          footerText: "Strateji → Uygulama → Rapor",
        },
      ],
    },
    process: {
      eyebrow: "Çalışma Modeli",
      title: "Nasıl çalışıyoruz?",
      description:
        "Dört adımlık yapımız, proje başından ölçüme kadar her aşamada netlik ve hız sağlar.",
      steps: [
        {
          num: "01",
          icon: "search",
          title: "Analiz & Keşif",
          description:
            "Mevcut kanallarınızı, rakiplerinizi ve hedef kitlenizi derinlemesine analiz ediyoruz. Veri olmadan strateji olmaz.",
          detail: "Audit · Benchmark · Persona",
        },
        {
          num: "02",
          icon: "lightbulb",
          title: "Strateji Geliştirme",
          description:
            "Bulguları eyleme dönüştürüyoruz. Hangi kanal, hangi mesaj, hangi bütçeyle? Net bir yol haritası oluşturuyoruz.",
          detail: "Roadmap · Kanal Mix · KPI",
        },
        {
          num: "03",
          icon: "rocket",
          title: "Uygulama & Test",
          description:
            "Kampanyaları başlatıyor, kreatifleri yayıyor, landing page'leri canlıya alıyoruz. A/B testlerle hızla öğreniyoruz.",
          detail: "Launch · A/B Test · CRO",
        },
        {
          num: "04",
          icon: "trending-up",
          title: "Ölçüm & Büyüme",
          description:
            "Haftalık raporlar, aylık strateji güncellemeleri. Veriye dayalı kararlarla ölçeği ve ROAS'ı sürekli artırıyoruz.",
          detail: "Rapor · Optimizasyon · Scale",
        },
      ],
    },
    testimonials: {
      eyebrow: "Müşteri Görüşleri",
      title: "Sonuçlar konuşuyor.",
      featured: {
        quote:
          "Serdivan Dijital Pazarlama Ajansı ekibi, Google Ads hesabımızı devraldıktan sonraki 3 ayda ROAS'ımızı %280'den %430'a çıkardı. Sadece reklam değil, tüm funnel'ı yeniden kurdular.",
        name: "Ahmet Yılmaz",
        role: "E-ticaret Direktörü",
        company: "ModaShop",
        metric: "%430 ROAS",
        metricLabel: "3. ayda ulaşılan oran",
        avatar: "https://i.pravatar.cc/80?u=ahmet-yilmaz",
      },
      items: [
        {
          quote:
            "Sağlık turizmi alanında yabancı hasta hedefleme konusunda gerçekten uzman bir ekip. İngilizce ve Arapça kampanyalarımız mükemmel sonuç verdi.",
          name: "Dr. Selin Kaya",
          role: "Klinik Direktörü",
          company: "EstheticMed İstanbul",
          avatar: "https://i.pravatar.cc/60?u=selin-kaya",
        },
        {
          quote:
            "Haftalık raporları ve şeffaf iletişimleri çok değerli. Her zaman ne yaptıklarını ve neden yaptıklarını açıklıyorlar.",
          name: "Murat Demir",
          role: "Kurucu",
          company: "TechGadget TR",
          avatar: "https://i.pravatar.cc/60?u=murat-demir",
        },
        {
          quote:
            "ikas mağazamızın organik trafiği 4 ayda 3 katına çıktı. SEO stratejileri uzun vadeli gerçekten işe yarıyor.",
          name: "Zeynep Arslan",
          role: "CMO",
          company: "EcoHome Market",
          avatar: "https://i.pravatar.cc/60?u=zeynep-arslan",
        },
      ],
    },
    cta: {
      eyebrow: "Sonraki Adım",
      title: "Büyümeye hazır mısınız?\nKonuşalım.",
      titleHighlight: "Konuşalım.",
      description:
        "Ücretsiz strateji görüşmesinde hedef kanalınızı, bütçe yapınızı ve landing page ihtiyacınızı birlikte netleştirelim. Sonrası hız.",
      trustChips: [
        "Ücretsiz ilk görüşme",
        "48 saat içinde dönüş",
        "Uzun vadeli taahhüt yok",
      ],
      primaryCta: {
        href: "/iletisim",
        label: "Ücretsiz Görüşme Ayarla",
      },
      secondaryCta: {
        href: "/blog",
        label: "Önce içerikleri incele",
      },
    },
  },
  about: {
    seo: {
      title: "Hakkımızda | Dijital Pazarlama Ekibi ve Çalışma Modeli",
      description:
        "Serdivan Dijital Pazarlama Ajansı ekibini, değerlerini ve büyüme odaklı çalışma modelini inceleyin.",
      keywords: [
        "Serdivan dijital pazarlama ekibi",
        "Sakarya reklam ajansı ekibi",
        "dijital pazarlama ajansı hakkında",
      ],
      canonical: "/hakkimizda",
      openGraphTitle: "Hakkımızda",
      openGraphDescription:
        "Ekibimizi, çalışma modelimizi ve büyüme odaklı yaklaşımımızı tanıyın.",
    },
    hero: {
      eyebrow: "Hakkımızda",
      title: "Büyümeyi birlikte\ntasarlıyoruz.",
      titleHighlight: "birlikte",
      description:
        "Creamake olarak 5+ yıldır e-ticaret ve sağlık turizmi sektörlerine özel performance-driven dijital pazarlama çözümleri sunuyoruz. 700+ markaya büyüme hikayelerine ortak olduk.",
    },
    stats: [
      { value: "5+", label: "Yıllık Deneyim" },
      { value: "700+", label: "Desteklenen Marka" },
      { value: "15+", label: "Ekip Üyesi" },
      { value: "%340", label: "Ort. ROAS" },
    ],
    mission: {
      title: "Misyonumuz",
      icon: "target",
      body:
        "E-ticaret ve sağlık turizmi sektörlerinde faaliyet gösteren işletmelerin dijital dünyada maksimum potansiyellerine ulaşmalarını sağlamak. Modern pazarlama teknikleri ve veri odaklı stratejilerle markaların büyümesine katkıda bulunmak.",
    },
    vision: {
      title: "Vizyonumuz",
      icon: "eye",
      body:
        "Türkiye'nin e-ticaret ve sağlık turizmi alanında en güvenilir ve yenilikçi dijital pazarlama ajansı olmak. Uluslararası standartlarda hizmet sunarak sektörde öncü konumda yer almak.",
    },
    values: {
      eyebrow: "Değerlerimiz",
      title: "Bizi biz yapan prensipler.",
      titleHighlight: "prensipler.",
      items: [
        {
          icon: "target",
          title: "Müşteri Odaklılık",
          description:
            "Her projede müşteri memnuniyetini ve ölçülebilir sonuçları ön planda tutuyoruz.",
        },
        {
          icon: "lightbulb",
          title: "İnovasyon",
          description:
            "En güncel platform algoritmalarını, kreatif formatları ve veri araçlarını kullanıyoruz.",
        },
        {
          icon: "eye",
          title: "Şeffaflık",
          description:
            "Haftalık raporlar ve açık iletişimle tüm süreçleri birlikte yönetiyoruz.",
        },
        {
          icon: "trending-up",
          title: "Sonuç Odaklılık",
          description:
            "Ölçülebilir KPI'lar ve ROAS hedefleriyle büyümeyi veri ile yönetiyoruz.",
        },
      ],
    },
    team: {
      eyebrow: "Ekibimiz",
      title: "Arkasındaki insanlar.",
      titleHighlight: "insanlar.",
      items: [
        {
          name: "Özgür Yaşacan",
          role: "Kurucu & CEO",
          description:
            "5+ yıllık dijital pazarlama deneyimi, e-ticaret ve sağlık turizmi odaklı büyüme stratejileri.",
          avatar: "https://i.pravatar.cc/120?u=ozgur-yasacan",
        },
        {
          name: "Mesut Adıgüzel",
          role: "Proje Koordinatörü",
          description:
            "Müşteri ilişkileri, proje yönetimi ve operasyonel süreçlerin koordinasyonu.",
          avatar: "https://i.pravatar.cc/120?u=mesut-adiguzel",
        },
        {
          name: "Ekip Üyelerimiz",
          role: "15+ Profesyonel",
          description:
            "Tasarım, yazılım, paid media, SEO ve içerik alanında uzman kadromuz.",
          avatar: "https://i.pravatar.cc/120?u=creamake-team",
        },
      ],
    },
    cta: {
      title: "Ekibimizle çalışmak ister misiniz?",
      description:
        "Ücretsiz ilk görüşmede projenizi dinleyelim, size özel bir strateji çizelim.",
      button: { href: "/iletisim", label: "Görüşme Ayarla" },
    },
  },
  servicesIndex: {
    seo: {
      title: "Hizmetler | Sakarya Reklam Ajansı ve SEO Çözümleri",
      description:
        "Serdivan Dijital Pazarlama Ajansı'nın Sakarya reklam ajansı, Sakarya SEO ajansı, sosyal medya yönetimi ve landing page optimizasyonu hizmetlerini inceleyin.",
      keywords: [
        "Sakarya reklam ajansı",
        "Sakarya SEO ajansı",
        "Serdivan dijital pazarlama",
      ],
      canonical: "/hizmetler",
      openGraphTitle: "Hizmetler",
      openGraphDescription:
        "Serdivan ve Sakarya odaklı SEO, reklam, sosyal medya ve landing page hizmet sayfalarını inceleyin.",
    },
    hero: {
      eyebrow: "Hizmet Sayfaları",
      title: "Sakarya ve Serdivan için\nSEO uyumlu hizmet kümeleri",
      titleHighlight: "SEO uyumlu hizmet kümeleri",
      description:
        "Lokal arama niyeti taşıyan kullanıcıların en çok aradığı reklam, SEO, sosyal medya ve landing page hizmetlerini ayrı landing page yapısında kurguladık. Böylece hem kullanıcı deneyimi hem arama motoru sinyali daha net hale geliyor.",
      keywordCluster: [
        "Serdivan Dijital Pazarlama",
        "Sakarya Reklam Ajansı",
        "Sakarya Reklam Ajansları",
        "Sakarya SEO Ajansı",
        "Sakarya Sosyal Medya Ajansı",
        "Sakarya Web Tasarım",
      ],
    },
  },
  contact: {
    seo: {
      title: "İletişim | Ücretsiz Görüşme ve Teklif Formu",
      description:
        "Projenizi konuşmak ve size nasıl yardımcı olabileceğimizi öğrenmek için iletişime geçin.",
      keywords: [
        "Serdivan iletişim",
        "Sakarya dijital pazarlama iletişim",
        "ücretsiz teklif formu",
      ],
      canonical: "/iletisim",
      openGraphTitle: "İletişim",
      openGraphDescription:
        "Ücretsiz görüşme ve teklif formu üzerinden bize ulaşın.",
    },
    hero: {
      eyebrow: "İletişim",
      title: "Birlikte büyüyelim.",
      titleHighlight: "büyüyelim.",
      description:
        "Projenizi konuşmak ve size nasıl yardımcı olabileceğimizi öğrenmek için hemen iletişime geçin.",
    },
    infoTitle: "Bize Ulaşın",
    infoDescription:
      "Formu doldurarak veya aşağıdaki iletişim kanallarından bize ulaşabilirsiniz. 48 saat içinde dönüş yapıyoruz.",
    contactItems: [
      {
        icon: "mail",
        label: "E-posta",
        value: "info@creamake.com",
        href: "mailto:info@creamake.com",
      },
      {
        icon: "phone",
        label: "Telefon",
        value: "+90 XXX XXX XX XX",
        href: "tel:+90",
      },
      {
        icon: "map-pin",
        label: "Adres",
        value: "İstanbul, Türkiye",
        href: "",
      },
      {
        icon: "clock",
        label: "Çalışma Saatleri",
        value: "Pazartesi – Cuma: 09:00–18:00",
        href: "",
      },
    ],
    trustNote: {
      eyebrow: "Taahhüdümüz",
      body:
        "İlk görüşme tamamen ücretsiz. Sizi herhangi bir sözleşmeye bağlamadan önce projenizi dinleyip en uygun stratejiyi sunuyoruz.",
    },
    form: {
      title: "Teklif Formu",
      successTitle: "Mesajınız Alındı!",
      successDescription:
        "En kısa sürede, genellikle 48 saat içinde sizinle iletişime geçeceğiz.",
      submitLabel: "Gönder",
      loadingLabel: "Gönderiliyor…",
      fields: {
        nameLabel: "Ad Soyad *",
        namePlaceholder: "Ad Soyad",
        emailLabel: "E-posta *",
        emailPlaceholder: "ornek@sirket.com",
        phoneLabel: "Telefon",
        phonePlaceholder: "+90 5XX XXX XX XX",
        companyLabel: "Şirket",
        companyPlaceholder: "Şirket adı",
        serviceLabel: "İlgilendiğiniz Hizmet",
        servicePlaceholder: "Seçiniz",
        messageLabel: "Mesajınız *",
        messagePlaceholder:
          "Projeniz ve hedefleriniz hakkında kısaca bilgi verin...",
      },
      serviceOptions: [
        "Dijital Reklam Yönetimi",
        "SEO & İçerik Pazarlama",
        "E-ticaret Kurulum",
        "Sosyal Medya Yönetimi",
        "UI/UX Tasarım",
        "Sağlık Turizmi Pazarlama",
      ],
    },
  },
  blogIndex: {
    seo: {
      title: "Blog | Sakarya SEO, Reklam ve Lokal Pazarlama İçerikleri",
      description:
        "Serdivan Dijital Pazarlama blogunda Sakarya reklam ajansı, Sakarya SEO ajansı, Google Ads yönetimi, sosyal medya ve landing page optimizasyonu odaklı içerikleri inceleyin.",
      keywords: [
        "Sakarya SEO blog",
        "Sakarya reklam ajansı blog",
        "Serdivan dijital pazarlama içerikleri",
      ],
      canonical: "/blog",
      openGraphTitle: "Blog",
      openGraphDescription:
        "Sakarya ve Serdivan için yüksek niyetli SEO, reklam ve pazarlama içerikleri.",
    },
    hero: {
      eyebrow: "Blog",
      title: "Sakarya ve Serdivan için\nyüksek niyetli içerikler.",
      titleHighlight: "yüksek niyetli içerikler.",
      description:
        "Blog içeriklerimizi hizmet sayfalarını besleyecek şekilde kurguladık. Böylece hem kullanıcılar aradığı cevaba daha hızlı ulaşıyor hem de arama motorları konu otoritemizi daha net anlıyor.",
      topicClusters: [
        "Sakarya Reklam Ajansı",
        "Sakarya SEO Ajansı",
        "Serdivan Dijital Pazarlama",
        "Sakarya Google Ads Yönetimi",
        "Sakarya Sosyal Medya Ajansı",
        "Sakarya Web Tasarım",
      ],
    },
    featuredLabel: "Öne Çıkan",
  },
  serviceLandingPages,
  blogPosts: withBlogDefaults(blogPosts),
};
