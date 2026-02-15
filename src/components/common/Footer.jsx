"use client";

import { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const [hoverData, setHoverData] = useState(null);
  const [activeMobileLetter, setActiveMobileLetter] = useState(null);
  const [showRoast, setShowRoast] = useState(false);

  useEffect(() => {
    if (activeMobileLetter !== null) {
      const timer = setTimeout(() => {
        setActiveMobileLetter(null);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [activeMobileLetter]);

  useEffect(() => {
    if (showRoast) {
      const timer = setTimeout(() => {
        setShowRoast(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showRoast]);

  const letters = [
    {
      id: 1,
      char: "/images/footer/R.svg",
      color: "#EC8047",
      image: "/images/footer/footer-1.svg",
      position: { left: "32%", top: "59%" },
    },
    {
      id: 2,
      char: "/images/footer/A1.svg",
      color: "#FAE4B2",
      image: "/images/footer/footer-2.svg",
      position: { left: "43%", top: "22%" },
    },
    {
      id: 3,
      char: "/images/footer/G.svg",
      color: "#850419",
      image: "/images/footer/footer-3.svg",
      position: { left: "39%", top: "38%" },
    },
    {
      id: 4,
      char: "/images/footer/A2.svg",
      color: "#F7BD73",
      image: "/images/footer/footer-4.svg",
      position: { left: "72%", top: "57%" },
    },
    {
      id: 5,
      char: "/images/footer/M.svg",
      color: "#768367",
      image: "/images/footer/footer-5.svg",
      position: { left: "67%", top: "56%" },
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="relative max-w-7xl mx-auto px-6 pt-5 pb-5">
        {/* Floating Image */}
        {hoverData && (
          <div
            className="absolute z-50 pointer-events-none transition-all duration-300"
            style={{
              left: hoverData.position.left,
              top: hoverData.position.top,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={hoverData.image}
              alt="preview"
              width={300}
              height={300}
              className="w-48 h-auto object-cover"
            />
          </div>
        )}

        {/* Huge RAGAM Text */}
        <div className="w-full text-center md:mb-20 md:mt-30 mb-5">
          <h1 className="text-[21vw] md:text-[16vw] md:font-bold font-extrabold tracking-normal leading-none flex justify-center gap-0 md:scale-y-100 scale-y-200 origin-bottom">
            {letters.map((letter) => (
              <span
                key={letter.id}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") {
                    setHoverData(letter);
                  }
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") {
                    setHoverData(null);
                  }
                }}
                onPointerDown={(e) => {
                  if (e.pointerType === "touch") {
                    setActiveMobileLetter(letter.id);
                  }
                }}
                className="cursor-pointer -mx-9"
              >
                <div
                  className="transition-all duration-300"
                  style={{
                    width: "1em",
                    height: "1em",
                    transform:
                      activeMobileLetter === letter.id
                        ? "scale(1.05)"
                        : "scale(1)",
                    backgroundImage:
                      activeMobileLetter === letter.id
                        ? `url(${letter.image})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                    WebKitMaskImage: `url(${letter.char})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",

                    maskImage: `url(${letter.char})`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    maskPosition: "center",

                    backgroundColor:
                      hoverData?.id === letter.id
                        ? letter.color
                        : "white",
                  }}  
                />
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6 w-full">
          {/* Left Section */}
          <div className="order-2 md:order-1 flex flex-col gap-6 items-center md:items-start w-full md:w-auto">
            <div className="font-bold pl-5">
              <Image
                src="/images/footer/ragam-logo.svg"
                alt="Ragam Logo"
                width={100}
                height={100}
                className="w-24 h-24 hidden md:block"
              />
            </div>

            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center md:justify-start">
              <a
                href="https://www.instagram.com/ragam_nitc/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition"
              >
                <FaInstagram className="text-xl md:text-3xl" />
              </a>
              <a
                href="https://www.facebook.com/Ragam.nitc/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition"
              >
                <FaFacebook className="text-xl md:text-3xl" />
              </a>
              <a
                href="https://in.linkedin.com/company/ragam-national-institute-of-technology-calicut"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition"
              >
                <FaLinkedinIn className="text-xl md:text-3xl" />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="order-1 md:order-2 grid grid-cols-2 sm:grid-cols-3 gap-x-24 gap-y-3 w-full md:w-auto text-center md:text-left text-sm md:text-base md:translate-x-10">
            <div className="flex flex-col gap-3 order-3 md:order-1">
              <a href="#" className="hover:text-gray-400 transition">
                Home
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Team
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Sponsors
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Contact Us
              </a>
            </div>

            <div className="flex flex-col gap-3 order-2 md:order-2">
              <a href="#" className="hover:text-gray-400 transition">
                Ragnarok
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Proshow
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Prodezza
              </a>
            </div>

            <div className="flex flex-col gap-3 order-1 md:order-3">
              <a href="#" className="hover:text-gray-400 transition">
                Certificates
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Events
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Workshops
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Sports
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          onClick={() => setShowRoast(true)}
          className="mt-6 md:text-center text-[10px] text-gray-400 md:text-sm text-right cursor-pointer"
        >
          © 2026 - Ragam NITC
        </div>
      </div>

      {showRoast && (
        <div className="fixed bottom-4 right-4 bg-white text-black text-xs md:text-sm px-4 py-2 rounded-lg shadow-lg z-100 animate-fade-in">
          stop tripping bro
        </div>
      )}
    </footer>
  );
}
