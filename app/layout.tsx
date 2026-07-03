import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-greatvibes",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-tiro",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shravan-weds-saipriya.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shravan Kumar weds Sai Priya | Wedding Invitation",
    template: "%s | Shravan weds Sai Priya",
  },
  description:
    "With the blessings of our families, we joyfully invite you to celebrate the wedding of Shravan Kumar Bhupelli & Sai Priya Kothakapu on 23rd August 2026 at Sri Venkateswara Swami (Balaji) Temple, Aurora, Illinois.",
  applicationName: "Shravan weds Sai Priya",
  keywords: [
    "wedding invitation",
    "Shravan weds Sai Priya",
    "Indian wedding",
    "Hindu wedding",
    "Telugu wedding",
    "Aurora Illinois wedding",
    "Balaji Temple wedding",
    "save the date",
    "August 2026 wedding",
    "RSVP",
  ],
  authors: [{ name: "Shravan Kumar Bhupelli & Sai Priya Kothakapu" }],
  creator: "Shravan Kumar Bhupelli",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Shravan Kumar weds Sai Priya",
    description:
      "Join us in celebrating our wedding — 23rd August 2026, Sri Venkateswara Swami (Balaji) Temple, Aurora, IL.",
    url: siteUrl,
    siteName: "Shravan weds Sai Priya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shravan Kumar weds Sai Priya",
    description: "Join us in celebrating our wedding — 23rd August 2026, Aurora, IL.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  category: "events",
};

export const viewport: Viewport = {
  themeColor: "#7a1f2b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${greatVibes.variable} ${jost.variable} ${tiro.variable} font-body bg-cream text-maroon-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
