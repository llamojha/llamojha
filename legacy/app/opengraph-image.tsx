import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

const accent = "#FFD666";
const background = "#020617";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: background,
          color: "#F8FAFC",
          padding: "72px",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,214,102,0.25), transparent 60%), radial-gradient(circle at 80% 30%, rgba(148,163,184,0.15), transparent 55%)"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "720px" }}>
          <span style={{ fontSize: "28px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(248,250,252,0.75)" }}>
            amllamojha.com
          </span>
          <h1 style={{ fontSize: "72px", lineHeight: "1.05", margin: 0 }}>{profile.name}</h1>
          <p style={{ fontSize: "36px", color: "rgba(226,232,240,0.92)", margin: 0 }}>{profile.title}</p>
          <p style={{ fontSize: "24px", color: "rgba(226,232,240,0.82)", marginTop: "8px", maxWidth: "680px" }}>{profile.summary}</p>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center", marginTop: "32px" }}>
          {profile.highlights.slice(0, 2).map((highlight) => (
            <div
              key={highlight}
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(148,163,184,0.35)",
                padding: "18px 24px",
                maxWidth: "320px",
                fontSize: "20px",
                lineHeight: "1.4",
                backgroundColor: "rgba(15,23,42,0.55)"
              }}
            >
              {highlight}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "22px", color: "rgba(248,250,252,0.8)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Observability-first DevOps
            </span>
            <span style={{ fontSize: "18px", color: "rgba(148,163,184,0.9)" }}>{profile.location}</span>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 28px",
              borderRadius: "9999px",
              backgroundColor: accent,
              color: "#1F1503",
              fontSize: "22px",
              fontWeight: 600,
              boxShadow: "0 20px 45px rgba(255,214,102,0.45)"
            }}
          >
            Book observability & platform consulting
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
