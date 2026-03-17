'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ComboCards({
  name,  
  alignment,
  eventImage,
  images,
  divasam,
  dates,        // array of dates e.g. [15, 16] for multi-day combo
  regUrl,
  regFee,
  earlyBirdFee,
  comboDays,    // number of days e.g. 2 or 3 (falls back to dates.length)
}) {
  const LETTERS_ARR = ['C', 'O', 'M', 'B', 'O']
  const reverse = alignment === 'right'

  const imageList = images && images.length > 0 ? images : (eventImage ? [eventImage] : ['/images/card/dancerBg.svg'])

  const [currentIdx, setCurrentIdx] = useState(0)

  // -- SLIDING --
  useEffect(() => {
    if (imageList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % imageList.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [imageList.length])

  const commonBorderStyle =
    "border border-[#7d1912] group-hover:border-[#fdebc8] transition-colors"

  // Build "15 + 16" or "15 + 16 + 17" dates display
  const dateDisplay = dates && dates.length > 0
    ? dates.join(' , ')
    : '27 , 28' // fallback if dates not provided

  return (
    <div className='group max-w-6xl w-[85%] mx-auto p-1.5 bg-[#fdebc8] hover:bg-[#7d1912] font-serif text-[#7d1912] hover:text-[#fdebc8] transition-colors'>
      <div
        className={`flex flex-wrap md:flex-nowrap gap-2 w-full md:min-h-[400px] ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Sidebar with COMBO letters */}
        <div className={`w-full md:w-[8%] flex flex-row md:flex-col items-center justify-between py-4 px-6 md:px-0 md:py-8 ${commonBorderStyle} order-1`}>
          <div className='flex flex-row md:flex-col items-center gap-2 md:gap-4 md:mt-4'>
            {LETTERS_ARR.map((char, idx) => (
              <span
                key={idx}
                className='text-xl md:text-3xl font-extrabold'
              >
                {char}
              </span>
            ))}
          </div>

          <div className='flex items-center justify-center md:pb-2'>
            <Link
              href={regUrl}
              target="_blank"
              className="bg-[url(/images/card/normArrow.svg)] group-hover:bg-[url(/images/card/premArrow.svg)] group-hover:rotate-12 transition-all duration-500 bg-contain bg-no-repeat bg-center w-6 md:w-10 h-6 md:h-10"
            />
          </div>
        </div>

        {/* Decorative background panel */}
        <div
          style={{ backgroundImage: "url('/images/card/normBg.svg')" }}
          className={`w-[calc(25%-0.25rem)] md:w-[10%] min-h-[250px] md:min-h-[150px] bg-cover bg-center ${commonBorderStyle} ${reverse ? 'order-3 md:order-3' : 'order-2 md:order-3'}`}
        ></div>

        {/* Sliding image panel */}
        <div
          className={`relative overflow-hidden w-[calc(75%-0.25rem)] md:w-[35%] min-h-[300px] md:min-h-[250px] bg-black ${commonBorderStyle} ${reverse ? 'order-2 md:order-2' : 'order-3 md:order-2'}`}
        >
          {imageList.map((img, idx) => (
            <Link
              key={img}
              href={regUrl}
              target="_blank"
              style={{
                backgroundImage: `url('${img}')`,
                transform: idx === currentIdx
                  ? 'translateX(0%)'
                  : idx < currentIdx
                  ? 'translateX(-100%)'
                  : 'translateX(100%)',
                transition: 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
              }}
              className="absolute inset-0 bg-cover bg-center"
            />
          ))}
        </div>

        {/* Info panel */}
        <Link
          href={regUrl}
          target="_blank"
          className={`w-full md:flex-1 p-6 md:p-8 flex flex-col justify-between ${commonBorderStyle} order-4 text-left`}
        >
          <div>
            <div className='text-3xl md:text-4xl font-light mt-0.5'>
              MARCH
            </div>
            <div className='text-xl md:text-3xl font-bold leading-none'>
              {dateDisplay}
            </div>
          </div>

          <div className='mt-8 md:mt-auto'>
            {/* COMBO PASS display */}
            <div className='mb-4'>
              <div className='text-xs md:text-sm font-bold uppercase tracking-[0.2em] opacity-60 mb-1'>
                Combo Pass
              </div>
              <h1 className='text-3xl md:text-5xl font-extrabold tracking-wide leading-none'>
                {name}
              </h1>
              <h1 className='text-3xl md:text-5xl font-extrabold tracking-wide leading-none'>
                Pass
              </h1>
            </div>

            {/* Price display */}
            <div className='flex items-center gap-3 ml-auto md:ml-0 mt-1'>
              <span className={`text-xl md:text-2xl font-extrabold ${earlyBirdFee ? 'line-through opacity-50' : 'text-2xl font-extrabold'}`}>
                ₹{regFee}
              </span>
              {earlyBirdFee && (
                <span className='text-xl md:text-2xl font-extrabold'>
                  ₹{earlyBirdFee}
                </span>
              )}
              {earlyBirdFee && (
                <span className='text-xs md:text-md font-bold uppercase tracking-widest opacity-80'>
                  (Early Bird Offer)
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}