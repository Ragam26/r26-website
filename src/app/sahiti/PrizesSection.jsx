"use client";
import Image from "next/image";
import { impact } from "@/lib/fonts";

export default function PrizesSection({
  prizeScrollRef,
  prizeCardInnerRefs,
  prizeTitleRef,
}) {
  return (
    <section className="relative w-screen">
      <div
        ref={prizeScrollRef}
        className="prizes-scroll-track relative"
        style={{ height: "250vh" }}
      >
        <div className="sticky top-0 w-screen h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/images/debate/prizesBg.png')" }}
          />

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `
                linear-gradient(to bottom, #680B1D 0%, transparent 25%),
                linear-gradient(to top,    #680B1D 0%, transparent 25%),
                linear-gradient(to right,  #680B1D 0%, transparent 20%),
                linear-gradient(to left,   #680B1D 0%, transparent 20%)
              `,
            }}
          />

          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <Image
              src="/images/debate/trophy.png"
              alt="Trophy"
              fill
              className="object-contain"
            />
          </div>

          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, #680B1D 0%, transparent 33%)",
            }}
          />

          <h1
            ref={prizeTitleRef}
            className={`${impact.className} absolute top-[4%] left-1/2 -translate-x-1/2 z-40 text-white text-center text-[20vw] font-light leading-none select-none pointer-events-none whitespace-nowrap`}
          >
            PRIZES
          </h1>

          <div
            className="absolute inset-x-0 z-50 flex flex-row items-center justify-center gap-16"
            style={{ top: "46%" }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="prize-card-bob w-50 h-75 perspective-[1000px] shrink-0"
                style={{
                  marginTop: i % 2 === 0 ? "-5vh" : "5vh",
                  animationDelay: `${i % 2 === 0 ? 0 : -1.25}s`,
                }}
              >
                <div
                  className="relative w-full h-full transform-3d"
                  ref={(el) => (prizeCardInnerRefs.current[i] = el)}
                >
                  <div className="absolute w-full h-full backface-hidden rounded-[0.8em] overflow-hidden">
                    <Image
                      src="/images/debate/playingCardBack.png"
                      alt="prize card"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rounded-[0.8em] overflow-hidden transform-[rotateY(180deg)]">
                    <Image
                      src={`/images/debate/prize${i + 1}.png`}
                      alt={`Prize ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
