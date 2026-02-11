import Image from "next/image";

export default function ProshowCard({
  name = "JUBIN NAUTIYAL",
  month = "MARCH",
  date = "23",
  tilt = 0,
}) {
  const tiltClass =
    tilt !== 0 ? `[transform:rotateY(${tilt}deg)]` : "";

  return (
    <div className="[perspective:1000px]">
      {/*bs for tilting*/}
      <div  
        className={`
          text-yellow-100 w-70 h-130 flex flex-col
          bg-no-repeat bg-center bg-contain
          transition-transform duration-500
          [transform-style:preserve-3d]
          ${tiltClass}
        `}
        style={{ backgroundImage: `url(proshowCardBg.png)` }}
      >
        
        <div className="flex flex-col flex-1 justify-end text-center text-6xl font-league-gothic">
          {name}
        </div>

        
        <div className="flex flex-row flex-4">
          
          <div className="flex flex-col p-3 pb-12 flex-1 justify-end">
            <div className="flex flex-col items-center gap-8 w-10">
              <span className="text-7xl leading-none w-fit font-league-gothic">
                {date}
              </span>

              <span className="rotate-90 origin-center text-7xl w-fit font-league-gothic">
                {month}
              </span>
            </div>
          </div>

          
          <div className="flex flex-col p-4 flex-5 relative ">
            <Image
              src="/proshowArtist_1.png"
              alt="Proshow Artist"
              fill
              className="-ml-15 mt-12 scale-100 overflow-visible"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
