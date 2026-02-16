'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { brixton } from '@/lib/fonts'
import Image from 'next/image'

const mtxValues = [
  '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -120',
  '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 190 -140',
]

gsap.registerPlugin(ScrollTrigger)

function Test({ texts = [], morphTime = 1, cooldownTime = 2 }) {
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!texts || texts.length < 2) return

    let textIndex = 0
    let morph = 0
    let cooldown = 0
    let lastTime = performance.now()

    function setMorph(fraction) {
      const t1 = text1Ref.current
      const t2 = text2Ref.current
      if (!t1 || !t2) return

      fraction = Math.max(0, Math.min(fraction, 1))

      // Use transform instead of filter for better performance
      const blur2 = fraction === 0 ? 100 : Math.min(8 / fraction - 8, 100)
      const blur1 = fraction === 1 ? 100 : Math.min(8 / (1 - fraction) - 8, 100)

      // Batch DOM updates
      const opacity2 = Math.pow(fraction, 0.4)
      const opacity1 = Math.pow(1 - fraction, 0.4)

      t2.style.cssText = `filter: blur(${blur2}px); opacity: ${opacity2}; grid-area: 1/1; position: relative; display: inline-block;`
      t1.style.cssText = `filter: blur(${blur1}px); opacity: ${opacity1}; grid-area: 1/1; position: relative; display: inline-block;`

      // Update text content
      t1.textContent = texts[textIndex % texts.length]
      t2.textContent = texts[(textIndex + 1) % texts.length]
    }

    function animate(now) {
      animationRef.current = requestAnimationFrame(animate)
      const dt = (now - lastTime) / 1000
      lastTime = now

      if (cooldown > 0) {
        cooldown -= dt
        setMorph(1)
        if (cooldown <= 0) {
          textIndex = (textIndex + 1) % texts.length
          morph = 0
        }
        return
      }

      morph += dt
      let fraction = morph / morphTime
      fraction = Math.min(fraction, 1)
      setMorph(fraction)

      if (fraction >= 1) {
        cooldown = cooldownTime
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationRef.current)
  }, [texts, morphTime, cooldownTime])

  return (
    <>
      <div
        style={{
          filter: 'url(#threshold)',
          display: 'grid',
          placeItems: 'center',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          color: 'inherit',
          willChange: 'filter',
        }}
      >
        <span
          ref={text1Ref}
          style={{
            gridArea: '1/1',
            position: 'relative',
            display: 'inline-block',
          }}
        />
        <span
          ref={text2Ref}
          style={{
            gridArea: '1/1',
            position: 'relative',
            display: 'inline-block',
          }}
        />
      </div>

      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <filter id='threshold'>
          <feColorMatrix
            in='SourceGraphic'
            type='matrix'
            values={mtxValues[1]}
          />
        </filter>
      </svg>
    </>
  )
}

