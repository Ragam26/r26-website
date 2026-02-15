import { League_Gothic, Allura } from "next/font/google";
import ProshowDesktop from "@/components/proshowDesktop";
import ProshowMobile from "@/components/carousal";

const leagueGothic = League_Gothic({ subsets: ["latin"], weight: "400" });
const allura = Allura({ subsets: ["latin"], weight: "400" });

export default function ProshowSection({ isMobile }) {
  const artists = [
    {
      id: 1,
      tilt: -15,
      name: "COMING SOON",
      date: "27",
      month: "MARCH",
      image: "/images/proshow/proshowArtist_1.png",
    },
    {
      id: 2,
      tilt: 0,
      name: "COMING SOON",
      date: "28",
      month: "MARCH",
      image: "/images/proshow/proshowArtist_1.png",
    },
    {
      id: 3,
      tilt: 15,
      name: "COMING SOON",
      date: "29",
      month: "MARCH",
      image: "/images/proshow/proshowArtist_1.png",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-3 overflow-hidden md:h-[screen]">
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
               text-[15vw] lg:text-[6vw]"
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
        <ProshowDesktop artists={artists} />
      </div>
    </section>
  );
}
