import localFont from "next/font/local";
import { Slackey } from "next/font/google";

export const brixton = localFont({
  src: "../../public/fonts/brixton.otf",
  variable: "--font-brixton",
  display: "swap",
});

export const calfine = localFont({
  src: "../../public/fonts/calfine.ttf",
  variable: "--font-calfine",
  display: "swap",
});

export const elanor = localFont({
  src: "../../public/fonts/elanorFreePersonalUse-ExtLt.otf",
  variable: "--font-elanor",
  display: "swap",
});

export const magilio = localFont({
  src: "../../public/fonts/magilioRegular-8Mxvg.otf",
  variable: "--font-magilio",
  display: "swap",
});

export const marko = localFont({
  src: "../../public/fonts/markoOne-Regular.ttf",
  variable: "--font-marko",
  display: "swap",
});

export const moniqa = localFont({
  src: "../../public/fonts/moniqa-SemBdCondDisplay.otf",
  variable: "--font-moniqa",
  display: "swap",
});

export const scalter = localFont({
  src: "../../public/fonts/scalter-SerifCondensedSlanted.otf",
  variable: "--font-scalter",
  display: "swap",
});

export const kiwi = localFont({
  src: "../../public/fonts/KiwiMaru-Medium.ttf",
  variable: "--font-kiwi",
  display: "swap",
});

export const slackey = Slackey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-slackey",
});

export const leagueGothic = localFont({
  src: "../../public/fonts/leagueGothic-Regular-VariableFont_wdth.ttf",
  variable: "--font-league-gothic",
});

export const reykjavik = localFont({
  src: "../../public/fonts/SK-Reykjavik-Rounded-Regular.ttf",
  variable: "--font-reykjavik",
});