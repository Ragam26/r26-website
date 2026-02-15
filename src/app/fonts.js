import localFont from "next/font/local";
import { Slackey } from "next/font/google";

export const brixton = localFont({
  src: "./fonts/brixton-lead-vector.otf",
  variable: "--font-brixton",
  display: "swap",
});

export const calfine = localFont({
  src: "./fonts/Calfine.ttf",
  variable: "--font-calfine",
  display: "swap",
});

export const elanor = localFont({
  src: "./fonts/ElanorFreePersonalUse-ExtLt.otf",
  variable: "--font-elanor",
  display: "swap",
});

export const magilio = localFont({
  src: "./fonts/MagilioRegular-8Mxvg.otf",
  variable: "--font-magilio",
  display: "swap",
});

export const marko = localFont({
  src: "./fonts/MarkoOne-Regular.ttf",
  variable: "--font-marko",
  display: "swap",
});

export const moniqa = localFont({
  src: "./fonts/Moniqa-SemBdCondDisplay.otf",
  variable: "--font-moniqa",
  display: "swap",
});

export const scalter = localFont({
  src: "./fonts/Scalter-SerifCondensedSlanted.otf",
  variable: "--font-scalter",
  display: "swap",
});

const slackey = Slackey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-slackey",
});

const leagueGothic = localFont({
  src: "../fonts/LeagueGothic-Regular-VariableFont_wdth.ttf",
  variable: "--font-league-gothic",
});