function RadialDots({ count = 0.7, maxDistance = 5100 }) {
  const containerRef = useRef(null)
  const dotsRef = useRef([]) // stores active dots

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const presets = [
      'absolute w-[2px] h-[2px] bg-yellow-200 rounded-full',
      'absolute w-[2px] h-[2px] bg-yellow-300 rounded-full',
      'absolute w-[1px] h-[1px] bg-yellow-400 rounded-full',
      'absolute w-1 h-1 bg-orange-300 rounded-full',
    ]

    const DOT_LIFETIME = 6000

    function createDot() {
      const dot = document.createElement('span')
      dot.className = presets[Math.floor(Math.random() * presets.length)]

      const angle = Math.random() * 2 * Math.PI
      const duration = 10 + Math.random() * 0.5

      dot.style.left = `${centerX}px`
      dot.style.top = `${centerY}px`
      dot.style.transform = 'translate(-50%, -50%)'
      dot.style.opacity = '1'

      container.appendChild(dot)

      const createdAt = performance.now()

      // Push into registry
      dotsRef.current.push({ element: dot, createdAt })

      function animate(time) {
        const t = (time - createdAt) / (duration * 1000)

        if (t < 1) {
          const x = Math.cos(angle) * maxDistance * t
          const y = Math.sin(angle) * maxDistance * t

          dot.style.transform = `translate(${x}px, ${y}px)`
          dot.style.opacity = `${1 - t}`

          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    // Emit dots
    const interval = setInterval(() => {
      for (let i = 0; i < count; i++) createDot()
    }, 100)

    // Cleanup old dots periodically
    const cleanupInterval = setInterval(() => {
      const now = performance.now()

      dotsRef.current = dotsRef.current.filter(({ element, createdAt }) => {
        if (now - createdAt > DOT_LIFETIME) {
          if (element.parentNode === container) {
            container.removeChild(element)
          }
          return false
        }
        return true
      })
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(cleanupInterval)

      // Remove all remaining dots
      dotsRef.current.forEach(({ element }) => {
        if (element.parentNode === container) {
          container.removeChild(element)
        }
      })

      dotsRef.current = []
    }
  }, [count, maxDistance])

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 pointer-events-none z-5'
      style={{ overflow: 'visible' }}
    />
  )
}

export default function Legacy() {
  const [swap, setSwap] = useState(false)

  const mobileRef = useRef(null)
  const desktopRef = useRef(null)
  const sectionRef = useRef(null)
  const linkRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setSwap((prev) => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!linkRef.current || !sectionRef.current) return

    gsap.from(linkRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: linkRef.current,
        start: 'bottom 110%',
        toggleActions: 'play none none none',
        once: true,
      },
    })
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(max-width: 400px)', () => {
      const ctx = gsap.context(() => {
        const el = mobileRef.current
        if (!el) return
        gsap.fromTo(
          el,
          { y: 100, scale: 1.2 },
          {
            y: 0,
            scale: 1.8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: '+=120%',
              scrub: 1, // Add smoothing
            },
          },
        )
      }, sectionRef.current)
      return () => ctx.revert()
    })

    mm.add('(min-width: 401px) and (max-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const el = mobileRef.current
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
              scrub: 1, // Add smoothing
            },
          },
        )
      }, sectionRef.current)
      return () => ctx.revert()
    })

    mm.add('(min-width: 769px)', () => {
      const ctx = gsap.context(() => {
        const targets = [desktopRef.current]
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
      className={`relative ${brixton.className} h-[65vh] sm:min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden`}
      style={{
        backgroundImage: `
          radial-gradient(
            ellipse at center,
            rgba(0,0,0,0) 25%,
            rgba(0,0,0,0.8) 50%,
            rgba(0,0,0,0.9) 100%
          ),
          url('/images/legacy/fire-background.png')
        `,
        willChange: 'transform',
      }}
    >
      <div className='absolute inset-0 z-10 flex items-end justify-center overflow-hidden pointer-events-none'>
        <Image
          src='/images/legacy/fire.svg'
          alt='fire'
          className='hidden lg:block absolute bottom-0 rounded-full scale-100 bg-transparent w-auto translate-x-60'
          width={800}
          height={800}
          priority
          loading='eager'
        />
        <Image
          alt='fire'
          src='/images/legacy/fire2.svg'
          className='block lg:hidden object-cover absolute bottom-0 rounded-full opacity-85 scale-30 sm:scale-40 md:scale-50 w-auto'
          height={600}
          width={600}
          priority
          loading='eager'
        />
      </div>

      <div className='absolute bottom-0 right-[40%]'>
        <RadialDots />
      </div>
      <div className='absolute bottom-[20%] right-[40%]'>
        <RadialDots />
      </div>
      <div className='absolute bottom-[50%] right-[40%]'>
        <RadialDots />
      </div>

      <div className='relative z-20 md:py-16 mt-0 md:mt-18 lg:mt-0 sm:py-8 sm:px-2'>
        <div className='flex justify-center gap-8'>
          <div
            className='w-auto flex self-start justify-center text-white font-bold -mr-8 left-text'
            style={{ fontSize: 'max(10vw, 6rem)', willChange: 'filter' }}
          >
            <Test texts={['THE', 'STILL']} morphTime={1.5} cooldownTime={1} />
          </div>

          <div
            className='w-auto flex self-start -mt-[8%] sm:-mt-[6%] justify-center text-orange-500 font-bold right-text'
            style={{
              fontSize: 'max(24vw, 12rem)',
              willChange: 'filter',
            }}
          >
            <Test texts={['FLAME', 'BURNS']} morphTime={1.5} cooldownTime={1} />
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 400px) {
            .left-text {
              font-size: 3rem !important;
            }
            .right-text {
              font-size: 7rem !important;
            }
          }
        `}</style>
      </div>

      <div className='absolute inset-0 z-30 flex items-end justify-center overflow-hidden pointer-events-none'>
        <Image
          alt='character'
          ref={mobileRef}
          src='/images/legacy/Rajan2.svg'
          width={500}
          height={800}
          className='block lg:hidden object-cover w-auto
                     max-h-[60vh] sm:max-h-[75vh] md:max-h-[95vh]'
          priority
          loading='eager'
          style={{ willChange: 'transform' }}
        />
        <Image
          ref={desktopRef}
          alt='character'
          src='/images/legacy/Rajan.svg'
          width={800}
          height={1200}
          className='hidden lg:block h-full w-auto translate-x-60'
          priority
          loading='eager'
          style={{ willChange: 'transform' }}
        />
      </div>

      <div
        className={`${brixton.className} absolute z-40 bottom-10 left-0 right-0 text-4xl sm:text-6xl md:text-6xl lg:text-6xl text-white p-4 text-center cursor-pointer`}
        ref={linkRef}
        style={{ willChange: 'transform, opacity' }}
      >
        <a href='https://youtu.be/1GmHRscNl6I?si=hOJsFpYVWrjwvgua'>
          Learn more about the legacy
        </a>
      </div>

      {/* feather fade out */}
      <div
        className='absolute bottom-0 left-0 w-full h-32 z-50 pointer-events-none'
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  )
}
