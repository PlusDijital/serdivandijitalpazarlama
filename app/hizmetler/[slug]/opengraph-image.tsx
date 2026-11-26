import { ImageResponse } from "next/og";
import { getCmsData, getServiceBySlug } from "@/lib/cms";

export const alt = "Serdivan Reklam Ajansı hizmeti";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getCmsData().serviceLandingPages.map((service) => ({ slug: service.slug }));
}

/** Hizmet başına paylaşım görseli (WhatsApp, LinkedIn, arama sonuçları); derleme anında statik üretilir. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const title = service?.title ?? "Serdivan Reklam Ajansı";
  const areas = (service?.localFocus ?? ["Serdivan", "Sakarya"]).slice(0, 4).join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b1b33 0%, #0a3d33 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#34d3a8",
              color: "#0b1b33",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            Hizmet
          </div>
          <div style={{ display: "flex", fontSize: 26, opacity: 0.8 }}>{areas}</div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 34 ? 68 : 82, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#ffffff",
                color: "#0b1b33",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              S
            </div>
            <div style={{ display: "flex", fontWeight: 700 }}>Serdivan Reklam Ajansı</div>
          </div>
          <div style={{ display: "flex", opacity: 0.75 }}>serdivanreklamajansi.com</div>
        </div>
      </div>
    ),
    size,
  );
}
