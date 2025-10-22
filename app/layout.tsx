import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-alt" });

export const metadata: Metadata = {
  title: "Alvaro Llamojha — DevOps & Observability Leader",
  description:
    "Portfolio and résumé for Alvaro Llamojha, a DevOps, platform, and observability engineer with leadership across AWS, New Relic, and high-scale commerce.",
  metadataBase: new URL("https://llamojha.vercel.app"),
  alternates: {
    canonical: "https://llamojha.dev"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "Alvaro Llamojha",
    description:
      "DevOps & Observability leader with a track record building resilient platforms for LEGO, JD Sports, and more.",
    url: "https://llamojha.vercel.app",
    siteName: "Alvaro Llamojha",
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvaro Llamojha",
    description:
      "DevOps & Observability leader with a track record building resilient platforms for LEGO, JD Sports, and more."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, sourceSans.variable, "antialiased bg-slate-950")}>{children}</body>
    </html>
  );
}
