import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import Logo from "@/components/Logo";
import type { HeaderContent, SiteSettings } from "@/lib/cms-types";

/** Sunucu bileşeni: mobil menü <details> ile açılır, JavaScript gerekmez. */
export default function Header({
  site,
  header,
}: {
  site: SiteSettings;
  header: HeaderContent;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="text-[1.0625rem] font-extrabold tracking-tight text-ink">{site.brandShortName}</span>
            <span className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-muted">Ajansı · Serdivan</span>
          </span>
        </Link>

        <nav aria-label="Ana menü" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {header.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold text-ink-soft transition-colors hover:bg-surface-soft hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={header.cta.href} className="btn btn-primary hidden md:inline-flex">
          {header.cta.label}
          <ArrowRight size={16} aria-hidden />
        </Link>

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
              {header.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-surface-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
