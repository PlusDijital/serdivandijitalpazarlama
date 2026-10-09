import type { MetadataRoute } from "next";
import { getCmsData } from "@/lib/cms";

export default function manifest(): MetadataRoute.Manifest {
  const { site } = getCmsData();

  return {
    name: site.brandName,
    short_name: site.brandShortName,
    description: site.defaultSeo.description,
    lang: "tr",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf7",
    theme_color: "#0b1b33",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
