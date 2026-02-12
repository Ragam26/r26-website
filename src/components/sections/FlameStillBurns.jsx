'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import localFont from 'next/font/local'
import Test from './Test'

const brixton = localFont({
  src: '../../../public/fonts/brixton-lead-vector.otf',
  display: 'swap',
})

gsap.registerPlugin(ScrollTrigger)

function RadialDots({ count = 0.5, maxDistance = 5000 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Center of container
    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const presets = [
      'absolute w-[2px] h-[2px] bg-yellow-200 rounded-full',
      'absolute w-[2px] h-[2px] bg-yellow-300 rounded-full',
      'absolute w-[1px] h-[1px] bg-yellow-400 rounded-full',
      'absolute w-1 h-1 bg-orange-300 rounded-full',
    ]

    function createDot() {
      const dot = document.createElement('span')

      // Random preset
      dot.className = presets[Math.floor(Math.random() * presets.length)]

      // Random angle
      const angle = Math.random() * 2 * Math.PI

      // Random duration
      const duration = 10 + Math.random() * 0.5

      // Start at center
      dot.style.left = `${centerX}px`
      dot.style.top = `${centerY}px`
      dot.style.transform = 'translate(-50%, -50%)' // initial transform
      dot.style.opacity = '1'

      container.appendChild(dot)

      const startTime = performance.now()
      function animate(time) {
        const t = (time - startTime) / (duration * 1000)
        if (t < 1) {
          const x = Math.cos(angle) * maxDistance * t
          const y = Math.sin(angle) * maxDistance * t
          // Keep rotation in transform
          dot.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`
          dot.style.opacity = `${1 - t}`
          requestAnimationFrame(animate)
        } else {
          dot.remove()
        }
      }

      requestAnimationFrame(animate)
    }

    const interval = setInterval(() => {
      for (let i = 0; i < count; i++) createDot()
    }, 100)

    return () => clearInterval(interval)
  }, [count, maxDistance])

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 pointer-events-none z-5'
      style={{ overflow: 'visible' }}
    ></div>
  )
}

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
              scale: 1.8,
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
      {/* 🔥 FIRE (BACK) */}
      <div className='absolute inset-0 z-10 flex items-end justify-center overflow-hidden pointer-events-none'>
        <img
          src='/images/fire.svg'
          className='hidden lg:block absolute bottom-0 rounded-full scale-100 bg-transparent w-auto translate-x-60'
        />
      </div>

      {/* Fire Grits 1*/}
      <div className='absolute bottom-0 right-[40%]'>
        <RadialDots />
      </div>
      {/* Fire Grits 2*/}
      <div className='absolute bottom-[20%] right-[40%]'>
        <RadialDots />
      </div>
      {/* Fire Grits 3*/}
      <div className='absolute bottom-[50%] right-[40%]'>
        <RadialDots />
      </div>

      {/* TEXT (MIDDLE) */}
      <div className='relative z-20 py-20 mt-32 md:mt-18 lg:mt-0 sm:py-8 sm:px-2'>
        <div className='flex justify-center gap-8'>
          <div
            className='w-auto flex self-start justify-center text-white font-bold'
            style={{
              fontSize: 'max(10vw, 6rem)',
            }}
          >
            <Test texts={['THE', 'STILL']} morphTime={1.5} cooldownTime={1} />
          </div>
          <div
            className='w-auto flex self-start justify-center text-orange-500 font-bold'
            style={{
              fontSize: 'max(24vw, 12rem)',
            }}
          >
            <Test texts={['FLAME', 'BURNS']} morphTime={1.5} cooldownTime={1} />
          </div>
        </div>
      </div>

      {/* 🧍‍♂️ RAJAN (TOP) */}
      <div className='absolute inset-0 z-30 flex items-end justify-center overflow-hidden pointer-events-none'>
        <img
          ref={mobileRef}
          src='/images/Rajan2.svg'
          className='block lg:hidden object-cover scale-180 sm:scale-100 md:scale-100 md:h-[95vh] w-auto'
        />

        <img
          ref={desktopRef}
          src='/images/Rajan.svg'
          className='hidden lg:block h-full w-auto translate-x-60'
        />
      </div>

      <div
        className={`${brixton.className} absolute z-40 bottom-10 left-0 right-0 text-lg sm:text-xl md:text-2xl lg:text-6xl text-white p-4 text-center`}
      >
        <a>CLICK TO KNOW ABOUT THE STORY</a>
      </div>
    </div>
  )
}
