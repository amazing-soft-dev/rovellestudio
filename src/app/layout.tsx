import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/site-header";
import { PageWipe } from "@/components/page-wipe";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rovellestudio.example"),
  title: {
    default: "Rovelle Studio Portfolio",
    template: "%s — Rovelle Studio",
  },
  description:
    "Rovelle is an independent studio shaping brands and digital products through motion, clarity and craft.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable}`}>
      <body className="bg-canvas text-ink antialiased">
        <SiteHeader />
        <PageWipe />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
