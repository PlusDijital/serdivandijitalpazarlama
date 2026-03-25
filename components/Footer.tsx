import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContentIcon } from "@/lib/icon-map";
import type { FooterContent, SiteSettings } from "@/lib/cms-types";

export default function Footer({
  site,
  footer,
}: {
  site: SiteSettings;
  footer: FooterContent;
}) {
  const copyright = footer.copyrightText.replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  return (
    <footer className="border-t border-white/6">
      {/* CTA stripe */}
      <div
        className="border-b border-white/6 px-4 py-8"
        style={{ background: "rgba(250,193,1,0.03)" }}
      >
        <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white/60">{footer.topPrompt}</p>
            <p className="text-lg font-bold text-white mt-0.5" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              {footer.topTitle}
            </p>
          </div>
          <Link href={footer.topCta.href} className="btn-primary shrink-0">
            {footer.topCta.label}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-black font-black text-sm"
              style={{ background: "#FAC101" }}
            >
                {site.logoInitial}
              </div>
              <span
                className="text-xl font-black text-white"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {site.brandShortName}
              </span>
            </Link>
            <p className="text-sm leading-6.5 text-white/38 max-w-xs">
              {footer.brandDescription}
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-2">
              {footer.socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/45 hover:border-primary/40 hover:text-primary transition-all duration-200"
                >
                  <ContentIcon name={icon} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[0.18em] text-white/30 mb-5"
            >
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 rounded" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/30 mb-5">
              {footer.serviceLinksTitle}
            </h4>
            <ul className="space-y-3">
              {footer.serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-sm text-white/40 transition-colors duration-200 hover:text-primary">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/30 mb-5">
              {footer.contactTitle}
            </h4>
            <ul className="space-y-4">
              {footer.contactItems.map((item) => (
                <li key={`${item.label}-${item.value}`}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-3 text-sm text-white/50 hover:text-primary transition-colors duration-200 group"
                    >
                      <ContentIcon
                        name={item.icon}
                        size={14}
                        className="text-primary/60 shrink-0"
                      />
                      {item.value}
                    </a>
                  ) : (
                    <div className="flex items-start gap-3 text-sm text-white/50">
                      <ContentIcon
                        name={item.icon}
                        size={14}
                        className="text-primary/60 shrink-0 mt-0.5"
                      />
                      {item.value}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-white/8 bg-white/3 p-4">
              <p className="text-xs text-white/35 mb-1">{footer.workingHoursLabel}</p>
              <p className="text-sm font-semibold text-white/70">{footer.workingHoursValue}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/25">{copyright}</p>
          <div className="flex gap-4">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/20 hover:text-white/45 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
