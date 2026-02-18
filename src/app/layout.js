import "./globals.css";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollReset from "@/components/common/ScrollReset";
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
        {" "}
        <ScrollReset />{" "}
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
        <ScrollReset />
      </body>
    </html>
  );
}
