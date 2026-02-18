'use client'

import { useState, useEffect } from 'react'
import { FaInstagram, FaFacebook, FaLinkedinIn } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

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
    <footer className="bg-black text-white relative inset-x-0 w-full overflow-x-clip z-0">
      <div className="relative max-w-7xl w-full mx-auto box-border md:mt-2 mt-20 pt-5 pb-5">

        {/* ---------- HUGE RAGAM TEXT ---------- */}
        <div className="relative w-full h-[clamp(220px,32vw,420px)] flex items-center justify-center overflow-visible">
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(5rem,18vw,16rem)] md:font-bold font-extrabold leading-none inline-flex max-w-full justify-center md:scale-y-100 scale-y-130  origin-center select-none">

            {letters.map((letter) => (
              <span
                key={letter.id}
                className="cursor-pointer relative"

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
                    z-[100]
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
                    width: "0.8em",
                    height: "0.5em",
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
          <div className="order-2 md:order-1 flex flex-col gap-6 items-center md:items-start w-full md:w-auto pl-6">
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
              <a href="https://www.instagram.com/ragam_nitc/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-xl md:text-3xl hover:text-gray-400 transition" />
              </a>
              <a href="https://www.facebook.com/Ragam.nitc" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-xl md:text-3xl hover:text-gray-400 transition" />
              </a>
              <a href="https://in.linkedin.com/company/ragam-national-institute-of-technology-calicut" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-xl md:text-3xl hover:text-gray-400 transition" />
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-3 z-20 lg:gap-x-24 md:gap-x-12 gap-y-3 w-full md:w-auto text-center md:text-left text-sm md:text-base pr-5">
            <div className="flex flex-col gap-3 order-3 md:order-1">
              <Link href="/" className="hover:text-gray-400 transition">
                Home
              </Link>
              <Link href="/notFound" className="hover:text-gray-400 transition">
                Team
              </Link>
              <Link href="/notFound" className="hover:text-gray-400 transition">
                Sponsors
              </Link>
              <Link href="/notFound" className="hover:text-gray-400 transition">
                Contact Us
              </Link>
            </div>

            <div className='flex flex-col gap-3 order-2 md:order-2'>
              <Link href="/notFound" className='hover:text-gray-400 transition'>
                Ragnarok
              </Link>
              <Link href="/notFound" className='hover:text-gray-400 transition'>
                Proshow
              </Link>
              <Link href="/notFound" className='hover:text-gray-400 transition'>
                Prodezza
              </Link>
            </div>

            <div className='flex flex-col gap-3 order-1 md:order-3'>
              <Link href="/notFound" className='hover:text-gray-400 transition'>
                Certificates
              </Link>
              <Link href="/events" className='hover:text-gray-400 transition'>
                Events
              </Link>
              <Link href="/workshops" className='hover:text-gray-400 transition'>
                Workshops
              </Link>
              <Link href="/notFound" className='hover:text-gray-400 transition'>
                Sports
              </Link>
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
