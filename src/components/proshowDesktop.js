import ProshowCard from "@/components/proshowCard";

export default function ProshowDesktop({ artists }) {
    return (
        <>
            {/* Main centered grid */}
            <div className="flex justify-center items-end gap-[5vw]">
                {artists.map((artist) => (
                    <ProshowCard key={artist.id} tilt={artist.tilt} />
                ))}
            </div>

            {/* Reflection */}
            <div
                className="
          flex justify-center gap-[5vw]
          scale-y-[-1] opacity-30 mt-[2vw]
          pointer-events-none select-none
        "
                style={{
                    filter: "url(#water-ripple) blur(3px)",
                    maskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 90%)",
                    WebkitMaskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 90%)",
                }}
            >
                {artists.map((artist) => (
                    <ProshowCard key={`ref-${artist.id}`} tilt={artist.tilt} />
                ))}
            </div>
        </>
    );
}
