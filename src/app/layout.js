import "./globals.css"; // Removed the duplicate import
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import PageTransition from "@/components/common/PageTransition";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollReset from "@/components/common/ScrollReset";
import { Analytics } from "@vercel/analytics/next";
import {
  brixton,
  calfine,
  elanor,
  magilio,
  marko,
  moniqa,
  scalter,
  slackey,
  leagueGothic,
  kiwi,
} from "@/lib/fonts";

export const metadata = {
  title: "Ragam 2026",
  description:
    "Official website of Ragam 2026, South India's biggest cultural fest!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${leagueGothic.variable}
          ${slackey.variable}
          ${brixton.variable}
          ${calfine.variable}
          ${elanor.variable}
          ${magilio.variable}
          ${marko.variable}
          ${moniqa.variable}
          ${scalter.variable}
          ${kiwi.variable}
          antialiased
        `}
        suppressHydrationWarning
      >
        <PageTransition />
        <ScrollReset />
        <SmoothScroll>
          <div
            className="relative z-10 bg-black"
            style={{ marginBottom: "var(--footer-height, 0px)" }}
          >
            <Navbar />
            {children}
          </div>

          <div className="fixed bottom-0 left-0 w-full -z-10">
            <Footer />
          </div>
        </SmoothScroll>
        <ScrollReset />
        <Analytics />
      </body>
    </html>
  );
}
