"use client";
import AdjCard from "../../components/debate/AdjCard";
import { archivo, instrument } from "@/lib/fonts";

export default function HeroSection({
  titleRef,
  panelTitleRef,
  cardRefs,
  stickyRef,
}) {
  return (
    <div className="scroll-track relative" style={{ height: "400vh" }}>
      <div
        className="sticky top-0 w-screen h-screen overflow-hidden"
        ref={stickyRef}
      >
        {/* title behind cards — starts centered, scrolls upward */}
        <div
          ref={titleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[75%] z-0 select-none pointer-events-none flex flex-col items-center"
        >
          <p
            className={`${instrument.className} text-white text-[2vw] font-light self-start -mb-7`}
          >
            Ragam <span className="text-[#D4AF37]">X</span> Literary and
            Debating Club NITC presents
          </p>

          <h1
            className={`${archivo.className} text-white text-center text-[14vw] font-light leading-none`}
          >
            SAHITI
          </h1>

          <p
            className={`${instrument.className} text-white text-[2vw] font-light self-end -mt-7`}
          >
            Asian Parliamentary Debate
          </p>
        </div>

        {/* Core Adjudication Panel label — rises up during flip, sits under cards */}
        <div
          ref={panelTitleRef}
          className="absolute top-[20%] left-1/2 -translate-x-1/2 z-5 select-none pointer-events-none text-center w-full"
        >
          <p
            className={`${instrument.className}  text-white text-[4.5vw] font-medium tracking-normal `}
          >
            Core Adjudication Panel
          </p>
        </div>

        {/* cards on top — initial position slightly lower */}
        <div className="cards relative w-full h-full z-10 translate-y-65">
          {" "}
          {[...Array(3)].map((_, index) => (
            <AdjCard
              key={index}
              id={`card-${index + 1}`}
              frontAlt="Card Image"
              backText="CAP DETAILS"
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
