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
  | "check-circle";

export type LinkItem = {
  label: string;
  href: string;
};

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

export type HomeHeroMetric = {
  value: string;
  label: string;
};

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  metrics: HomeHeroMetric[];
  ratingBadge: string;
  trendBadge: string;
  panelEyebrow: string;
  panelTitle: string;
  panelStatus: string;
  goalLabel: string;
  goalValue: string;
  goalProgress: number;
  goalProgressText: string;
  focusLabel: string;
  focusValue: string;
  conversionLabel: string;
  conversionValue: string;
  activeServices: string[];
};

export type HomePartnersContent = {
  eyebrow: string;
  partners: string[];
};

export type ResultStat = {
  value: string;
  unit: string;
  label: string;
  sub: string;
  wide: boolean;
};

export type HomeResultsContent = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  stats: ResultStat[];
  chartBars: number[];
};

export type ServiceCard = {
  icon: IconName;
  tag: string;
  num: string;
  title: string;
  description: string;
  span: string;
  href: string;
  footerText: string;
};

export type HomeServicesContent = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  cards: ServiceCard[];
};

export type ProcessStep = {
  num: string;
  icon: IconName;
  title: string;
  description: string;
  detail: string;
};

export type HomeProcessContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

export type FeaturedTestimonial = Testimonial & {
  metric: string;
  metricLabel: string;
};

export type HomeTestimonialsContent = {
  eyebrow: string;
  title: string;
  featured: FeaturedTestimonial;
  items: Testimonial[];
};

export type HomeCtaContent = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  trustChips: string[];
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
};

export type HomeContent = {
  seo: SeoSettings;
  structuredData: {
    name: string;
    description: string;
    areaServed: string[];
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    serviceType: string[];
  };
  hero: HomeHeroContent;
  partners: HomePartnersContent;
  results: HomeResultsContent;
  services: HomeServicesContent;
  process: HomeProcessContent;
  testimonials: HomeTestimonialsContent;
  cta: HomeCtaContent;
};

export type AboutValue = {
  icon: IconName;
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  avatar: string;
};

export type AboutContent = {
  seo: SeoSettings;
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
  };
  stats: HomeHeroMetric[];
  mission: {
    title: string;
    icon: IconName;
    body: string;
  };
  vision: {
    title: string;
    icon: IconName;
    body: string;
  };
  values: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    items: AboutValue[];
  };
  team: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    items: TeamMember[];
  };
  cta: {
    title: string;
    description: string;
    button: LinkItem;
  };
};

export type ServicesIndexContent = {
  seo: SeoSettings;
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    keywordCluster: string[];
  };
};

export type ContactFormContent = {
  title: string;
  successTitle: string;
  successDescription: string;
  submitLabel: string;
  loadingLabel: string;
  fields: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
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
    titleHighlight: string;
    description: string;
  };
  infoTitle: string;
  infoDescription: string;
  contactItems: ContactItem[];
  trustNote: {
    eyebrow: string;
    body: string;
  };
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
    titleHighlight: string;
    description: string;
    topicClusters: string[];
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
