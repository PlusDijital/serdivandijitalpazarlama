import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCmsData } from "@/lib/cms";

const cms = getCmsData();

// Next.js 404 sayfasına "noindex" etiketini kendisi ekler.
export const metadata: Metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <>
      <Header site={cms.site} header={cms.header} />
      <main id="icerik" className="section">
        <div className="container-x max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">404</p>
          <h1 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">Aradığınız sayfa bulunamadı</h1>
          <p className="mt-4 text-[1.0625rem] leading-8 text-ink-soft">
            Sayfa taşınmış ya da kaldırılmış olabilir. Hizmetlerimize göz atabilir veya bize doğrudan yazabilirsiniz.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-accent">
              Ana sayfa <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/hizmetler" className="btn btn-secondary">
              Hizmetler
            </Link>
            <Link href="/iletisim" className="btn btn-secondary">
              İletişim
            </Link>
          </div>
        </div>
      </main>
      <Footer site={cms.site} footer={cms.footer} />
    </>
  );
}
