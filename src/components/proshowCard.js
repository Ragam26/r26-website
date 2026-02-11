import Image from "next/image";

export default function ProshowCard({
  name = "JUBIN NAUTIYAL",
  month = "MARCH",
  date = "23",
}) {
  return (
    <div
      className="text-yellow-100 w-70 h-130 overflow-hidden flex flex-col bg-no-repeat bg-center bg-contain"
      style={{ backgroundImage: `url(proshowCardBg.png)` }}
    >
      {/* TOP NAME */}
      <div className="flex flex-col flex-1 justify-end text-center text-6xl font-league-gothic">
        {name}
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-row flex-4">
        {/* DATE / MONTH */}
        <div className="flex flex-col p-3 pb-12 flex-1 justify-end">
          {/* Bottom-fixed block */}
          <div className="flex flex-col items-center gap-8 w-10">
            <span className="text-7xl leading-none w-fit font-league-gothic">
              {date}
            </span>

            {/* Rotated month */}
            <span className="rotate-90 origin-center text-7xl w-fit font-league-gothic">
              {month}
            </span>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col p-4 flex-5 relative">
          <Image
            src="/proshowArtist_1.png"
            alt="Proshow Artist"
            layout="fill"
            className="-ml-15 mt-15 scale-100"
          />
        </div>
      </div>
    </div>
  );
}
