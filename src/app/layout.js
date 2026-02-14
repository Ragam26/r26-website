import { Slackey, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollReset from "@/components/common/ScrollReset";

const slackey = Slackey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-slackey",
});

export const metadata = {
  title: "Ragam 2026",
  description:
    "Official website of Ragam 2026, South India's biggest cultural fest!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${slackey.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        {" "}
        <ScrollReset /> <SmoothScroll>{children}</SmoothScroll>
        <ScrollReset />
      </body>
    </html>
  );
}
