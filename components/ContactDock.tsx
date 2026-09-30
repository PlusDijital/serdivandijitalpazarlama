import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";

/**
 * Mobilde alt sabit iletişim çubuğu, masaüstünde yuvarlak WhatsApp butonu.
 * Sunucu bileşeni, JavaScript yok; sabit konumlu olduğu için CLS üretmez.
 */
export default function ContactDock({ whatsapp }: { whatsapp?: string }) {
  const wa = whatsapp ? whatsappUrl(whatsapp) : null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 p-3 backdrop-blur md:hidden">
        <div className="flex gap-2">
          {wa ? (
            <a href={wa} rel="noopener" data-track="whatsapp" className="btn flex-1 bg-[#0f7a40] text-white hover:bg-[#0c6535]">
              <WhatsAppIcon size={18} />
              WhatsApp
            </a>
          ) : null}
          <Link href="/iletisim" className="btn btn-primary flex-1">
            Teklif Al
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>

      {wa ? (
        <a
          href={wa}
          rel="noopener"
          data-track="whatsapp"
          aria-label="WhatsApp ile yazın"
          className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#0f7a40] text-white shadow-card transition-transform hover:scale-105 md:flex"
        >
          <WhatsAppIcon size={28} />
        </a>
      ) : null}
    </>
  );
}
