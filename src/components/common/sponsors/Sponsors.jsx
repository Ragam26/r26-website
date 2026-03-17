import SponsorCard from "./SponsorCard";
import { leagueGothic, abril } from "@/lib/fonts"; 

const SECTION_ICON = "/images/ragam-logo.svg";
const sponsorData = [
  { 
    title: "OFFICIAL FOOTWEAR PARTNER", 
    logos: [{ src: "/images/sponsors/Hawalker.jpeg", name: "Hawalker" }] 
  },
  { 
    title: "OFFICIAL RADIO PARTNER", 
    logos: [{ src: "/images/sponsors/RedFM.png", name: "Red FM"}] 
  },
  { 
    title: "PRE RAGAM WORKSHOP PARTNER", 
    logos: [{ src: "/images/sponsors/Brilliant.png", name: "Brilliant" }] 
  },
];

export default function Sponsors() {
  return (
    <div className="text-white p-6 md:p-12 max-w-4xl mx-auto">
      
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <h1 className={`${leagueGothic.className} text-7xl md:text-9xl uppercase tracking-wider`}>
          SPONSORS
        </h1>
        <h2 className={`${abril.className} text-4xl md:text-6xl mt-2`}>
          RAGAM 2026
        </h2>
        <div className="w-full h-px bg-white mt-8 opacity-50" />
      </div>

      {sponsorData.map((section, index) => (
        <section key={index} className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <img src={SECTION_ICON} alt="icon" className="w-8 h-8 object-contain" />
            {section.title}
          </h2>

          {/* FLEX instead of GRID */}
          <div className="flex flex-col md:flex-row gap-8">
            {section.logos.map((item, i) => (
              <div key={i} className="flex flex-col items-center w-full md:w-1/2">
                <SponsorCard logo={item.src} />
                <p className="mt-3 text-2xl md:text-3xl text-gray-300 text-center font-bold tracking-wide">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}