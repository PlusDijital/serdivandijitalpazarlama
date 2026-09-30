import { ImageResponse } from "next/og";

export const alt = "Serdivan Reklam Ajansı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#fafaf7",
          color: "#0b1b33",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#0b1b33",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 30, color: "#4b5563" }}>serdivanreklamajansi.com</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            Serdivan Reklam Ajansı
          </div>
          <div style={{ fontSize: 34, color: "#0e7c66", fontWeight: 700 }}>
            Google Ads · Instagram Reklam · SEO · Web Tasarım
          </div>
          <div style={{ fontSize: 24, color: "#4b5563" }}>{"Plus Dijital'in Serdivan'daki yerel markası"}</div>
        </div>
      </div>
    ),
    size,
  );
}
