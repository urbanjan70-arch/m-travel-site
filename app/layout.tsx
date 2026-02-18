import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M Travel 嘉泰｜布拉格精品私人導覽與接送",
  description:
    "布拉格精品私人導覽、城市接送與多日客製行程。中文友善、溫暖細緻、輕奢不浮誇。Private tours in Prague with a soft luxury touch.",
  keywords: [
    "布拉格私人導覽",
    "Prague private tour",
    "布拉格中文導遊",
    "Prague Chinese guide",
    "布拉格接送服務",
    "Prague transfers",
    "M Travel 嘉泰",
  ],
  openGraph: {
    title: "M Travel 嘉泰｜布拉格精品私人導覽",
    description:
      "布拉格精品私人導覽與城市接送服務。Chinese-friendly private tours in Prague.",
    url: "https://m-travel-site.vercel.app",
    siteName: "M Travel 嘉泰",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
