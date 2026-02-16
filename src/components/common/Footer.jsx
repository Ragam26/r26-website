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
      char: "R",
      color: "#EC8047",
      image: "/images/footer/footer-1.svg",
      position: { left: "25%", top: "45%" },
    },
    {
      id: 2,
      char: "A",
      color: "#FAE4B2",
      image: "/images/footer/footer-2.svg",
      position: { left: "40%", top: "10%" },
    },
    {
      id: 3,
      char: "G",
      color: "#850419",
      image: "/images/footer/footer-3.svg",
      position: { left: "34%", top: "27%" },
    },
    {
      id: 4,
      char: "A",
      color: "#F7BD73",
      image: "/images/footer/footer-4.svg",
      position: { left: "76%", top: "46%" },
    },
    {
      id: 5,
      char: "M",
      color: "#768367",
      image: "/images/footer/footer-5.svg",
      position: { left: "70%", top: "45%" },
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="relative max-w-7xl mx-auto md:mt-2 mt-20 pt-5 pb-5">
        {/* Huge RAGAM Text */}
        <div className="w-full text-center md:mb-5 md:mt-10 mb-5">
          <h1 className="text-[21vw] md:text-[16vw] md:font-bold font-extrabold tracking-normal leading-none flex justify-center gap-2 md:scale-y-120 scale-y-200 origin-bottom">
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
                className={`cursor-pointer transition-colors duration-300 ${activeMobileLetter === letter.id ? "bg-clip-text text-transparent bg-cover bg-center scale-105" : ""}`}
                style={{
                  backgroundImage:
                    activeMobileLetter === letter.id
                      ? `url(${letter.image})`
                      : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitBackgroundClip:
                    activeMobileLetter === letter.id ? "text" : "",
                  WebkitTextFillColor:
                    activeMobileLetter === letter.id ? "transparent" : "",
                  color: hoverData?.id === letter.id ? letter.color : "white",
                }}
              >
                {letter.char}
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6 w-full">
          {/* Left Section */}
          <div className="order-2 md:order-1 flex flex-col gap-6 items-center md:items-start w-full md:w-auto translate-x-5 md:translate-x-0">
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
          <div className="order-1 md:order-2 grid grid-cols-3 md:gap-x-24 gap-x-6 gap-y-3 w-full md:w-auto text-center md:text-left text-sm md:text-base md:translate-x-10 translate-x-5">
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