import SponsorCard from "./SponsorCard";

import { leagueGothic, abril } from "@/lib/fonts"; 


const SECTION_ICON = "/images/ragam-logo.svg"
const sponsorData = [
  { title: "TITLE SPONSORS", logos: ["/images/ragam-logo.svg", "/images/sponsors/title2.jpg"] },
  { title: "ASSOCIATE SPONSORS", logos: ["/images/sponsors/associate2.jpg", "/images/sponsors/associate2.jpg", "/images/sponsors/associate2.jpg", "/images/sponsors/associate2.jpg"] },
  { title: "CERTIFICATE SPONSORS", logos: ["/images/sponsors/associate2.jpg", "/images/sponsors/associate2.jpg", "/images/sponsors/associate2.jpg", "/images/sponsors/associate2.jpg"] },
  { title: "POWERED BY SPONSORS", logos: ["/images/sponsors/associate2.jpg", "/images/sponsors/associate2.jpg"] },
  { title: "SPORTS SPONSORS", logos: ["/images/sponsors/associate2.jpg", "/images/sponsors/associate2.jpg"] },
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
        {/* The horizontal line */}
        <div className="w-full h-px bg-white mt-8 opacity-50" />
      </div>

      {sponsorData.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <img src={SECTION_ICON} alt="icon" className="w-8 h-8 object-contain" />
             {section.title}
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {section.logos.map((logo, i) => (
              <SponsorCard key={i} logo={logo} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}