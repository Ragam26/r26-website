'use client'
import React, { useEffect, useState } from 'react'
import EventCard from '@/components/common/Card/EventCard'
import { useProshows } from '@/hooks/useEvents'
import EventCardLong from '@/components/common/Card/EventCardLong'

const registrationUrl = 'https://makemypass.com/event/early-bird-ragam-pass'

const PROSHOW_EVENTS = [
  {
    id: 1,
    day: '1',
    divasam: 'FRIDAY',
    date: '27',
    alignment: 'left',
    regUrl: registrationUrl,
    regFee: '1199',
    earlyBirdFee: '999',
    artists: ['AMIT MISHRA', 'W.i.S.H'],
    images: ['/images/proshow/day1/Amitbro.jpeg', '/images/proshow/day1/IWish.jpeg'],
  },
  {
    id: 2,
    day: '2',
    divasam: 'SATURDAY',
    date: '28',
    alignment: 'right',
    regUrl: registrationUrl,
    regFee: '1499',
    earlyBirdFee: '1199',
    artists: ['DARSHAN RAVAL', 'VEDAN'],
    images: ['/images/proshow/day2/Darshan.jpg', '/images/proshow/day2/Vedan2.jpeg'],
  },
  {
    id: 3,
    day: '3',
    divasam: 'SUNDAY',
    date: '29',
    alignment: 'left',
    regUrl: registrationUrl,
    regFee: '1499',
    earlyBirdFee: '1199',
    artists: ['JONITA GANDHI', 'VINEETH SREENIVASAN', 'YOGISEKAR'],
    images: ['/images/proshow/day3/Jonita.webp', '/images/proshow/day3/Vineeth.webp','/images/proshow/day3/yogi.webp'],
  }
  
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

        <div className='w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
          <div className='page pt-5 flex items-center md:justify-left justify-center gap-10 flex-wrap'>
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
