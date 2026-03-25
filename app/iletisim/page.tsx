import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";
import { getCmsData } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  return buildPageMetadata(cms.site, cms.contact.seo);
}

export default async function ContactPage() {
  const cms = await getCmsData();

  return (
    <ContactPageClient
      site={cms.site}
      header={cms.header}
      footer={cms.footer}
      content={cms.contact}
    />
  );
}
