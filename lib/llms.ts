import { getCmsData } from "@/lib/cms";

/** llms.txt: yapay zeka asistanlarına site özeti ve önemli sayfalar (https://llmstxt.org). */
export function buildLlmsTxt() {
  const cms = getCmsData();
  const { site } = cms;
  const business = site.business ?? {};
  const areas = (business.areaServed ?? ["Serdivan", "Sakarya"]).join(", ");

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
    `İletişim: ${site.siteUrl}/iletisim (form; iş günlerinde 48 saat içinde e-posta ile dönüş)`,
    "",
    "## Kısaca",
    "",
    cms.home.summary,
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
    `- [İletişim](${site.siteUrl}/iletisim)`,
    `- [Tam içerik (llms-full.txt)](${site.siteUrl}/llms-full.txt)`,
    "",
  ].join("\n");
}

/** llms-full.txt: hizmet sayfalarının ve SSS'lerin düz metin hali. */
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
    for (const section of service.sections ?? []) {
      out.push(`## ${section.heading}`, "", section.body, "");
    }
    if (service.faq.length) {
      out.push("## Sık sorulan sorular", "");
      for (const item of service.faq) out.push(`### ${item.question}`, "", item.answer, "");
    }
  }

  return out.join("\n");
}
