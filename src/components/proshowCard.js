import Image from "next/image";

export default function ProshowCard({
  name = "Artist Name",
  month = "MAR",
  date = "00",
  tilt = 0,
  image = "/images/proshow/proshowArtist_1.png",
}) {
  return (
    <div
      className="
  perspective-[1000px] 
  transition-transform 
  duration-300 
  ease-in-out 
  hover:-translate-y-3
"
    >
      {" "}
      <div
        className="
          text-yellow-100 w-70 h-130 flex flex-col
          bg-no-repeat bg-center bg-contain
          transition-transform duration-500
          transform-3d
        "
        style={{
          backgroundImage: `url(/images/proshow/proshowCardBg.png)`,
          transform: `rotateY(${tilt}deg)`,
        }}
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

          <div className="flex flex-col p-4 flex-5 relative">
            <Image
              src={image}
              alt={name}
              fill
              className="-ml-15 mt-12 scale-100 overflow-visible object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
