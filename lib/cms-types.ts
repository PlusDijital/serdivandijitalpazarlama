export type IconName =
  | "instagram"
  | "linkedin"
  | "twitter"
  | "mail"
  | "phone"
  | "map-pin"
  | "search"
  | "shopping-cart"
  | "share-2"
  | "pen-tool"
  | "bar-chart-3"
  | "globe"
  | "target"
  | "lightbulb"
  | "eye"
  | "trending-up"
  | "rocket"
  | "calendar"
  | "star"
  | "zap"
  | "quote"
  | "check"
  | "clock"
  | "send"
  | "check-circle"
  | "coffee"
  | "stethoscope"
  | "home"
  | "graduation-cap"
  | "wrench"
  | "shield-check"
  | "map"
  | "file-text";

export type LinkItem = {
  label: string;
  href: string;
};

export type Faq = { question: string; answer: string };

export type SeoSettings = {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
};

export type SiteSettings = {
  siteUrl: string;
  brandName: string;
  brandShortName: string;
  logoInitial: string;
  applicationName: string;
  defaultSeo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
    openGraphTitle: string;
    openGraphDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  /** Üst marka; schema'da parentOrganization olarak ve footer'da gösterilir. */
  parentBrand: {
    name: string;
    url: string;
    description: string;
  };
  /**
   * Yerel SEO (NAP) bilgisi. Boş bırakılan alanlar sitede ve schema'da gösterilmez.
   * Açık adres yoksa hizmet bölgesi işletmesi olarak işaretlenir (Google kurallarına uygun).
   */
  business?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    streetAddress?: string;
    postalCode?: string;
    areaServed?: string[];
    googleBusinessProfileUrl?: string;
    sameAs?: string[];
    foundingDate?: string;
  };
};

export type HeaderContent = {
  navLinks: LinkItem[];
  cta: LinkItem;
  mobileCtaLabel: string;
};

export type SocialLink = LinkItem & {
  icon: IconName;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: IconName;
};

export type FooterContent = {
  topPrompt: string;
  topTitle: string;
  topCta: LinkItem;
  brandDescription: string;
  quickLinksTitle: string;
  serviceLinksTitle: string;
  contactTitle: string;
  socialLinks: SocialLink[];
  quickLinks: LinkItem[];
  serviceLinks: LinkItem[];
  contactItems: ContactItem[];
  workingHoursLabel: string;
  workingHoursValue: string;
  copyrightText: string;
  legalLinks: LinkItem[];
};

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  /** Başlıkta vurgulanacak kısım (başlığın içinde geçmeli). */
  titleHighlight?: string;
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  /** Başlığın altındaki güven satırları. */
  trustPoints: { icon: IconName; text: string }[];
};

export type ServiceCard = {
  icon: IconName;
  /** Varsa ikon yerine platform logosu gösterilir. */
  brand?: import("@/lib/brand-icons").BrandIconKey;
  title: string;
  description: string;
  href: string;
};

export type HomeServicesContent = {
  eyebrow: string;
  title: string;
  description: string;
  cards: ServiceCard[];
};

export type HomeLocalContent = {
  eyebrow: string;
  title: string;
  description: string;
  points: { icon: IconName; title: string; description: string }[];
  areas: string[];
};

export type ProcessStep = {
  icon: IconName;
  title: string;
  description: string;
};

export type HomeProcessContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
};

export type HomeSectorsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: { icon: IconName; title: string; description: string }[];
};

export type HomeTrustContent = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  cta: LinkItem;
};

export type CaseStudy = {
  client: string;
  sector: string;
  area: string;
  challenge: string;
  work: string;
  result: string;
  quote?: string;
  quoteAuthor?: string;
};

export type HomeCaseStudiesContent = {
  eyebrow: string;
  title: string;
  description: string;
  /** Yalnızca gerçek ve müşteri izni alınmış örnekler; boşsa bölüm gizlenir. */
  items: CaseStudy[];
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** /public altındaki fotoğraf yolu (ör. /ekip/ad-soyad.webp), 400x400 önerilir. */
  photo?: string;
  linkedin?: string;
};

export type HomeCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  trustChips: string[];
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
};

export type HomeContent = {
  seo: SeoSettings;
  hero: HomeHeroContent;
  /** 40-60 kelimelik doğrudan cevap; öne çıkan snippet ve yapay zeka aramaları için. */
  summary: string;
  services: HomeServicesContent;
  local: HomeLocalContent;
  process: HomeProcessContent;
  sectors: HomeSectorsContent;
  faq: { eyebrow: string; title: string; items: Faq[] };
  caseStudies: HomeCaseStudiesContent;
  trust: HomeTrustContent;
  cta: HomeCtaContent;
};

export type AboutValue = {
  icon: IconName;
  title: string;
  description: string;
};

export type AboutContent = {
  seo: SeoSettings;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  summary: string;
  mission: { title: string; icon: IconName; body: string };
  vision: { title: string; icon: IconName; body: string };
  values: { eyebrow: string; title: string; items: AboutValue[] };
  parentBrand: { eyebrow: string; title: string; body: string; cta: LinkItem };
  /** Gerçek ekip üyeleri; boşsa bölüm gizlenir. */
  team: { eyebrow: string; title: string; items: TeamMember[] };
  cta: { title: string; description: string; button: LinkItem };
};

export type ServicesIndexContent = {
  seo: SeoSettings;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  summary: string;
};

export type ContactFormContent = {
  title: string;
  successTitle: string;
  successDescription: string;
  errorMessage: string;
  submitLabel: string;
  loadingLabel: string;
  consentLabel: string;
  fields: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    areaLabel: string;
    areaPlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
  };
  serviceOptions: string[];
};

export type ContactContent = {
  seo: SeoSettings;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  infoTitle: string;
  infoDescription: string;
  contactItems: ContactItem[];
  trustNote: { eyebrow: string; body: string };
  steps: { title: string; description: string }[];
  form: ContactFormContent;
};

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
  faq: Faq[];
  relatedPosts: string[];
  /** 40-60 kelimelik doğrudan cevap; AI aramaları (GEO) ve öne çıkan snippet için. */
  summary?: string;
  /** Uzun içerik bölümleri; paragraflar "\n\n" ile ayrılır. */
  sections?: { heading: string; body: string }[];
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
  /** Paragraflar "\n\n" ile ayrılır; "- " ile başlayan satırlar madde listesi olur. */
  sections: { heading: string; body: string }[];
  /** 40-60 kelimelik "Kısaca" özeti; AI aramaları (GEO) ve öne çıkan snippet için. */
  summary?: string;
  faq?: Faq[];
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
};

export type BlogIndexContent = {
  seo: SeoSettings;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  featuredLabel: string;
};

export type CmsData = {
  site: SiteSettings;
  header: HeaderContent;
  footer: FooterContent;
  home: HomeContent;
  about: AboutContent;
  servicesIndex: ServicesIndexContent;
  contact: ContactContent;
  blogIndex: BlogIndexContent;
  serviceLandingPages: ServiceLandingPage[];
  blogPosts: BlogPost[];
};
