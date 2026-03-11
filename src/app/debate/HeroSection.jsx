"use client";
import { useState, useRef, useCallback } from "react";
import AdjCard from "../../components/debate/AdjCard";
import AdjModal from "../../components/debate/AdjModal";
import { archivo, instrument } from "@/lib/fonts";

const CA_DATA = [
  {
    name: "Adjudicator One",
    institution: "Institution Name",
    bio: "Brief background about this adjudicator goes here.",
    accomplishments: [
      "Grand Finals adjudicator, ABC Championship 2024",
      "Break adjudicator, XYZ Open 2023",
      "Octos adjudicator, DEF Invitational 2023",
    ],
    image: "/images/debate/caTempo.png",
    revealed: false,
  },
  {
    name: "Adjudicator Two",
    institution: "Institution Name",
    bio: "Brief background about this adjudicator goes here.",
    accomplishments: [
      "Grand Finals adjudicator, ABC Championship 2024",
      "Break adjudicator, XYZ Open 2023",
    ],
    image: "/images/debate/caTempo.png",
    revealed: false,
  },
  {
    name: "Adjudicator Three",
    institution: "Institution Name",
    bio: "Brief background about this adjudicator goes here.",
    accomplishments: [
      "Grand Finals adjudicator, ABC Championship 2024",
      "Break adjudicator, XYZ Open 2023",
      "Octos adjudicator, DEF Invitational 2023",
    ],
    image: "/images/debate/caTempo.png",
    revealed: false,
  },
];

const EASTER_EGG_CLICKS = 10;
const INSTAGRAM_URL = "https://www.instagram.com/donttellthewarden/";

export default function HeroSection({
  titleRef,
  panelTitleRef,
  cardRefs,
  stickyRef,
}) {
  const [titleText, setTitleText] = useState("SAHITI");
  const [flickering, setFlickering] = useState(false);
  const [activeAdj, setActiveAdj] = useState(null);
  const clickCount = useRef(0);
  const audioRef = useRef(null);

  const handleOpenModal = useCallback((adj) => {
    if (!adj?.revealed) return;
    setActiveAdj(adj);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveAdj(null);
  }, []);

  const handleTitleClick = useCallback(() => {
    if (titleText !== "SAHITI") return; // already triggered
    clickCount.current += 1;
    if (clickCount.current >= EASTER_EGG_CLICKS) {
      // flicker sequence then swap
      setFlickering(true);
      // quick on/off flickers via opacity toggling
      const el = document.getElementById("sahiti-title");
      let count = 0;
      const interval = setInterval(() => {
        if (el) el.style.opacity = count % 2 === 0 ? "0" : "1";
        count++;
        if (count > 7) {
          clearInterval(interval);
          if (el) el.style.opacity = "1";
          setTitleText("DHANWANTH");
          setFlickering(false);
          // play audio
          if (!audioRef.current) {
            audioRef.current = new Audio("/images/debate/dhab.mp3");
          }
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }, 90);
    }
  }, [titleText]);

  return (
    <>
      {activeAdj && <AdjModal adj={activeAdj} onClose={handleCloseModal} />}
      <div className="scroll-track relative" style={{ height: "400vh" }}>
        <div
          className="sticky top-0 w-screen h-screen overflow-hidden"
          ref={stickyRef}
        >
          {/* title behind cards */}
          <div
            ref={titleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] z-0 select-none pointer-events-none flex flex-col items-center"
          >
            <p
              className={`${instrument.className} text-white text-[2vw] font-light self-start -mb-7 z-10 pointer-events-auto`}
            >
              Ragam <span className="text-[#D4AF37]">X</span>{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto transition-colors duration-300 hover:text-[#D4AF37]"
              >
                Literary and Debating Club NITC
              </a>{" "}
              presents
            </p>

            <h1
              id="sahiti-title"
              onClick={handleTitleClick}
              className={`${archivo.className} text-white text-center font-light leading-none pointer-events-auto cursor-default select-none transition-none ${
                titleText === "SAHITI" ? "text-[14vw]" : "text-[10vw]"
              }`}
            >
              {titleText}
            </h1>

            <p
              className={`${instrument.className} text-white text-[2vw] font-light self-end -mt-7`}
            >
              Asian Parliamentary Debate
            </p>
          </div>

          {/* cap label */}
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

          {/* cards on top */}
          <div className="cards relative w-full h-full z-10 translate-y-65 pointer-events-none">
            {" "}
            {CA_DATA.map((adj, index) => (
              <AdjCard
                key={index}
                id={`card-${index + 1}`}
                frontAlt="Card Image"
                adjData={adj}
                onOpenModal={handleOpenModal}
                ref={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
