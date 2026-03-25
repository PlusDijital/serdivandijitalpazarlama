import type { Metadata } from "next";
import { Manrope, Urbanist } from "next/font/google";
import "./globals.css";
import { getCmsData } from "@/lib/cms";
import { buildRootMetadata } from "@/lib/seo";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  return buildRootMetadata(cms.site);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${urbanist.variable} ${manrope.variable} antialiased`}
        style={{ fontFamily: "var(--font-urbanist), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
