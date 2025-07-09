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
  title: "Ape Label - Worker Dashboard",
  description: "Decentralized task marketplace for data labeling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} font-sora bg-[#0d0d0d] min-h-screen text-white antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0d0d0d] via-[#1a1a2e] to-[#16213e]">
          <div className="flex-1 max-w-screen-xl mx-auto w-full px-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
