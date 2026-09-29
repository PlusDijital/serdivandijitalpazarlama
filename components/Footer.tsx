import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentIcon } from "@/lib/icon-map";
import type { FooterContent, SiteSettings } from "@/lib/cms-types";

export default function Footer({
  site,
  footer,
}: {
  site: SiteSettings;
  footer: FooterContent;
}) {
  const copyright = footer.copyrightText.replace("{year}", String(new Date().getFullYear()));

  return (
    <footer className="border-t border-line bg-surface">
      <div className="border-b border-line">
        <div className="container-x flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-accent">{footer.topPrompt}</p>
            <p className="mt-1 text-lg font-bold text-ink">{footer.topTitle}</p>
          </div>
          <Link href={footer.topCta.href} className="btn btn-primary shrink-0">
            {footer.topCta.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-base font-extrabold text-white">
              {site.logoInitial}
            </span>
            <span className="text-lg font-extrabold tracking-tight text-ink">{site.brandName}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{footer.brandDescription}</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            {site.parentBrand.description}{" "}
            <a
              href={site.parentBrand.url}
              className="font-semibold text-accent underline-offset-2 hover:underline"
              rel="noopener"
            >
              {site.parentBrand.name}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{footer.quickLinksTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {footer.quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-semibold text-ink-soft hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{footer.serviceLinksTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {footer.serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-semibold text-ink-soft hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{footer.contactTitle}</h2>
          <ul className="mt-4 space-y-3">
            {footer.contactItems.map((item) => (
              <li key={`${item.label}-${item.value}`} className="flex items-start gap-3 text-sm">
                <ContentIcon name={item.icon} size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-semibold text-muted">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-semibold text-ink hover:text-accent">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-ink">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
            <li className="flex items-start gap-3 text-sm">
              <ContentIcon name="clock" size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="text-xs font-semibold text-muted">{footer.workingHoursLabel}</p>
                <p className="font-semibold text-ink">{footer.workingHoursValue}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright}</p>
          <p>Hizmet bölgesi: {site.business?.areaServed?.join(", ")}</p>
        </div>
      </div>
    </footer>
  );
}
