import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alvaro Llamojha — DevOps & Observability Engineer",
    short_name: "Alvaro Llamojha",
    description:
      "Portfolio and résumé for Alvaro Llamojha, a DevOps and observability engineer specialising in AWS, serverless architectures, infrastructure as code, and end-to-end monitoring.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#0F172A",
    theme_color: "#FFD666",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon"
      }
    ]
  };
}
