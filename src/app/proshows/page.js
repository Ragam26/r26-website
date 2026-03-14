'use client'
import React, { useEffect, useState } from 'react'
import EventCardLong from '@/components/common/Card/EventCardLong'
import ComboCards from '@/components/common/Card/ComboCards'

const registrationUrl = 'https://makemypass.com/event/ragam-pass'

const PROSHOW_EVENTS = [
  {
    id: 1,
    day: '1',
    divasam: 'FRIDAY',
    date: '27',
    alignment: 'right',
    regUrl: registrationUrl,
    regFee: '1199',
    artists: ['AMIT MISHRA', 'W.i.S.H'],
    images: ['/images/proshow/day1/Amitbro.jpeg', '/images/proshow/day1/IWish.jpeg'],
  },
  {
    id: 2,
    day: '2',
    divasam: 'SATURDAY',
    date: '28',
    alignment: 'left',
    regUrl: registrationUrl,
    regFee: '1499',
    artists: ['DARSHAN RAVAL', 'VEDAN'],
    images: ['/images/proshow/day2/Darshan.jpg', '/images/proshow/day2/Vedan2.jpeg'],
  },
  {
    id: 3,
    day: '3',
    divasam: 'SUNDAY',
    date: '29',
    alignment: 'right',
    regUrl: registrationUrl,
    regFee: '1499',
    artists: ['JONITA GANDHI', 'VINEETH SREENIVASAN', 'YOGISEKAR'],
    images: ['/images/proshow/day3/Jonita.jpeg', '/images/proshow/day3/Vineeth.webp','/images/proshow/day3/Yogi.jpeg'],
  }
]

const COMBO_EVENTS = [
    {
    id: 3,
    name: "3-Day",
    regUrl: registrationUrl,
    alignment: "left",
    regFee: "3299",
    dates: ['27', '28', '29'],
    comboDays: 3,
    images: ['/images/proshow/day1/Amitbro.jpeg', '/images/proshow/day1/IWish.jpeg','/images/proshow/day2/Darshan.jpg', '/images/proshow/day2/Vedan2.jpeg','/images/proshow/day3/Jonita.jpeg', '/images/proshow/day3/Vineeth.webp','/images/proshow/day3/Yogi.jpeg']
  },
  {
    id: 2,
    name: "Day 2 + Day 3",
    regUrl: registrationUrl,
    alignment: "right",
    regFee: "2499",
    dates: ['28', '29'],
    comboDays: 2,
    images: ['/images/proshow/day2/Darshan.jpg', '/images/proshow/day2/Vedan2.jpeg','/images/proshow/day3/Jonita.jpeg', '/images/proshow/day3/Vineeth.webp','/images/proshow/day3/Yogi.jpeg']
  },
  {
    id: 1,
    name: "Day 1 + Day 2",
    regUrl: registrationUrl,
    alignment: "left",
    regFee: "2299",
    dates: ['27', '28'],
    comboDays: 2,
    images: ['/images/proshow/day1/Amitbro.jpeg', '/images/proshow/day1/IWish.jpeg','/images/proshow/day2/Darshan.jpg', '/images/proshow/day2/Vedan2.jpeg']
  },
]

const TICKER_ITEMS = [
  '🎟 GROUP OFFER',
  'Buy 10 Tickets, get 1 Ticket FREE',
  '✦',
  '🎟 GROUP OFFER',
  'Only applicable for Single Day Tickets',
  '✦',
  '🎟',
  'Extra Ticket will be provided during conversion to physical ticket',
  '✦',
  
]
 

export default function EventsPage() {

  return (
    <main
      className='min-h-screen bg-black bg-top bg-no-repeat bg-fixed'
      style={{
        backgroundImage: "url('/images/proshow/proshows_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <div className='pt-20 md:pt-32 pb-12 md:pb-16 flex flex-col items-center justify-center px-4'>
        <h1 className='text-white text-4xl md:text-7xl lg:text-8xl font-serif tracking-[0.3em] mt-20 mb-8 md:mb-6'>
          PROSHOWS
        </h1>
      </div>
              {/* Marquee Ticker */}
      <div className='w-full overflow-hidden border-y border-[#7d1912] bg-[#fdebc8] py-3 mb-10'>
        <style>{`
          @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker 22s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className='ticker-track'>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={idx}
              className='px-6 text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#7d1912] font-serif whitespace-nowrap'
            >
              {item}
            </span>
          ))}
        </div>
      </div>
        <div className='w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pb-10'>
          <div className='page pt-5 flex items-center md:justify-left justify-center gap-15 flex-wrap'>
            {COMBO_EVENTS.map((event) => (
              <ComboCards
                key={event.id}
                name={event.name}
                images={event.images}
                eventImage={event.eventImage}
                dates={event.dates}
                regUrl={event.regUrl}
                regFee={event.regFee}
                earlyBirdFee={event.earlyBirdFee}
                alignment={event.alignment}
                comboDays={event.comboDays}
              />
            ))}
          </div>

          {COMBO_EVENTS.length === 0 && (
            <p className='text-center text-gray-500 py-20 text-xl font-light tracking-widest'>
              NO EVENTS FOUND
            </p>
            )}
        </div>
        <div className='w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
          <div className='page pt-5 flex items-center md:justify-left justify-center gap-15 flex-wrap'>
            {PROSHOW_EVENTS.map((event) => (
              <EventCardLong
                key={event.id}
                day={event.day}
                divasam={event.divasam}
                date={event.date}
                alignment={event.alignment}
                regUrl={event.regUrl}
                regFee={event.regFee}
                earlyBirdFee={event.earlyBirdFee}
                artists={event.artists}
                images={event.images}
              />
            ))}
          </div>

          {PROSHOW_EVENTS.length === 0 && (
            <p className='text-center text-gray-500 py-20 text-xl font-light tracking-widest'>
              NO EVENTS FOUND
            </p>
            )}
      </div>
      
    </main>
  )
}
