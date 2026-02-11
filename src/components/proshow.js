import ProshowCard from "@/components/proshowCard";
import { League_Gothic, Allura } from 'next/font/google';

const leagueGothic = League_Gothic({ subsets: ['latin'], weight: '400' });
const allura = Allura({ subsets: ['latin'], weight: '400' });

export default function Home() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-16 overflow-hidden">
            <svg className="fixed top-0 left-0 w-0 h-0 invisible">
                <filter id="water-ripple">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" seed="1">
                        <animate attributeName="baseFrequency" dur="8s" values="0.01 0.05;0.01 0.07;0.01 0.05" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="15" />
                </filter>
            </svg>

            <h1 className="text-9xl font-bold ">
                <div className="flex flex-row justify-center">
                    <span className={`${leagueGothic.className} text-[#F4EFCF] drop-shadow-[0_0_10px_rgba(244,349,207,0.5)] `}>PROSHOW</span><span className={`${allura.className} text-[10rem] -ml-[1.5vw] mt-[1vw] text-[#F4EFCF] drop-shadow-[0_0_10px_rgba(244,349,207,0.2)]`}>Artist</span>
                </div>

            </h1>


            <div className="flex flex-wrap justify-center gap-[5vw] relative z-10">
                <ProshowCard tilt={15} />
                <ProshowCard />
                <ProshowCard tilt={-15} />
            </div>

            {/*rippling thing bro*/}
            <div

                className="flex flex-wrap justify-center gap-[5vw] scale-y-[-1] opacity-30 mt-[2vw] pointer-events-none select-none"

                style={{
                    filter: 'url(#water-ripple) blur(3px)',
                    maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 90%)',
                    WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 90%)',
                }}
            >
                <ProshowCard tilt={15} />
                <ProshowCard />
                <ProshowCard tilt={-15} />
            </div>
        </section>
    );
}
