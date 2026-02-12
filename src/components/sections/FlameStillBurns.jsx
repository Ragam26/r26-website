'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FlameStillBurns() {
  const [swap, setSwap] = useState(false)

  const mobileRef = useRef(null)
  const desktopRef = useRef(null)
  const sectionRef = useRef(null)

  // Swap text every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSwap((prev) => !prev)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Parallax lift
  useEffect(() => {
    if (!sectionRef.current) return

    const mm = gsap.matchMedia()

    // Mobile
    mm.add('(max-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const targets = [mobileRef.current, desktopRef.current]

        targets.forEach((el) => {
          if (!el) return

          gsap.fromTo(
            el,
            { y: 150, scale: 0.6 },
            {
              y: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: '+=120%',
                scrub: true,
              },
            },
          )
        })
      }, sectionRef.current)

      return () => ctx.revert()
    })

    // Desktop
    mm.add('(min-width: 769px)', () => {
      const ctx = gsap.context(() => {
        const targets = [mobileRef.current, desktopRef.current]

        targets.forEach((el) => {
          if (!el) return

          gsap.fromTo(
            el,
            { y: 250, scale: 0.6 },
            {
              y: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: '+=90%',
                scrub: true,
              },
            },
          )
        })
      }, sectionRef.current)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className='relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden'
      style={{
        backgroundImage: `
          radial-gradient(
            ellipse at center,
            rgba(0,0,0,0) 25%,
            rgba(0,0,0,0.5) 60%,
            rgba(0,0,0,0.9) 100%
          ),
          url('/images/fire-background.png')
        `,
      }}
    >
      {/* TEXT */}
      <div className='py-20 mt-48 md:mt-32 lg:mt-18 sm:py-8 sm:px-2'>
        <div className='flex justify-center items-start'>
          {/* LEFT TEXT */}
          <img
            src={swap ? '/images/STILL.svg' : '/images/THE.svg'}
            alt='LEFT'
            className='
              h-[9vw] min-h-8
              sm:h-[12vw] sm:min-h-12
              md:h-[7vw] md:min-h-7
              w-auto
            '
          />

          {/* RIGHT TEXT */}
          <img
            src={swap ? '/images/BURNS.svg' : '/images/FLAME.svg'}
            alt='RIGHT'
            className='
              h-[26vw] min-h-24
              sm:h-[34vw] sm:min-h-32
              md:h-[21vw] md:min-h-21
              w-auto
              -ml-[6vw] md:-ml-[3vw]
            '
          />
        </div>
      </div>

      {/* CHARACTER */}
      <div className='absolute inset-0 z-10 flex items-end justify-center overflow-hidden pointer-events-none'>
        {/* Mobile Character */}
        <img
          ref={mobileRef}
          src='/images/Rajan2.svg'
          className='block lg:hidden object-contain scale-140 sm:scale-100 md:scale-100 md:h-[95vh] w-auto'
        />

        {/* Desktop Character */}
        <img
          ref={desktopRef}
          src='/images/Rajan.svg'
          className='hidden lg:block h-full w-auto translate-x-60'
        />
      </div>
    </div>
  )
}
