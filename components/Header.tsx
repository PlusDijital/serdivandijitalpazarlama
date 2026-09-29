import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-base font-extrabold text-white">
            {site.logoInitial}
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink">{site.brandShortName}</span>
        </Link>

        <nav aria-label="Ana menü" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {header.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.9375rem] font-semibold text-ink-soft transition-colors hover:text-accent"
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
