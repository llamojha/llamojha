import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "#0F172A",
          color: "#F8FAFC",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          padding: "64px",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(255,214,102,0.28), transparent 55%), radial-gradient(circle at 85% 80%, rgba(15,118,110,0.22), transparent 60%)"
        }}
      >
        <span style={{ fontSize: "24px", textTransform: "uppercase", letterSpacing: "0.32em", color: "rgba(226,232,240,0.75)" }}>
          DevOps & Observability
        </span>
        <h1 style={{ fontSize: "68px", lineHeight: "1.05", margin: "18px 0 0" }}>{profile.name}</h1>
        <p style={{ fontSize: "34px", margin: "16px 0 0", color: "rgba(226,232,240,0.9)" }}>{profile.title}</p>
        <p style={{ fontSize: "24px", marginTop: "28px", maxWidth: "760px", color: "rgba(203,213,225,0.85)" }}>{profile.summary}</p>
      </div>
    ),
    {
      ...size
    }
  );
}
