import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Serdivan Dijital Pazarlama - Sakarya",
    default: "Serdivan Dijital Pazarlama | Sakarya'nın En İyi Dijital Ajansı",
  },
  description: "Sakarya Serdivan'da web tasarım, SEO, sosyal medya yönetimi ve dijital pazarlama hizmetleri veren yenilikçi ajans. 2026 trendlerine uygun garantili büyüme.",
  keywords: ["Sakarya dijital pazarlama", "Serdivan web tasarım", "SEO ajansı Sakarya", "sosyal medya yönetimi", "Serdivan reklam ajansı", "2026 SEO"],
  openGraph: {
    title: "Serdivan Dijital Pazarlama",
    description: "Sakarya'nın öncü dijital pazarlama ve web tasarım ajansı ile işletmenizi büyütün.",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
