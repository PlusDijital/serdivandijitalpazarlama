import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { formatTrPhone, whatsappUrl } from "@/lib/contact";

const POINTS = [
  "İlk analiz ücretsiz",
  "Hesaplar ve veriler işletmenizin adına",
  "Medya bütçesi ile hizmet bedeli ayrı raporlanır",
  "Uzun vadeli sözleşme zorunluluğu yok",
];

/** Hizmet sayfası başlığının yanındaki kutu: çalışma koşulları + doğrudan iletişim. */
export default function ServiceAside({
  serviceTitle,
  phone,
  whatsapp,
}: {
  serviceTitle: string;
  phone?: string;
  whatsapp?: string;
}) {
  return (
    <aside aria-label="Çalışma koşulları ve iletişim" className="card relative overflow-hidden p-6 md:p-7 lg:sticky lg:top-28">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-[#34d3a8] to-accent" aria-hidden />
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Nasıl çalışıyoruz?</p>
      <ul className="mt-4 space-y-3">
        {POINTS.map((point) => (
          <li key={point} className="flex gap-3 text-[0.9375rem] font-semibold leading-6 text-ink">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Check size={13} aria-hidden />
            </span>
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
        {whatsapp ? (
          <a
            href={whatsappUrl(
              whatsapp,
              `Merhaba, Serdivan Reklam Ajansı sitenizden yazıyorum. ${serviceTitle} için teklif almak istiyorum.`,
            )}
            rel="noopener"
            data-track="whatsapp"
            className="btn bg-[#0f7a40] text-white hover:bg-[#0c6535]"
          >
            <WhatsAppIcon size={18} />
            {"WhatsApp'tan yazın"}
          </a>
        ) : null}
        <Link href="/iletisim" className="btn btn-secondary">
          Teklif formu
          <ArrowRight size={16} aria-hidden />
        </Link>
        {phone ? (
          <a
            href={`tel:${phone}`}
            data-track="phone"
            className="mt-1 inline-flex items-center justify-center gap-2 text-sm font-bold text-ink-soft hover:text-accent"
          >
            <Phone size={15} aria-hidden className="text-accent" />
            {formatTrPhone(phone)}
          </a>
        ) : null}
      </div>
    </aside>
  );
}
