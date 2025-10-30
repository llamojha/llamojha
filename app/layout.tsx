import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-alt" });

export const metadata: Metadata = {
  title: "Alvaro Llamojha — DevOps & Observability Engineer",
  description:
    "Portfolio and résumé for Alvaro Llamojha, a DevOps and observability engineer specialising in AWS, serverless architectures, infrastructure as code, and end-to-end monitoring.",
  metadataBase: new URL("https://amllamojha.com"),
  alternates: {
    canonical: "https://amllamojha.com"
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
      "DevOps and observability engineer with a track record building AWS, serverless, and monitoring platforms for commerce and AI teams.",
    url: "https://amllamojha.com",
    siteName: "Alvaro Llamojha",
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvaro Llamojha",
    description:
      "DevOps and observability engineer with a track record building AWS, serverless, and monitoring platforms for commerce and AI teams."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, firaCode.variable, "antialiased")}>{children}</body>
    </html>
  );
}
