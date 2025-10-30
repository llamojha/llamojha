import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 30%, rgba(255,214,102,0.95), rgba(31,21,3,1))",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          fontWeight: 700,
          fontSize: "240px",
          color: "#0F172A",
          letterSpacing: "-0.04em"
        }}
      >
        AL
      </div>
    ),
    {
      ...size
    }
  );
}
