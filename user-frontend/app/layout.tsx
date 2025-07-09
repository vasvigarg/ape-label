import type React from "react";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Ape Label - Decentralized Data Labeling",
  description:
    "Your one stop destination for decentralized data labeling on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} font-sora bg-gradient-to-br from-gray-900 via-black to-purple-900 min-h-screen text-white`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-black pointer-events-none"></div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
