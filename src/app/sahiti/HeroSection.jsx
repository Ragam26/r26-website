"use client";
import { useState, useRef, useCallback } from "react";
import AdjCard from "../../components/debate/AdjCard";
import AdjModal from "../../components/debate/AdjModal";
import { archivo, instrument } from "@/lib/fonts";

const CA_DATA = [
  {
    name: "Swayam Krishna",
    institution: "SRM University, Kattankulathur",
    bio: "Swayam Krishnan is a versatile and competitive debater with various achievements across national and intercollegiate circuits. A Best Speaker and Overall Winner at the CRMD National Level Debate (FRCRCE, Mumbai), he has also won the Athena '25 Parliamentary Debate and the Hermex '25 National Debate. He frequently serves as a chief adjudicator and MUN chair and has won 15+ awards across multiple MUN conferences.",
    accomplishments: [
      "Chief Adjudicator, Rhetoric'24 Parliamentary Debate, PS Senior Secondary School",
      "Chief Adjudicator, Rhetoric'23 Parliamentary Debate, PS Senior Secondary School",
      "Chief Adjudicator, Jhalak'26 Oxford-Style Debate, SRM KTR",
      "Chief Adjudicator, Reflection'25 Parliamentary Debate, Vidya Mandir, Mylapore",
      "Chaired 15+ Model United Nations (MUN) Conferences"
    ],
    image: "/images/debate/temp/swayam.jpeg",
    revealed: true,
  },
  {
    name: "Aditya Santosh",
    institution: "Vivekanand Education Society's Institute Of Technology, Mumbai",
    bio: "Aditya Santosh is a highly accomplished debater known for his dynamic presence across national debate circuits. With outstanding performances at prestigious platforms including the Hindustan Times Centennial Debate and multiple IITs and IIMs, he has also competed across economics, strategy, and case study competitions while remaining actively involved in adjudication and campus literary initiatives.",
    accomplishments: [
      "Adjudicator at NMIMS School of Business, School of Arts, School of Economics",
      "Hindustan Times Centennial Debate - 2nd in Mumbai , Top 12 in India (Judged by Dr. Shashi Tharoor, Jay Panda, Justice Mittal)",
      "Deputy Head of the VESLit Circle - Official Literary Society of VESIT",
      "Fifth Place at NIT Surathkal Asian Parliamentary Debate"
    ],
    image: "/images/debate/temp/aditya.jpeg",
    revealed: true,
  },
  {
    name: "Jaefar Shameem",
    institution: "NIT Calicut",
    bio: "Jaefar Shameem is a highly accomplished debater with extensive experience in both World Schools (WSDC) and British Parliamentary formats, under QatarDebate. He is the QSDL Nationals Champion and Best Speaker, and was ranked 8th Best ESL Speaker at the Winter Holiday Open in Croatia. An alumnus of the World Schools Debate Academy in Slovenia, Jaefar has also debated and adjudicated training rounds with national teams representing the UAE, Tanzania, and Slovenia, making him a strong presence on the international debating circuit.",
    accomplishments: [
      "OrgComm Student Rep - 5th International Schools Debating Championship (ISDC) (Organized by QatarDebate; featuring 50+ participating national teams)",
      "8th Best ESL Speaker - Winter Holiday Open (WHO), Croatia (WSDC-format tournament featuring 50+ national teams)",
      "National Champion & Overall Best Speaker - Qatar Schools Debate League (QSDL)",
      "Alumnus & Undefeated Practice Team Member - World Schools Debate Academy (WSDA), Slovenia (International training program hosting 50+ national teams)",
      "Secretariat, Head Chair, and Best Delegate - Across 15+ Model UN Conferences"
    ],
    image: "/images/debate/temp/jaefar.jpeg",
    revealed: true,
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
      <div className="scroll-track relative h-[300vh] md:h-[400vh]">
        <div
          className="sticky top-0 w-screen h-screen overflow-hidden"
          ref={stickyRef}
        >
          {/* title behind cards */}
          <div
            ref={titleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140%] md:-translate-y-[80%] z-0 select-none pointer-events-none flex flex-col items-center"
          >
            <p
              className={`${instrument.className} text-white text-[4.5vw] md:text-[2vw] font-light self-center md:self-start -mb-2 md:-mb-7 z-10 pointer-events-auto text-center md:text-left`}
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
                titleText === "SAHITI"
                  ? "text-[22vw] md:text-[14vw]"
                  : "text-[12vw] md:text-[10vw]"
              }`}
            >
              {titleText}
            </h1>

            <p
              className={`${instrument.className} text-white text-[7vw] md:text-[2vw] font-light self-center md:self-end -mt-3 md:-mt-7 text-center md:text-right`}
            >
              Asian Parliamentary Debate
            </p>
          </div>

          {/* cap label */}
          <div
            ref={panelTitleRef}
            className="absolute top-[25%] md:top-[20%] left-1/2 -translate-x-1/2 z-5 select-none pointer-events-none text-center w-full"
          >
            <p
              className={`${instrument.className}  text-white text-[10vw] md:text-[4.5vw] font-medium tracking-normal `}
            >
              Core Adjudication Panel
            </p>
          </div>

          {/* cards on top */}
          <div className="cards relative w-full h-full z-10 translate-y-40 md:translate-y-65 pointer-events-none">
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
