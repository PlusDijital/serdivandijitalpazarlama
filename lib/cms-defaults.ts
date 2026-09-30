import { blogA } from "@/content/blog-a";
import { blogB } from "@/content/blog-b";
import { blogC } from "@/content/blog-c";
import { servicesA } from "@/content/services-a";
import { servicesB } from "@/content/services-b";
import type { BlogPost, CmsData } from "@/lib/cms-types";

type BlogPostContent = Omit<BlogPost, "coverImage" | "publishedAt" | "updatedAt" | "authorName">;

const serviceLandingPages = [...servicesA, ...servicesB];

const SITE_URL = "https://serdivanreklamajansi.com";
const EMAIL = "info@serdivanreklamajansi.com";

function withBlogDefaults(posts: BlogPostContent[]): BlogPost[] {
  return posts.map((post) => ({
    coverImage: "",
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-30",
    authorName: "Serdivan Reklam Ajansı Ekibi",
    ...post,
  }));
}

export const defaultCmsData: CmsData = {
  site: {
    siteUrl: SITE_URL,
    brandName: "Serdivan Reklam Ajansı",
    brandShortName: "Serdivan Reklam",
    logoInitial: "S",
    applicationName: "Serdivan Reklam Ajansı",
    defaultSeo: {
      defaultTitle: "Serdivan Reklam Ajansı | Google Ads, Instagram Reklam, SEO ve Web Tasarım",
      titleTemplate: "%s | Serdivan Reklam Ajansı",
      description:
        "Serdivan Reklam Ajansı; Serdivan ve Sakarya'daki işletmeler için Google Ads, Instagram reklamları, SEO, sosyal medya yönetimi ve web tasarım hizmeti verir. Ücretsiz teklif alın.",
      keywords: [
        "Serdivan reklam ajansı",
        "Serdivan reklamcı",
        "Serdivan reklam",
        "Serdivan ajans",
        "Serdivan dijital reklam ajansı",
        "Serdivan web tasarım",
        "Serdivan SEO",
        "Serdivan Google Ads",
      ],
      openGraphTitle: "Serdivan Reklam Ajansı | Google Ads, Instagram Reklam, SEO ve Web Tasarım",
      openGraphDescription:
        "Serdivan'daki işletmelerin Google'da, haritalarda, Instagram'da ve yapay zeka aramalarında müşteri bulmasını sağlıyoruz. Şeffaf raporlama, yerel ekip.",
      twitterTitle: "Serdivan Reklam Ajansı",
      twitterDescription:
        "Serdivan ve Sakarya'daki işletmeler için reklam yönetimi, SEO ve web tasarım.",
    },
    parentBrand: {
      name: "Plus Dijital",
      url: "https://plusdijital.com",
      description:
        "Serdivan Reklam Ajansı, Sakarya merkezli Google Partner ajans Plus Dijital'in yerel markasıdır.",
    },
    business: {
      // Telefon girildiğinde sitede, schema'da ve llms.txt'de otomatik görünür.
      phone: "",
      // Plus Dijital WhatsApp hattı (plusdijital.com'da herkese açık). Boş bırakılırsa butonlar gizlenir.
      whatsapp: "905396108154",
      email: EMAIL,
      // Açık adres yok: hizmet bölgesi işletmesi olarak işaretlenir.
      streetAddress: "",
      areaServed: ["Serdivan", "Adapazarı", "Erenler", "Sakarya"],
      googleBusinessProfileUrl: "",
      sameAs: ["https://plusdijital.com"],
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
    topPrompt: "Serdivan'da işletmeniz var mı?",
    topTitle: "Ücretsiz analiz ve teklif için bize WhatsApp'tan yazın, hızlıca dönelim.",
    topCta: { href: "/iletisim", label: "Teklif Al" },
    brandDescription:
      "Serdivan ve Sakarya'daki işletmeler için Google Ads, Instagram reklamları, SEO, sosyal medya yönetimi ve web tasarım hizmeti veren yerel reklam ajansı.",
    quickLinksTitle: "Sayfalar",
    serviceLinksTitle: "Hizmetler",
    contactTitle: "İletişim",
    socialLinks: [],
    quickLinks: [
      { href: "/", label: "Ana Sayfa" },
      { href: "/hizmetler", label: "Hizmetler" },
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/blog", label: "Blog" },
      { href: "/iletisim", label: "İletişim" },
    ],
    serviceLinks: [
      { href: "/hizmetler/serdivan-google-ads-yonetimi", label: "Google Ads Yönetimi" },
      { href: "/hizmetler/serdivan-instagram-reklam-yonetimi", label: "Instagram Reklam Yönetimi" },
      { href: "/hizmetler/serdivan-seo-ajansi", label: "Serdivan SEO" },
      { href: "/hizmetler/serdivan-sosyal-medya-ajansi", label: "Sosyal Medya Yönetimi" },
      { href: "/hizmetler/serdivan-web-tasarim", label: "Serdivan Web Tasarım" },
      { href: "/hizmetler/serdivan-dijital-pazarlama-ajansi", label: "Dijital Pazarlama" },
      { href: "/hizmetler/serdivan-geo-yapay-zeka-arama-optimizasyonu", label: "GEO / Yapay Zeka Arama" },
    ],
    contactItems: [
      { icon: "mail", label: "E-posta", value: EMAIL, href: `mailto:${EMAIL}` },
      {
        icon: "send",
        label: "WhatsApp",
        value: "0539 610 81 54",
        href: "https://wa.me/905396108154",
      },
      {
        icon: "map-pin",
        label: "Hizmet bölgesi",
        value: "Serdivan, Adapazarı, Erenler ve Sakarya",
        href: "",
      },
    ],
    workingHoursLabel: "Çalışma Saatleri",
    workingHoursValue: "Pzt – Cuma: 09:00–18:00",
    copyrightText: "© {year} Serdivan Reklam Ajansı. Tüm hakları saklıdır.",
    legalLinks: [],
  },
  home: {
    seo: {
      title: "Serdivan Reklam Ajansı | Google Ads, Instagram Reklam, SEO ve Web Tasarım",
      description:
        "Serdivan reklam ajansı: Google Ads, Instagram reklamları, SEO, sosyal medya ve web tasarımı tek ekipten alın. Adres değil sonuç odaklı, şeffaf raporlu yerel ajans. Ücretsiz teklif.",
      keywords: [
        "Serdivan reklam ajansı",
        "Serdivan reklamcı",
        "Serdivan reklam",
        "Serdivan ajans",
        "Serdivan dijital reklam ajansı",
      ],
      canonical: "/",
      openGraphTitle: "Serdivan Reklam Ajansı",
      openGraphDescription:
        "Serdivan'daki işletmeler için Google Ads, Instagram reklamları, SEO ve web tasarımla ölçülebilir müşteri kazanımı.",
    },
    hero: {
      eyebrow: "Serdivan · Sakarya",
      title: "Serdivan Reklam Ajansı",
      titleHighlight: "Reklam Ajansı",
      description:
        "Serdivan'daki işletmenizin Google'da, haritalarda, Instagram'da ve yapay zeka aramalarında sizi arayan müşteriye görünmesini sağlıyoruz. Reklam, SEO ve web sitesi tek plan, tek rapor.",
      primaryCta: { href: "/iletisim", label: "Ücretsiz Teklif Al" },
      secondaryCta: { href: "/hizmetler", label: "Hizmetleri İncele" },
      trustPoints: [
        { icon: "shield-check", text: "Google Partner ekip, Plus Dijital güvencesi" },
        { icon: "map-pin", text: "Serdivan'ı ve Sakarya pazarını yerinden tanıyoruz" },
        { icon: "file-text", text: "Reklam hesabı sizin adınıza, rapor her ay" },
      ],
    },
    summary:
      "Serdivan Reklam Ajansı, Sakarya'nın Serdivan ilçesindeki kafe, klinik, emlak ofisi, eğitim kurumu, e-ticaret ve hizmet işletmeleri için Google Ads, Instagram ve Facebook reklamları, yerel SEO, sosyal medya yönetimi ve web tasarım hizmeti veren yerel bir reklam ajansıdır. Amacı, reklam bütçesini telefon, form ve satış gibi ölçülebilir müşteri aksiyonlarına dönüştürmektir.",
    services: {
      eyebrow: "Hizmetler",
      title: "Serdivan'da işletmenize müşteri getiren yedi hizmet",
      description:
        "Her hizmetin kapsamını, sürecini ve fiyatı etkileyen unsurları kendi sayfasında açıkça anlattık. Emin değilseniz ücretsiz görüşmede birlikte seçelim.",
      cards: [
        {
          icon: "search",
          brand: "googleads",
          title: "Google Ads Yönetimi",
          description:
            "Serdivan ve çevresinde sizi arayan müşteriye arama anında görünün. Dönüşüm takibi, negatif kelime ve konum ayarı dahil.",
          href: "/hizmetler/serdivan-google-ads-yonetimi",
        },
        {
          icon: "instagram",
          brand: "instagram",
          title: "Instagram ve Facebook Reklamları",
          description:
            "Henüz aramaya başlamamış kitleye görsel ve video reklamla ulaşın; kafe, güzellik, perakende ve etkinlik için ideal.",
          href: "/hizmetler/serdivan-instagram-reklam-yonetimi",
        },
        {
          icon: "map-pin",
          brand: "googlemaps",
          title: "Yerel SEO",
          description:
            "\"Serdivan\" ve \"yakınımda\" aramalarında ve Google Haritalar'da üst sıralara çıkın; reklama bağımlılığı azaltın.",
          href: "/hizmetler/serdivan-seo-ajansi",
        },
        {
          icon: "share-2",
          title: "Sosyal Medya Yönetimi",
          description:
            "İçerik takvimi, görsel üretim ve topluluk yönetimi. Reklamla birlikte çalışan, güven oluşturan hesaplar.",
          href: "/hizmetler/serdivan-sosyal-medya-ajansi",
        },
        {
          icon: "pen-tool",
          title: "Web Tasarım ve Landing Page",
          description:
            "Hızlı, mobil uyumlu ve arama motoru dostu siteler. Reklamdan gelen ziyaretçiyi müşteriye çeviren sayfalar.",
          href: "/hizmetler/serdivan-web-tasarim",
        },
        {
          icon: "bar-chart-3",
          title: "Dijital Pazarlama Yönetimi",
          description:
            "Reklam, SEO, sosyal medya ve web sitesini tek strateji ve tek raporla yöneten bütüncül plan.",
          href: "/hizmetler/serdivan-dijital-pazarlama-ajansi",
        },
        {
          icon: "globe",
          title: "GEO / Yapay Zeka Arama",
          description:
            "ChatGPT, Gemini ve Google AI Overviews cevaplarında işletmenizin önerilme ihtimalini artırın.",
          href: "/hizmetler/serdivan-geo-yapay-zeka-arama-optimizasyonu",
        },
      ],
    },
    local: {
      eyebrow: "Neden yerel bir ajans?",
      title: "Serdivan'ı ve müşterinizin nereden geldiğini biliyoruz",
      description:
        "Serdivan; Sakarya Üniversitesi Esentepe Kampüsü, Arabacıalanı ve 32 Evler gibi bölgeleriyle Adapazarı'na komşu, nüfusu hızla büyüyen bir ilçe. Müşteriler iki ilçe arasında sürekli hareket eder; reklam hedeflemesi ve içerik bu gerçeğe göre kurulmalı.",
      points: [
        {
          icon: "map",
          title: "Doğru konum hedeflemesi",
          description:
            "Sadece ilçe sınırı değil, işletmenizin gerçek hizmet alanı: yarıçap, komşu mahalleler ve Adapazarı geçişleri.",
        },
        {
          icon: "graduation-cap",
          title: "Kampüs takvimi",
          description:
            "Öğrenciye hitap eden işletmelerde dönem başı, sınav haftası ve yaz tatili farklı talep yaratır; bütçe buna göre planlanır.",
        },
        {
          icon: "clock",
          title: "Cevap verebildiğiniz saatler",
          description:
            "Telefonla dönüşen işletmelerde reklamlar, aramaya cevap verilebilen saatlere yoğunlaştırılır; bütçe boşa gitmez.",
        },
      ],
      areas: [
        "Arabacıalanı",
        "Esentepe Kampüs çevresi",
        "32 Evler",
        "Serdivan AVM çevresi",
        "Kemalpaşa",
        "İstiklal",
        "Bahçelievler",
        "Adapazarı",
        "Erenler",
      ],
    },
    process: {
      eyebrow: "Nasıl çalışıyoruz?",
      title: "Dört adım, sürpriz yok",
      description:
        "İlk görüşmeden aylık rapora kadar her adımda ne yapıldığını ve neden yapıldığını görürsünüz.",
      steps: [
        {
          icon: "search",
          title: "Ücretsiz analiz",
          description:
            "Web siteniz, Google İşletme Profiliniz, reklam hesaplarınız ve rakipleriniz incelenir; hızlı kazanımlar listelenir.",
        },
        {
          icon: "lightbulb",
          title: "Plan ve teklif",
          description:
            "Hangi kanal, hangi bütçe, hangi hedef? Kapsamı ve medya bütçesini ayrı yazan net bir teklif alırsınız.",
        },
        {
          icon: "rocket",
          title: "Kurulum ve yayın",
          description:
            "Dönüşüm takibi, kampanyalar ve gerekiyorsa açılış sayfası kurulur. Hesaplar sizin adınıza açılır.",
        },
        {
          icon: "trending-up",
          title: "Ölçüm ve iyileştirme",
          description:
            "Haftalık kontrol, aylık rapor. Sonuç getirmeyen kalemler kesilir, bütçe işe yarayana kaydırılır.",
        },
      ],
    },
    sectors: {
      eyebrow: "Kimlerle çalışıyoruz?",
      title: "Serdivan'daki yerel işletmeler için",
      description:
        "Her sektörün müşteri bulma yolu farklı. Kanal seçimini ve mesajı sektörünüze göre kuruyoruz.",
      items: [
        {
          icon: "coffee",
          title: "Kafe ve restoran",
          description: "Instagram görünürlüğü, Google Haritalar yorumları ve kampüs takvimine göre kampanyalar.",
        },
        {
          icon: "stethoscope",
          title: "Klinik ve sağlık",
          description: "Randevu odaklı Google Ads, güven veren web sitesi ve yerel SEO.",
        },
        {
          icon: "home",
          title: "Emlak ve inşaat",
          description: "Proje bazlı reklam kampanyaları, form ve WhatsApp dönüşüm takibi.",
        },
        {
          icon: "graduation-cap",
          title: "Eğitim ve kurs",
          description: "Kayıt dönemine göre planlanan reklamlar ve öğrenci kitlesine uygun içerik.",
        },
        {
          icon: "shopping-cart",
          title: "E-ticaret",
          description: "Performance Max, ürün kataloğu reklamları ve dönüşüm oranı iyileştirme.",
        },
        {
          icon: "wrench",
          title: "Hizmet işletmeleri",
          description: "Tesisat, tamir, nakliye gibi acil ihtiyaçlarda arama anında görünen Google reklamları.",
        },
      ],
    },
    faq: {
      eyebrow: "Sık sorulan sorular",
      title: "Serdivan'da reklam ajansı seçerken merak edilenler",
      items: [
        {
          question: "Serdivan reklam ajansı hangi hizmetleri verir?",
          answer:
            "Google Ads ve Instagram/Facebook reklam yönetimi, yerel SEO, sosyal medya yönetimi, web tasarım ve yapay zeka aramaları için GEO çalışması yapıyoruz. Tabela, matbaa veya baskı işi yapmıyoruz; odağımız dijital kanallardan ölçülebilir müşteri kazanımı.",
        },
        {
          question: "Ofisiniz nerede, yüz yüze görüşebilir miyiz?",
          answer:
            "Serdivan Reklam Ajansı, Sakarya merkezli Plus Dijital'in yerel markasıdır ve Serdivan'da hizmet verir. İlk görüşmeler genellikle çevrim içi yapılır; ihtiyaç halinde Serdivan veya Adapazarı'nda yüz yüze toplantı planlanabilir. Başvuru için iletişim formunu kullanabilirsiniz.",
        },
        {
          question: "Reklam ajansı ücreti ile reklam bütçesi aynı şey mi?",
          answer:
            "Hayır. Reklam bütçesi Google veya Meta'ya doğrudan ödenir ve reklam gösterimi için harcanır. Ajans ücreti kurulum, optimizasyon, kreatif ve raporlama emeğinin karşılığıdır. Tekliflerimizde iki kalem ayrı yazılır.",
        },
        {
          question: "Ne kadar sürede sonuç alırım?",
          answer:
            "Google Ads ve Instagram reklamları genellikle ilk haftalarda talep üretmeye başlar; verimli hale gelmesi birkaç haftalık veri ister. Yerel SEO'da belirgin etki çoğunlukla 3-6 ay içinde görülür. Bu yüzden kısa vadeli reklam ile uzun vadeli SEO'yu birlikte öneriyoruz.",
        },
        {
          question: "Küçük bir işletmeyim, minimum bütçe ne kadar?",
          answer:
            "Anlamlı veri toplamak için ilk ay birkaç düzine tıklama ve birkaç dönüşüm alacak bir bütçe gerekir; kesin tutar sektörün tıklama maliyetine göre değişir. Ücretsiz analizde sektörünüze uygun başlangıç bütçesini net olarak söylüyoruz.",
        },
        {
          question: "Reklam hesabı kimin adına olur?",
          answer:
            "Sizin adınıza. Hesaplar ve ödeme yöntemi işletmenin kendi adına kurulur, biz yönetici erişimiyle çalışırız. Böylece geçmiş veriler ve kitleler her zaman sizde kalır.",
        },
      ],
    },
    caseStudies: {
      eyebrow: "Vaka çalışmaları",
      title: "Serdivan'daki işletmelerle yaptığımız işler",
      description:
        "Müşterilerimizin izniyle paylaştığımız örnekler: başlangıç durumu, yaptığımız çalışma ve ölçülen sonuç.",
      // Gerçek ve izinli örnekler eklendiğinde bölüm ana sayfada görünür. Şablon: docs/vaka-calismasi-sablonu.md
      items: [],
    },
    trust: {
      eyebrow: "Plus Dijital güvencesi",
      title: "Yerel marka, kurumsal altyapı",
      description:
        "Serdivan Reklam Ajansı, Sakarya merkezli ve Türkiye genelinde çalışan Google Partner ajans Plus Dijital'in Serdivan'a odaklanan yerel markasıdır. Küçük işletmeye yakın bir ekip, arkasında kurumsal deneyim.",
      points: [
        "Google Partner sertifikalı reklam yönetimi",
        "Reklam hesapları ve veriler işletmenin adına",
        "Medya bütçesi ile hizmet bedeli ayrı raporlanır",
        "Uzun vadeli sözleşme zorunluluğu yok",
      ],
      cta: { href: "https://plusdijital.com", label: "Plus Dijital'i incele" },
    },
    cta: {
      eyebrow: "Sonraki adım",
      title: "Serdivan'da müşteri bulmayı konuşalım",
      description:
        "Formu doldurun ya da WhatsApp'tan yazın; web sitenizi, Google profilinizi ve reklam hesabınızı ücretsiz inceleyip somut önerilerle dönelim.",
      trustChips: ["Ücretsiz analiz", "WhatsApp'tan hızlı dönüş", "Taahhüt yok"],
      primaryCta: { href: "/iletisim", label: "Ücretsiz Teklif Al" },
      secondaryCta: { href: "/blog", label: "Önce rehberleri oku" },
    },
  },
  about: {
    seo: {
      title: "Hakkımızda: Serdivan'ın Yerel Reklam Ajansı",
      description:
        "Serdivan Reklam Ajansı kimdir, nasıl çalışır, Plus Dijital ile ilişkisi nedir? Ekibimizi ve çalışma modelimizi tanıyın.",
      keywords: ["Serdivan reklam ajansı hakkında", "Plus Dijital Serdivan", "Sakarya reklam ajansı ekibi"],
      canonical: "/hakkimizda",
      openGraphTitle: "Hakkımızda",
      openGraphDescription: "Serdivan Reklam Ajansı'nın ekibi, çalışma modeli ve Plus Dijital ilişkisi.",
    },
    hero: {
      eyebrow: "Hakkımızda",
      title: "Serdivan'daki işletmeler için çalışan yerel bir reklam ekibi",
      description:
        "Serdivan Reklam Ajansı olarak Serdivan ve Sakarya'daki işletmelerin Google'da, haritalarda, sosyal medyada ve yapay zeka aramalarında bulunmasını sağlıyoruz. Her çalışmayı ölçülebilir hedefe bağlıyor, raporu sade bir dille anlatıyoruz.",
    },
    summary:
      "Serdivan Reklam Ajansı, Sakarya merkezli Google Partner ajans Plus Dijital'in Serdivan ilçesine odaklanan yerel markasıdır. Kafe, klinik, emlak, eğitim ve hizmet işletmeleri için Google Ads, Instagram reklamları, yerel SEO, sosyal medya ve web tasarım hizmeti verir; tabela veya baskı işi yapmaz.",
    mission: {
      title: "Misyonumuz",
      icon: "target",
      body:
        "Serdivan'daki işletmelerin, kendilerini arayan müşteriye doğru kanalda ve doğru zamanda ulaşmasını sağlamak; reklam, SEO ve web sitesini ölçülebilir bir müşteri kazanma sistemine dönüştürmek.",
    },
    vision: {
      title: "Vizyonumuz",
      icon: "eye",
      body:
        "Serdivan'da bir işletme reklam veya dijital pazarlama için güvenilir bir ekip aradığında akla gelen ilk yerel ajans olmak.",
    },
    values: {
      eyebrow: "Nasıl çalışıyoruz?",
      title: "Dört prensip",
      items: [
        {
          icon: "eye",
          title: "Şeffaflık",
          description: "Medya bütçesi ile hizmet bedeli ayrı yazılır; reklam hesabı işletmenin adına açılır.",
        },
        {
          icon: "target",
          title: "Sonuç odağı",
          description: "Tıklama değil telefon, form ve satış sayarız. Her rapor bir karar listesiyle biter.",
        },
        {
          icon: "map-pin",
          title: "Yerel bilgi",
          description: "Serdivan'ın mahallelerini, kampüs takvimini ve Adapazarı geçişlerini planlamaya katarız.",
        },
        {
          icon: "lightbulb",
          title: "Sade anlatım",
          description: "Jargon yok. Ne yaptığımızı ve neden yaptığımızı işletme sahibinin diliyle anlatırız.",
        },
      ],
    },
    parentBrand: {
      eyebrow: "Plus Dijital",
      title: "Arkamızdaki kurumsal ekip",
      body:
        "Plus Dijital, Sakarya merkezli ve Türkiye genelinde çalışan bir Google Partner dijital reklam ajansıdır. Serdivan Reklam Ajansı, bu ekibin Serdivan'daki yerel işletmelere odaklanan markasıdır; aynı uzmanlık, ilçeye özel plan.",
      inlineLink: {
        before: "Plus Dijital'in Arabacıalanı'ndaki ofisini ve kurumsal hizmetlerini tanımak için ",
        link: { href: "https://plusdijital.com/serdivan-reklam-ajansi/", label: "Serdivan reklam ajansı" },
        after: " sayfasına göz atabilirsiniz.",
      },
      cta: { href: "https://plusdijital.com", label: "plusdijital.com" },
    },
    team: {
      eyebrow: "Ekip",
      title: "Projenizi yürütecek kişiler",
      // Gerçek ekip üyeleri eklendiğinde görünür. Fotoğraflar public/ekip/ altına (400x400 WebP).
      items: [],
    },
    cta: {
      title: "Bizimle çalışmak ister misiniz?",
      description: "Ücretsiz ilk görüşmede işletmenizi dinleyelim, size özel bir plan çıkaralım.",
      button: { href: "/iletisim", label: "Teklif Al" },
    },
  },
  servicesIndex: {
    seo: {
      title: "Hizmetler: Google Ads, Instagram Reklam, SEO ve Web Tasarım",
      description:
        "Serdivan Reklam Ajansı hizmetleri: Google Ads, Instagram ve Facebook reklamları, yerel SEO, sosyal medya yönetimi, web tasarım, dijital pazarlama ve GEO. Kapsam ve süreç her sayfada.",
      keywords: ["Serdivan reklam ajansı hizmetleri", "Serdivan Google Ads", "Serdivan web tasarım", "Serdivan SEO"],
      canonical: "/hizmetler",
      openGraphTitle: "Hizmetler",
      openGraphDescription: "Serdivan'daki işletmeler için reklam, SEO, sosyal medya, web tasarım ve GEO hizmetleri.",
    },
    hero: {
      eyebrow: "Hizmetler",
      title: "Serdivan'daki işletmeler için reklam ve dijital pazarlama hizmetleri",
      description:
        "Her hizmetin kapsamını, sürecini, fiyatı etkileyen unsurları ve sık sorulan soruları ayrı sayfada anlattık. İhtiyacınıza en yakın hizmeti seçin; emin değilseniz ücretsiz görüşmede birlikte netleştirelim.",
    },
    summary:
      "Serdivan Reklam Ajansı yedi hizmet sunar: Google Ads yönetimi, Instagram ve Facebook reklam yönetimi, yerel SEO, sosyal medya yönetimi, web tasarım ve landing page, bütüncül dijital pazarlama yönetimi ve yapay zeka aramaları için GEO. Hizmetler Serdivan, Adapazarı, Erenler ve Sakarya genelindeki işletmelere verilir.",
  },
  contact: {
    seo: {
      title: "İletişim ve Ücretsiz Teklif",
      description:
        "Serdivan'da reklam, SEO, sosyal medya veya web sitesi için ücretsiz analiz ve teklif isteyin. Formu doldurun, talebiniz WhatsApp'tan bize ulaşsın.",
      keywords: ["Serdivan reklam ajansı iletişim", "Serdivan reklam teklif", "ücretsiz reklam analizi"],
      canonical: "/iletisim",
      openGraphTitle: "İletişim",
      openGraphDescription: "Ücretsiz analiz ve teklif formu üzerinden bize ulaşın.",
    },
    hero: {
      eyebrow: "İletişim",
      title: "Ücretsiz analiz ve teklif isteyin",
      description:
        "Formu doldurun; bilgileriniz hazır bir WhatsApp mesajı olarak açılır. Web sitenizi, Google İşletme Profilinizi ve varsa reklam hesabınızı inceleyip somut önerilerle dönelim.",
    },
    infoTitle: "Nasıl ilerliyor?",
    infoDescription:
      "Form doğrudan WhatsApp'a iletilir. Ardından ön analizi paylaşıyor, isterseniz görüşme planlıyoruz.",
    contactItems: [
      { icon: "mail", label: "E-posta", value: EMAIL, href: `mailto:${EMAIL}` },
      {
        icon: "send",
        label: "WhatsApp",
        value: "0539 610 81 54",
        href: "https://wa.me/905396108154",
      },
      {
        icon: "map-pin",
        label: "Hizmet bölgesi",
        value: "Serdivan, Adapazarı, Erenler ve Sakarya",
        href: "",
      },
      { icon: "clock", label: "Dönüş süresi", value: "İş günlerinde aynı gün", href: "" },
    ],
    trustNote: {
      eyebrow: "Taahhüdümüz",
      body:
        "İlk analiz ücretsizdir ve herhangi bir sözleşmeye bağlamaz. Bilgileriniz yalnızca size dönüş yapmak için kullanılır, üçüncü kişilerle paylaşılmaz.",
    },
    steps: [
      { title: "Formu doldurun", description: "İşletmenizi ve ihtiyacınızı birkaç cümleyle anlatmanız yeterli." },
      { title: "Ön analiz", description: "Sitenizi, Google profilinizi ve reklam hesabınızı inceleriz." },
      { title: "Teklif ve görüşme", description: "WhatsApp'tan öneri ve teklif; isterseniz görüşme." },
    ],
    form: {
      title: "Teklif formu",
      successTitle: "WhatsApp açılıyor",
      successDescription: "Bilgileriniz hazır bir mesaj olarak açılıyor; WhatsApp'ta göndermeniz yeterli. Açılmazsa aşağıdaki düğmeye dokunun.",
      errorMessage: "Gönderim başarısız oldu. Lütfen tekrar deneyin ya da sayfanın altındaki WhatsApp düğmesiyle yazın.",
      submitLabel: "WhatsApp ile Teklif İste",
      loadingLabel: "Gönderiliyor…",
      consentLabel: "Bilgilerimin bana dönüş yapılması amacıyla işlenmesini kabul ediyorum.",
      fields: {
        nameLabel: "Ad Soyad",
        namePlaceholder: "Adınız ve soyadınız",
        emailLabel: "E-posta (isteğe bağlı)",
        emailPlaceholder: "ornek@isletme.com",
        phoneLabel: "Telefon (isteğe bağlı)",
        phonePlaceholder: "05XX XXX XX XX",
        companyLabel: "İşletme adı",
        companyPlaceholder: "İşletmenizin adı",
        areaLabel: "İlçe / mahalle",
        areaPlaceholder: "Örn. Serdivan, Arabacıalanı",
        serviceLabel: "İlgilendiğiniz hizmet",
        servicePlaceholder: "Seçiniz",
        messageLabel: "Mesajınız",
        messagePlaceholder: "İşletmeniz, hedefiniz ve varsa mevcut reklam/SEO çalışmanız hakkında kısaca bilgi verin.",
      },
      serviceOptions: [
        "Google Ads Yönetimi",
        "Instagram / Facebook Reklamları",
        "Yerel SEO",
        "Sosyal Medya Yönetimi",
        "Web Tasarım / Landing Page",
        "Dijital Pazarlama (Tüm Kanallar)",
        "GEO / Yapay Zeka Arama",
        "Emin değilim, analiz istiyorum",
      ],
    },
  },
  blogIndex: {
    seo: {
      title: "Blog: Serdivan'da Reklam, SEO ve Fiyat Rehberleri",
      description:
        "Reklam ajansı ve web tasarım fiyatları, Google Ads bütçesi, yerel SEO, Google İşletme Profili ve yapay zeka aramaları üzerine Serdivan'daki işletmeler için pratik rehberler.",
      keywords: ["Serdivan reklam fiyatları", "yerel SEO rehberi", "web tasarım fiyatları", "Google Ads bütçesi"],
      canonical: "/blog",
      openGraphTitle: "Blog",
      openGraphDescription: "Serdivan'daki işletmeler için reklam, SEO, fiyat ve yapay zeka arama rehberleri.",
    },
    hero: {
      eyebrow: "Blog",
      title: "Serdivan'daki işletmeler için pratik pazarlama rehberleri",
      description:
        "Fiyatlar, bütçeler, yerel SEO ve yapay zeka aramaları hakkında en sık sorulan sorulara açık ve uygulanabilir cevaplar.",
    },
    featuredLabel: "Öne çıkan",
  },
  serviceLandingPages,
  blogPosts: withBlogDefaults([...blogC, ...blogA, ...blogB]),
};
