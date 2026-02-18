'use client'

import { useState, useEffect } from 'react'
import { FaInstagram, FaFacebook, FaLinkedinIn } from 'react-icons/fa'
import Image from 'next/image'

export default function Footer() {
  const [hoverData, setHoverData] = useState(null)
  const [activeMobileLetter, setActiveMobileLetter] = useState(null)
  const [showRoast, setShowRoast] = useState(false)

  /* ---------------- MOBILE TAP RESET ---------------- */
  useEffect(() => {
    if (activeMobileLetter !== null) {
      const timer = setTimeout(() => {
        setActiveMobileLetter(null)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [activeMobileLetter])

  /* ---------------- ROAST RESET ---------------- */
  useEffect(() => {
    if (showRoast) {
      const timer = setTimeout(() => {
        setShowRoast(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showRoast])

  const letters = [
    {
      id: 1,
      char: "/images/footer/R.svg",
      color: "#EC8047",
      image: "/images/footer/footer-1.svg",
      hoverOffset: { x: "10%", y: "59%" },
    },
    {
      id: 2,
      char: "/images/footer/A1.svg",
      color: "#FAE4B2",
      image: "/images/footer/footer-2.svg",
      hoverOffset: { x: "-5%", y: "-135%" },
    },
    {
      id: 3,
      char: "/images/footer/G.svg",
      color: "#850419",
      image: "/images/footer/footer-3.svg",
      hoverOffset: { x: "-120%", y: "-50%" },
    },
    {
      id: 4,
      char: "/images/footer/A2.svg",
      color: "#F7BD73",
      image: "/images/footer/footer-4.svg",
      hoverOffset: { x: "9%", y: "32%" },
    },
    {
      id: 5,
      char: "/images/footer/M.svg",
      color: "#768367",
      image: "/images/footer/footer-5.svg",
      hoverOffset: { x: "-120%", y: "36%" },
    },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="relative max-w-7xl mx-auto md:mt-2 mt-20 pt-5 pb-5">

        {/* ---------- HUGE RAGAM TEXT ---------- */}
        <div className="w-full text-center md:mb-20 md:mt-30 mb-10 -mt-10 ml-5">
          <h1 className="text-[clamp(6rem,18vw,16rem)] md:font-bold font-extrabold leading-none flex justify-center md:gap-0 gap-10 md:scale-y-100 scale-y-150 scale-x-130 md:scale-x-100 origin-bottom -translate-x-5 md:translate-x-0">

            {letters.map((letter) => (
              <span
                key={letter.id}
                className="cursor-pointer -mx-9 relative"

                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') {
                    setHoverData(letter)
                  }
                }}

                onPointerLeave={(e) => {
                  if (e.pointerType === 'mouse') {
                    setHoverData(null)
                  }
                }}

                onPointerDown={(e) => {
                  if (e.pointerType === 'touch') {
                    setActiveMobileLetter(letter.id)
                  }
                }}
              >
                {/* LETTER SHAPE */}
                <div
                  className='transition-all duration-300'
                  style={{
                    width: '1em',
                    height: '1em',
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
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    WebkitMaskPosition: 'center',

                    maskImage: `url(${letter.char})`,
                    maskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    maskPosition: 'center',

                    backgroundColor:
                      hoverData?.id === letter.id
                        ? letter.color
                        : "white",
                  }}
                />

                {/* ✅ SMOOTH HOVER IMAGE (ALWAYS MOUNTED) */}
                <div
                  className="
                    absolute
                    pointer-events-none
                    z-50
                    w-52 h-36
                    transition-all duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    will-change-[opacity,transform]
                  "
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(${letter.hoverOffset.x}, ${letter.hoverOffset.y})`,
                    opacity: hoverData?.id === letter.id ? 1 : 0,
                    scale: hoverData?.id === letter.id ? 1 : 0.95,
                  }}
                >
                  <Image
                    src={letter.image}
                    alt={letter.char}
                    fill
                    className="object-cover"
                  />
                </div>
              </span>
            ))}
          </h1>
        </div>

        {/* ---------- BOTTOM SECTION (UNCHANGED) ---------- */}
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-1 md:gap-6 w-full">
          <div className="order-2 md:order-1 flex flex-col gap-6 items-center md:items-start w-full md:w-auto translate-x-5 md:translate-x-0">
            <div className="font-bold pl-5">
              <Image
                src='/images/footer/ragam-logo.svg'
                alt='Ragam Logo'
                width={100}
                height={100}
                className='w-24 h-24 hidden md:block'
              />
            </div>

            <div className="flex gap-6 flex-wrap justify-center md:justify-start">
              <FaInstagram className="text-xl md:text-3xl hover:text-gray-400 transition" />
              <FaFacebook className="text-xl md:text-3xl hover:text-gray-400 transition" />
              <FaLinkedinIn className="text-xl md:text-3xl hover:text-gray-400 transition" />
            </div>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-3 md:gap-x-24 gap-x-6 gap-y-3 w-full md:w-auto text-center md:text-left text-sm md:text-base md:translate-x-10 translate-x-1">
            <div className="flex flex-col gap-3 order-3 md:order-1">
              <a href="#" className="hover:text-gray-400 transition">
                Home
              </a>
              <a href='#' className='hover:text-gray-400 transition'>
                Team
              </a>
              <a href='#' className='hover:text-gray-400 transition'>
                Sponsors
              </a>
              <a href='#' className='hover:text-gray-400 transition'>
                Contact Us
              </a>
            </div>

            <div className='flex flex-col gap-3 order-2 md:order-2'>
              <a href='#' className='hover:text-gray-400 transition'>
                Ragnarok
              </a>
              <a href='#' className='hover:text-gray-400 transition'>
                Proshow
              </a>
              <a href='#' className='hover:text-gray-400 transition'>
                Prodezza
              </a>
            </div>

            <div className='flex flex-col gap-3 order-1 md:order-3'>
              <a href='#' className='hover:text-gray-400 transition'>
                Certificates
              </a>
              <a href='#' className='hover:text-gray-400 transition'>
                Events
              </a>
              <a href='#' className='hover:text-gray-400 transition'>
                Workshops
              </a>
              <a href='#' className='hover:text-gray-400 transition'>
                Sports
              </a>
            </div>
          </div>
        </div>

        <div
          onClick={() => setShowRoast(true)}
          className='mt-6 md:text-center text-[10px] text-gray-400 md:text-sm text-right cursor-pointer'
        >
          © 2026 - Ragam NITC
        </div>
      </div>

      {showRoast && (
        <div className='fixed bottom-4 right-4 bg-white text-black text-xs md:text-sm px-4 py-2 rounded-lg shadow-lg z-100 animate-fade-in'>
          stop tripping bro
        </div>
      )}
    </footer>
  );
}
