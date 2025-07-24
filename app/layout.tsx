import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
// import Navbar from "@/components/Navbar";
import { Suspense } from 'react';
// import Footer from "@/components/Footer";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Fitup Uniforms",
  description: "Your one-stop shop for high-quality uniforms and apparel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${montserrat.variable} 
          antialiased
          h-screen flex flex-col
        `}
      >
        <Suspense fallback={null}>
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}
