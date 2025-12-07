import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creati.studio - AI-Powered Creative Platform",
  description: "Transform your creative vision into reality with our AI-powered platform. Design, generate, and iterate at the speed of thought.",
  keywords: ["AI", "Creative Platform", "Design", "Content Generation", "AI Tools", "Creativity"],
  authors: [{ name: "Creati.studio Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Creati.studio - AI-Powered Creative Platform",
    description: "Transform your creative vision into reality with AI-powered tools for design, content, and code generation.",
    url: "https://creati.studio",
    siteName: "Creati.studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creati.studio - AI-Powered Creative Platform",
    description: "Transform your creative vision into reality with AI-powered tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
