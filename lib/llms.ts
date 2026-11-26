import { getCmsData } from "@/lib/cms";
import { formatTrPhone } from "@/lib/contact";

/** llms.txt: yapay zeka asistanlarına site özeti ve önemli sayfalar (https://llmstxt.org). */
export function buildLlmsTxt() {
  const cms = getCmsData();
  const { site } = cms;
  const business = site.business ?? {};
  const areas = (business.areaServed ?? ["Serdivan", "Sakarya"]).join(", ");
  const whatsappNote = business.whatsapp ? `; WhatsApp: ${formatTrPhone(business.whatsapp)}` : "";

  return [
    `# ${site.brandName}`,
    "",
    `> ${site.defaultSeo.description}`,
    "",
    `${site.brandName}, Sakarya'nın Serdivan ilçesindeki işletmelere Google Ads, Instagram ve Facebook reklamları, yerel SEO, sosyal medya yönetimi, web tasarım ve yapay zeka aramaları için GEO hizmeti veren yerel bir reklam ajansıdır. Tabela, matbaa veya baskı işi yapmaz.`,
    `${site.parentBrand.description} Üst marka: ${site.parentBrand.url}`,
    `Hizmet bölgesi: ${areas}. Hizmet bölgesi işletmesidir; müşteri kabul edilen açık bir adres yayınlanmaz.`,
    ...(business.phone ? [`Telefon: ${business.phone}`] : []),
    ...(business.email ? [`E-posta: ${business.email}`] : []),
    ...(business.whatsapp ? [`WhatsApp: https://wa.me/${business.whatsapp}`] : []),
    `Çalışma saatleri: ${cms.footer.workingHoursValue}`,
    `İletişim: ${site.siteUrl}/iletisim (form bilgileri WhatsApp mesajı olarak iletilir${whatsappNote})`,
    "",
    "## Kısaca",
    "",
    cms.home.summary,
    "",
    "## Künye",
    "",
    ...cms.home.facts.map((fact) => `- ${fact.label}: ${fact.value}`),
    "",
    "## Hizmetler",
    "",
    ...cms.serviceLandingPages.map(
      (service) => `- [${service.title}](${site.siteUrl}/hizmetler/${service.slug}): ${service.summary ?? service.metaDescription}`,
    ),
    "",
    "## Rehberler",
    "",
    ...cms.blogPosts.map(
      (post) => `- [${post.title}](${site.siteUrl}/blog/${post.slug}): ${post.summary ?? post.metaDescription}`,
    ),
    "",
    "## Kurumsal",
    "",
    `- [Hakkımızda](${site.siteUrl}/hakkimizda): ${cms.about.summary}`,
    `- [İletişim](${site.siteUrl}/iletisim): ${cms.contact.seo.description}`,
    `- [Tüm hizmetler](${site.siteUrl}/hizmetler): ${cms.servicesIndex.summary}`,
    "",
    "## Optional",
    "",
    `- [Tam içerik (llms-full.txt)](${site.siteUrl}/llms-full.txt): hizmet sayfaları, rehber yazıları ve sık sorulan soruların düz metni`,
    `- [RSS](${site.siteUrl}/feed.xml): yeni rehber yazıları`,
    `- [Site haritası](${site.siteUrl}/sitemap.xml)`,
    "",
  ].join("\n");
}

/** llms-full.txt: hizmet sayfalarının, rehber yazılarının ve SSS'lerin düz metin hali. */
export function buildLlmsFullTxt() {
  const cms = getCmsData();
  const { site } = cms;
  const out: string[] = [buildLlmsTxt(), "", "---", "", "# Sık sorulan sorular (ana sayfa)", ""];

  for (const item of cms.home.faq.items) {
    out.push(`## ${item.question}`, "", item.answer, "");
  }

  for (const service of cms.serviceLandingPages) {
    out.push("---", "", `# ${service.title}`, "", `URL: ${site.siteUrl}/hizmetler/${service.slug}`, "");
    if (service.summary) out.push(service.summary, "");
    out.push("## Faydalar", "", ...service.benefits.map((b) => `- ${b}`), "");
    out.push("## Kapsam", "", ...service.deliverables.map((d) => `- ${d}`), "");
    out.push("## Süreç", "", ...service.process.map((step, i) => `${i + 1}. ${step.title}: ${step.description}`), "");
    for (const section of service.sections ?? []) {
      out.push(`## ${section.heading}`, "", section.body, "");
    }
    if (service.faq.length) {
      out.push("## Sık sorulan sorular", "");
      for (const item of service.faq) out.push(`### ${item.question}`, "", item.answer, "");
    }
  }

  for (const post of cms.blogPosts) {
    out.push(
      "---",
      "",
      `# ${post.title}`,
      "",
      `URL: ${site.siteUrl}/blog/${post.slug}`,
      `Kategori: ${post.category} · Yayın: ${post.publishedAt} · Güncelleme: ${post.updatedAt}`,
      "",
    );
    if (post.summary) out.push(post.summary, "");
    out.push(post.intro, "");
    for (const section of post.sections) {
      out.push(`## ${section.heading}`, "", section.body, "");
    }
    if (post.faq?.length) {
      out.push("## Sık sorulan sorular", "");
      for (const item of post.faq) out.push(`### ${item.question}`, "", item.answer, "");
    }
  }

  return out.join("\n");
}
