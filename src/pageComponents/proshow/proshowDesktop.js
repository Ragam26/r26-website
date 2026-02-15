import ProshowCard from "@/pageComponents/proshow/proshowCard";

export default function ProshowDesktop({ artists }) {
  return (
    <div className="scale-[0.85] origin-top ">
      {" "}
      {/* Main centered grid */}
      <div className="flex justify-center items-end gap-[5vw]">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className={artist.id === 2 ? "scale-105 z-10" : "scale-100"}
          >
            <ProshowCard {...artist} />
          </div>
        ))}
      </div>
      {/* Reflection */}
      <div className="overflow-hidden w-full">
        {" "}
        <div
          className="
          flex justify-center gap-[5vw]
          scale-y-[-1] opacity-30 mt-[2vw]
          pointer-events-none select-none
        "
          style={{
            filter: "url(#water-ripple) blur(3px)",
            // 2. Changed the gradient stops to fade out much earlier.
            // It now starts fading immediately (0%) and is completely gone by 45% (midway).
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 50%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 50%)",
          }}
        >
          {artists.map((artist) => (
            <div
              key={`ref-${artist.id}`}
              className={artist.id === 2 ? "scale-105" : "scale-100"}
            >
              <ProshowCard {...artist} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
