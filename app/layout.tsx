import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Narayan AI | Living Digital Identity",
  description:
    "Talk with Narayan AI — Engineer, Founder, Builder, and Systems Thinker exploring AI, products, mobility, travel, and life.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
