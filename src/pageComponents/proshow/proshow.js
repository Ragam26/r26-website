import { League_Gothic, Allura } from "next/font/google";
import ProshowDesktop from "@/pageComponents/proshow/proshowDesktop";
import ProshowMobile from "@/pageComponents/proshow/carousal";

const leagueGothic = League_Gothic({ subsets: ["latin"], weight: "400" });
const allura = Allura({ subsets: ["latin"], weight: "400" });

export default function ProshowSection({ isMobile }) {
  const artists = [
    {
      id: 1,
      name: "YOGI SEKAR",
      day: "DAY 3",
      date: "29",
      month: "MARCH",
      image: "/images/proshow/yogi.png",
      song: "/images/proshow/yogi.mp3",
      revealed: 1,
      imageOffsetX: 60,
      imageOffsetY: -56,
      imageScale: 1.7,
      passLink: "https://makemypass.com/event/early-bird-ragam-pass",
    },
    {
      id: 2,
      name: "AMIT MISHRA",
      day: "DAY 1",
      date: "27",
      month: "MARCH",
      image: "/images/proshow/amit4.png",
      song: "/images/proshow/amit.mp3",
      revealed: 1,
      imageOffsetX: 0,
      imageOffsetY: -20,
      imageScale: 1.2,
      passLink: "https://makemypass.com/event/early-bird-ragam-pass",
    },
    {
      id: 3,
      name: "W.i.S.H",
      day: "DAY 1",
      date: "27",
      month: "MARCH",
      image: "/images/proshow/wish3.png",
      song: "/images/proshow/wish.mp3",
      revealed: 1,
      imageOffsetX: 35,
      imageOffsetY: -100,
      imageScale: 1.7,
      passLink: "https://makemypass.com/event/early-bird-ragam-pass",
    },
    {
      id: 4,
      name: "DARSHAN RAVAL",
      day: "DAY 2",
      date: "28",
      month: "MARCH",
      image: "/images/proshow/darshan.png",
      song: "/images/proshow/hawa.mp3",
      revealed: 1,
      imageOffsetX: 35,
      imageOffsetY: -30,
      imageScale: 1.8,
      passLink: "https://makemypass.com/event/early-bird-ragam-pass",
    },
    {
      id: 5,
      name: "VEDAN",
      day: "DAY 2",
      date: "28",
      month: "MARCH",
      image: "/images/proshow/vedan.png",
      revealed: 1,
      song: "/images/proshow/vedan.mp3",
      revealed: 1,
      imageOffsetX: 16,
      imageOffsetY: -28,
      imageScale: 1.4,
      passLink: "https://makemypass.com/event/early-bird-ragam-pass",
    },
    {
      id: 6,
      name: "VINEETH SRINIVASAN",
      day: "DAY 3",
      date: "29",
      month: "MARCH",
      image: "/images/proshow/vineeth.png",
      song: "/images/proshow/vineeth.mp3",
      revealed: 1,
      imageOffsetX: 60,
      imageOffsetY: -69,
      imageScale: 1.7,
      passLink: "https://makemypass.com/event/early-bird-ragam-pass",
    },
    {
      id: 7,
      name: "JONITA GANDHI",
      day: "DAY 3",
      date: "29",
      month: "MARCH",
      image: "/images/proshow/jonita.png",
      song: "/images/proshow/jonita.mp3",
      revealed: 1,
      imageOffsetX: 70,
      imageOffsetY: -69,
      imageScale: 1.7,
      passLink: "https://makemypass.com/event/early-bird-ragam-pass",
    },
  ];

  return (
    <section className="relative max-w-[100vw] mx-auto py-3 overflow-hidden md:h-[136vh] mb-10">
      {/* Water ripple filter */}
      <svg className="fixed top-0 left-0 w-0 h-0 invisible">
        <filter id="water-ripple">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.05"
            numOctaves="2"
            seed="1"
          >
            <animate
              attributeName="baseFrequency"
              dur="8s"
              values="0.01 0.05;0.01 0.07;0.01 0.05"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="15" />
        </filter>
      </svg>

      {/* Title */}
      <h1
        className="font-bold flex justify-center items-center
               -translate-y-2 md:translate-0 text-[17vw] lg:text-[10vw]"
      >
        <span
          className={`${leagueGothic.className} text-[#F4EFCF]
                drop-shadow-[0_0_12px_rgba(244,239,207,0.8)]`}
        >
          PROSHOW
        </span>

        <span
          className={`${allura.className} -ml-[1.5vw] mt-[1vw] text-[#F4EFCF]
                drop-shadow-[0_0_12px_rgba(244,239,207,0.25)]`}
        >
          Artists
        </span>
      </h1>

      <div className="block lg:hidden">
        <ProshowMobile items={artists} />
      </div>

      <div className="hidden lg:block">
        <ProshowDesktop artists={artists} allDayPassLink={null} />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-16 z-50 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
    </section>
  );
}
