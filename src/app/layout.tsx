import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import ModelViewerProvider from "@/components/ModelViewerProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brew & Bean — Artisan Coffee House",
  description: "Hand-roasted beans, quiet mornings, and conversations that last longer than the foam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.css"
        />
      </head>
      <body className="overflow-x-hidden antialiased">
        <ModelViewerProvider>{children}</ModelViewerProvider>
      </body>
    </html>
  );
}