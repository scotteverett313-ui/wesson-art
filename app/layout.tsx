import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import AppChrome from "@/components/AppChrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wesson Art — Portfolio",
    template: "%s | Wesson Art",
  },
  description:
    "Digital art and illustration by Wesson. Bold, vibrant, culturally rooted work.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Wesson Art",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body className="flex flex-col min-h-screen bg-black text-white">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
