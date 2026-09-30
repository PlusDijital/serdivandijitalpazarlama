import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
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
    <footer className="bg-ink text-white">
      <div className="container-x">
        <div className="flex flex-col gap-6 border-b border-white/10 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-bold text-accent-soft">{footer.topPrompt}</p>
            <p className="mt-2 text-2xl font-extrabold leading-snug">{footer.topTitle}</p>
          </div>
          <Link href={footer.topCta.href} className="btn btn-accent shrink-0 px-7">
            {footer.topCta.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo light />
              <span className="text-lg font-extrabold tracking-tight">{site.brandName}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">{footer.brandDescription}</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
              {site.parentBrand.description}{" "}
              <a href={site.parentBrand.url} className="font-bold text-accent-soft underline-offset-2 hover:underline" rel="noopener">
                {site.parentBrand.name}
              </a>
            </p>
          </div>

          <FooterList title={footer.quickLinksTitle} links={footer.quickLinks} />
          <FooterList title={footer.serviceLinksTitle} links={footer.serviceLinks} />

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">{footer.contactTitle}</h2>
            <ul className="mt-4 space-y-4">
              {footer.contactItems.map((item) => (
                <li key={`${item.label}-${item.value}`} className="flex items-start gap-3 text-sm">
                  <ContentIcon name={item.icon} size={18} className="mt-0.5 shrink-0 text-accent-soft" />
                  <div>
                    <p className="text-xs font-semibold text-white/60">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-semibold hover:text-accent-soft">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3 text-sm">
                <ContentIcon name="clock" size={18} className="mt-0.5 shrink-0 text-accent-soft" />
                <div>
                  <p className="text-xs font-semibold text-white/60">{footer.workingHoursLabel}</p>
                  <p className="font-semibold">{footer.workingHoursValue}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright}</p>
          <p>Hizmet bölgesi: {site.business?.areaServed?.join(", ")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm font-semibold text-white/85 hover:text-accent-soft">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
