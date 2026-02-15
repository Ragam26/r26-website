import './globals.css'
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Slackey } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";

import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollReset from "@/components/common/ScrollReset";

const slackey = Slackey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-slackey",
});

const leagueGothic = localFont({
  src: "../fonts/LeagueGothic-Regular-VariableFont_wdth.ttf",
  variable: "--font-league-gothic",
});

export const metadata = {
  title: 'Ragam 2026',
  description:
    "Official website of Ragam 2026, South India's biggest cultural fest!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${leagueGothic.variable} ${slackey.variable} antialiased`}
        suppressHydrationWarning
      >
        {" "}
        <ScrollReset /> <SmoothScroll>{children} <Footer /></SmoothScroll>
        <ScrollReset />
      </body>
    </html>
  )
}
