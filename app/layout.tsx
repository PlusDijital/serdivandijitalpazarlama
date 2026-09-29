import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { getCmsData } from "@/lib/cms";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { buildRootMetadata } from "@/lib/seo";

// Tek font ailesi, iki ağırlık: LCP ve CLS için en hafif seçenek.
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const cms = getCmsData();

export const metadata: Metadata = buildRootMetadata(cms.site);

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={manrope.variable}>
      <body className="antialiased">
        <JsonLd data={graph(organizationSchema(cms.site), websiteSchema(cms.site))} />
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          İçeriğe atla
        </a>
        {children}
      </body>
    </html>
  );
}
