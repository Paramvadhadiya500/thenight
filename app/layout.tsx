// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";

import "./globals.css";

// Load our fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents auto-zoom on mobile inputs
};

export const metadata: Metadata = {
  title: "The House of Earthmonk | AR Digital Menu",
  description: "Experience our premium botanical garden cafe menu in interactive 3D and Augmented Reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen selection:bg-primary selection:text-primary-foreground">
        <SmoothScroll>
          <PageTransition>
            <main className="relative z-10 max-w-md mx-auto min-h-screen bg-background shadow-2xl overflow-hidden">
              {/* We restrict max-width to simulate a mobile app feel even on desktop */}
              {children}
            
            </main>
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}