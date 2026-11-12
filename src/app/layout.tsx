import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rovelle Studio",
  description: "Rovelle is an independent studio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
