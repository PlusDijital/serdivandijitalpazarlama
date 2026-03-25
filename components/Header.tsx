"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import type { HeaderContent, SiteSettings } from "@/lib/cms-types";

export default function Header({
  site,
  header,
}: {
  site: SiteSettings;
  header: HeaderContent;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(0,0,0,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(250,193,1,0.1)"
            : "1px solid transparent",
        }}
      >
        <div className="container mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-black font-black text-sm"
              style={{ background: "#FAC101" }}
            >
              {site.logoInitial}
            </div>
            <span
              className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {site.brandShortName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {header.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/65 hover:text-white rounded-full transition-all duration-200 hover:bg-white/6"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href={header.cta.href} className="btn-primary text-sm px-5 py-2.5">
              {header.cta.label}
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all duration-200 hover:border-primary/40"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-400"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
          background: "rgba(0,0,0,0.97)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2 px-6">
          {header.navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center text-3xl font-bold text-white/80 hover:text-primary py-4 border-b border-white/6 transition-colors duration-200"
              style={{
                fontFamily: "var(--font-display), sans-serif",
                transitionDelay: isMenuOpen ? `${i * 60}ms` : "0ms",
                transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
                opacity: isMenuOpen ? 1 : 0,
                transition: "all 0.35s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={header.cta.href}
            onClick={() => setIsMenuOpen(false)}
            className="btn-primary mt-8 w-full justify-center"
          >
            {header.mobileCtaLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
