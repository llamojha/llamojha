import type { Metadata, Viewport } from "next";
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
  applicationName: "Alvaro Llamojha Portfolio",
  keywords: [
    "Alvaro Llamojha",
    "DevOps engineer",
    "Observability consultant",
    "AWS serverless",
    "Infrastructure as code",
    "Platform engineering",
    "Site reliability"
  ],
  authors: [{ name: "Alvaro Llamojha", url: "https://www.linkedin.com/in/alvarollamojha" }],
  creator: "Alvaro Llamojha",
  publisher: "Alvaro Llamojha",
  category: "Technology",
  alternates: {
    canonical: "https://amllamojha.com",
    languages: {
      "en-GB": "/"
    }
  },
  icons: {
    icon: "/icon",
    apple: "/icon"
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
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alvaro Llamojha — DevOps & Observability Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvaro Llamojha",
    description:
      "DevOps and observability engineer with a track record building AWS, serverless, and monitoring platforms for commerce and AI teams.",
    creator: "@llamojha",
    site: "@llamojha",
    images: [
      {
        url: "/twitter-image",
        alt: "Alvaro Llamojha — DevOps & Observability Engineer"
      }
    ]
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false
  },
  verification: {
    other: {
      me: "mailto:hello@amllamojha.com"
    }
  }
};

export const viewport: Viewport = {
  themeColor: "#FFD666"
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
