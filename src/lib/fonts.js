import localFont from "next/font/local";
import {
  Slackey,
  Abril_Fatface,
  Playfair,
  Prompt,
  Poppins,
  Alata,
  IBM_Plex_Mono,
  Montserrat,
} from "next/font/google";

export const neuemachina = localFont({
  src: "../../public/fonts/NeueMachina.woff2",
  variable: "--font-neuemachina",
  display: "swap",
});

export const impact = localFont({
  src: "../../public/fonts/impact.woff2",
  variable: "--font-impact",
  display: "swap",
});

export const archivo = localFont({
  src: "../../public/fonts/ArchivoBlack.woff2",
  variable: "--font-archivo",
  display: "swap",
});

export const instrument = localFont({
  src: "../../public/fonts/InstrumentSerif.woff2",
  variable: "--font-instrument",
  display: "swap",
});

export const brixton = localFont({
  src: "../../public/fonts/brixton.woff2",
  variable: "--font-brixton",
  display: "swap",
});

export const calfine = localFont({
  src: "../../public/fonts/calfine.woff2",
  variable: "--font-calfine",
  display: "swap",
});

export const elanor = localFont({
  src: "../../public/fonts/elanorFreePersonalUse-ExtLt.woff2",
  variable: "--font-elanor",
  display: "swap",
});

export const magilio = localFont({
  src: "../../public/fonts/magilioRegular-8Mxvg.woff2",
  variable: "--font-magilio",
  display: "swap",
});

export const marko = localFont({
  src: "../../public/fonts/markoOne-Regular.woff2",
  variable: "--font-marko",
  display: "swap",
});

export const moniqa = localFont({
  src: "../../public/fonts/moniqa-SemBdCondDisplay.woff2",
  variable: "--font-moniqa",
  display: "swap",
});

export const scalter = localFont({
  src: "../../public/fonts/scalter-SerifCondensedSlanted.woff2",
  variable: "--font-scalter",
  display: "swap",
});

export const kiwi = localFont({
  src: "../../public/fonts/KiwiMaru-Medium.woff2",
  variable: "--font-kiwi",
  display: "swap",
});

export const slackey = Slackey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-slackey",
});

export const leagueGothic = localFont({
  src: "../../public/fonts/leagueGothic-Regular-VariableFont_wdth.woff2",
  variable: "--font-league-gothic",
});

export const reykjavik = localFont({
  src: "../../public/fonts/SK-Reykjavik-Rounded-Regular.woff2",
  variable: "--font-reykjavik",
});

export const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});

export const playfair = Playfair({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const prompt = Prompt({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const liberationSerif = localFont({
  src: "../../public/fonts/LiberationSerif-Bold.woff2",
  variable: "--font-liberation-serif",
  display: "swap",
});

export const grotapDemo = localFont({
  src: "../../public/fonts/GrotapDemo.woff2",
  variable: "--font-grotap-demo",
  display: "swap",
});

export const alata = Alata({
  subsets: ["latin"],
  weight: "400",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
