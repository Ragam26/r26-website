import {
  brixton,
  marko,
  moniqa,
  scalter,
  slackey,
  leagueGothic,
  elanor,
  calfine,
  magilio,
} from "@/lib/fonts";

export const slideData = [
  {
    title: "EVENTS",
    titleFont: calfine.className,
    titleSize: "text-8xl",
    titleWeight: "font-bold",

    desc: "Flagship Competitions",
    descFont: marko.className,
    descSize: "text-xl",
    descWeight: "font-normal",
  },
  {
    title: "WORKSHOPS",
    titleFont: moniqa.className,
    titleSize: "text-[6.2rem]",
    titleWeight: "font-black",

    desc: "Hands-on Learning",
    descFont: marko.className,
    descSize: "text-xl",
    descWeight: "font-normal",
  },
  {
    title: "GAMING",
    titleFont: scalter.className,
    titleSize: "text-8xl",
    titleWeight: "font-normal",

    desc: "Esports Battles",
    descFont: marko.className,
    descSize: "text-xl",
    descWeight: "font-normal",
  },
  {
    title: "PRODEZZA",
    titleFont: magilio.className,
    titleSize: "text-[5.6rem]",
    titleWeight: "font-black",

    desc: "Creative Contests",
    descFont: marko.className,
    descSize: "text-xl",
    descWeight: "font-normal",
  },
  {
    title: "SPORTS",
    titleFont: calfine.className,
    titleSize: "text-8xl",
    titleWeight: "font-black",

    desc: "Athletic Showdown",
    descFont: marko.className,
    descSize: "text-xl",
    descWeight: "font-normal",
  },
  {
    title: "PROSHOW",
    titleFont: moniqa.className,
    titleSize: "text-[6.2rem]",
    titleWeight: "font-black",

    desc: "Star Performances",
    descFont: marko.className,
    descSize: "text-xl",
    descWeight: "font-normal",
  },
  {
    title: "I-INK",
    titleFont: magilio.className,
    titleSize: "text-[5.6rem]",
    titleWeight: "font-black",

    desc: "Words & Wit",
    descFont: marko.className,
    descSize: "text-xl",
    descWeight: "font-normal",
  },
  {
    title: "INFORMALS",
    titleFont: scalter.className,
    titleSize: "text-8xl",
    titleWeight: "font-normal",

    desc: "Cultural Showcase",
    descFont: marko.className,
    descSize: "text-xl",
    descWeight: "font-normal",
  },
];

export const slideTitles = slideData.map((slide) => slide.title);
