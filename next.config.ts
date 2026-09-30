import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Cloudflare binding'lerini yalnızca `next dev` sırasında yerel olarak sağlar;
// `next start` ve derleme sırasında çalışırsa sunucu açılışı takılabiliyor.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

// Eski adresleri kalıcı olarak yeni sayfalara yönlendirir.
const legacyRedirects: [string, string][] = [
  // "Serdivan reklam ajansı" ana sayfanın hedef kelimesi; ayrı hizmet sayfası kaldırıldı.
  ["/hizmetler/serdivan-reklam-ajansi", "/"],
  ["/hizmetler/sakarya-reklam-ajansi", "/"],
  ["/hizmetler/sakarya-seo-ajansi", "/hizmetler/serdivan-seo-ajansi"],
  ["/hizmetler/sakarya-sosyal-medya-ajansi", "/hizmetler/serdivan-sosyal-medya-ajansi"],
  ["/hizmetler/sakarya-web-tasarim-ve-landing-page", "/hizmetler/serdivan-web-tasarim"],
  ["/blog/sakarya-reklam-ajansi-nasil-secilir", "/blog/serdivan-reklam-ajansi-nasil-secilir"],
  ["/blog/sakarya-seo-ajansi-ne-yapar", "/blog/serdivan-isletmeleri-icin-yerel-seo-rehberi"],
  ["/blog/sakarya-google-ads-yonetimi", "/blog/google-ads-butcesi-ne-kadar-olmali"],
  ["/blog/sakarya-sosyal-medya-ajansi-secimi", "/blog/sosyal-medya-yonetimi-fiyatlari"],
  ["/blog/sakarya-web-tasarim-seo-uyumu", "/blog/web-sitesi-neden-musteri-getirmiyor"],
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "frame-src https://challenges.cloudflare.com",
      "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Cloudflare Workers'ta Next görsel optimizasyonu yok; görseller önceden AVIF/WebP hazırlanır.
  images: { unoptimized: true },
  async redirects() {
    return [
      // www → çıplak alan adı (tek kanonik adres). Kök yol ayrı kural: "/:path*" boş yolda
      // hedefe ":path*" metnini olduğu gibi yazıyordu.
      {
        source: "/",
        has: [{ type: "host" as const, value: "www.serdivanreklamajansi.com" }],
        destination: "https://serdivanreklamajansi.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host" as const, value: "www.serdivanreklamajansi.com" }],
        destination: "https://serdivanreklamajansi.com/:path*",
        permanent: true,
      },
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
