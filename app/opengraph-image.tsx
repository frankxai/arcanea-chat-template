import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Arcanea Chat Template — 12 Luminors, real BYOK, cosmic glass UI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(0, 188, 212, 0.22), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(167, 139, 250, 0.18), transparent 50%), #09090b",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(0, 188, 212, 0.12)",
              border: "1px solid rgba(0, 188, 212, 0.35)",
              fontSize: 32,
              color: "#00bcd4",
            }}
          >
            ✦
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#94a3b8",
              fontWeight: 500,
            }}
          >
            Arcanea · Chat Template
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 28,
            background: "linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          12 Luminors. Real BYOK.
          <br />
          Your keys, your keep.
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            marginBottom: 56,
            lineHeight: 1.4,
            maxWidth: 980,
          }}
        >
          Fork a premium AI chat template with 12 persona agents, liquid glass UI,
          and keys that never touch the server.
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            color: "#00bcd4",
            fontFamily: "monospace",
          }}
        >
          <span>Next.js 16</span>
          <span style={{ color: "#334155" }}>·</span>
          <span>AI SDK 6</span>
          <span style={{ color: "#334155" }}>·</span>
          <span>Tailwind v4</span>
          <span style={{ color: "#334155" }}>·</span>
          <span style={{ color: "#ffd700" }}>MIT</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
