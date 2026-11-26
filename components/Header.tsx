import Link from "next/link";
import { ArrowRight, Menu, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { formatTrPhone } from "@/lib/contact";
import type { HeaderContent, SiteSettings } from "@/lib/cms-types";

function isCurrent(href: string, current?: string) {
  if (!current) return false;
  return href === "/" ? current === "/" : current === href || current.startsWith(`${href}/`);
}

/** Sunucu bileşeni: mobil menü <details> ile açılır, JavaScript gerekmez. */
export default function Header({
  site,
  header,
  current,
}: {
  site: SiteSettings;
  header: HeaderContent;
  /** Bulunulan sayfanın yolu ("/hizmetler/..."); menüde etkin bağlantıyı işaretler. */
  current?: string;
}) {
  const phone = site.business?.phone;

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.brandName} ana sayfa`}>
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="text-[1.0625rem] font-extrabold tracking-tight text-ink">{site.brandShortName}</span>
            <span className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-muted">Ajansı · Serdivan</span>
          </span>
        </Link>

        <nav aria-label="Ana menü" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {header.navLinks.map((link) => {
              const active = isCurrent(link.href, current);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold transition-colors hover:bg-surface-soft hover:text-ink ${
                      active ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone ? (
            <a
              href={`tel:${phone}`}
              data-track="phone"
              className="hidden items-center gap-2 text-[0.9375rem] font-bold text-ink transition-colors hover:text-accent lg:inline-flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Phone size={15} aria-hidden />
              </span>
              {formatTrPhone(phone)}
            </a>
          ) : null}
          <Link href={header.cta.href} className="btn btn-primary">
            {header.cta.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary
            className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-lg text-ink [&::-webkit-details-marker]:hidden"
            aria-label="Menüyü aç"
          >
            <Menu size={24} aria-hidden />
          </summary>
          <nav
            aria-label="Mobil menü"
            className="absolute right-0 top-14 w-64 rounded-xl border border-line bg-surface p-3 shadow-card"
          >
            <ul className="flex flex-col">
              {header.navLinks.map((link) => {
                const active = isCurrent(link.href, current);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-lg px-3 py-3 text-base font-semibold hover:bg-surface-soft ${
                        active ? "bg-surface-soft text-accent" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              {phone ? (
                <li className="mt-1 border-t border-line pt-1">
                  <a
                    href={`tel:${phone}`}
                    data-track="phone"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-surface-soft"
                  >
                    <Phone size={17} aria-hidden className="text-accent" />
                    {formatTrPhone(phone)}
                  </a>
                </li>
              ) : null}
              <li className="mt-2">
                <Link href={header.cta.href} className="btn btn-primary w-full">
                  {header.mobileCtaLabel}
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
