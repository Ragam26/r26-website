"use client";

import { useState } from "react";
import { FaInstagram, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const [hoverData, setHoverData] = useState(null);

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
        <div className="w-full text-center mb-20">
          <h1 className="text-[18vw] font-bold tracking-wide leading-none flex justify-center gap-2">
            {letters.map((letter, index) => (
              <span
                key={index}
                onMouseEnter={() => setHoverData(letter)}
                onMouseLeave={() => setHoverData(null)}
                className="cursor-pointer transition-colors duration-300"
                style={{
                  color:
                    hoverData?.id === letter.id
                      ? letter.color
                      : "white",
                }}
              >
                {letter.char}
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Left Section */}
          <div className="flex flex-col gap-6 ">
            <div className="font-bold pl-3">
              <Image
                src="/images/footer/ragam-logo.svg"
                alt="Ragam Logo"
                width={100}
                height={100}
                className="w-24 h-24"
              />
            </div>

            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-400 transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-15 text-sm">
            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-gray-400 transition">Home</a>
              <a href="#" className="hover:text-gray-400 transition">Team</a>
              <a href="#" className="hover:text-gray-400 transition">Sponsors</a>
              <a href="#" className="hover:text-gray-400 transition">Contact Us</a>
            </div>

            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-gray-400 transition">Ragnarok</a>
              <a href="#" className="hover:text-gray-400 transition">Proshow</a>
              <a href="#" className="hover:text-gray-400 transition">Prodezza</a>
            </div>

            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-gray-400 transition">Certificates</a>
              <a href="#" className="hover:text-gray-400 transition">Events</a>
              <a href="#" className="hover:text-gray-400 transition">Workshops</a>
              <a href="#" className="hover:text-gray-400 transition">Sports</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-gray-400">
          © 2026 - Ragam NITC
        </div>

      </div>
    </footer>
  );
}
