/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VinylDisc from './vinylAnimation'
import KathakaliEyes from './eyesAnimation'

gsap.registerPlugin(ScrollTrigger)

function Date({ date, index, datesRef }) {
  return (
    <div
      ref={(el) => (datesRef.current[index] = el)}
      className='flex justify-between gap-1'
    >
      <span className='lowercase'>march</span>
      <span>{date}</span>
    </div>
  )
}

function Texture({ imageName, className }) {
  return (
    <>
      <img
        src={`/images/polaroid_page/${imageName}.svg`}
        alt='Background texture'
        className={className}
      />
    </>
  )
}

function Cards({ imageName }) {
  return (
    <>
      <img
        src={`/images/polaroid_page/${imageName}.svg`}
        alt={imageName}
        className='w-16 sm:min-w-17 md:min-w-20 lg:min-w-24 object-cover'
      />
    </>
  )
}

function TV() {
  return (
    <div className='relative'>
      <img
        src='/images/polaroid_page/retro_tv.svg'
        alt='retro_tv'
        className='max-w-45 sm:min-w-50 md:max-w-60 lg:min-w-80'
      />

      <div className='absolute top-[23.5%] left-[19%] w-[52%] h-[55%] rounded-2xl bg-black overflow-hidden'>
        <img
          src='/images/polaroid_page/tvVideo.gif'
          alt='Screen Animation'
          className='w-full h-full object-cover opacity-80 blur-[0.5px]'
        />

        <div className='absolute inset-0 pointer-events-none'>
          <div
            className='absolute inset-0 pointer-events-none'
            style={{
              background:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 2px, transparent 4px)',
            }}
          />

          <div
            className='absolute inset-0'
            style={{
              background:
                'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.5) 120%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function PolaroidPage() {
  // REFS
  const containerRef = useRef(null)
  const rangoliRef = useRef(null)
  const datesRef = useRef([])
  const framesRef = useRef([])

  const [selectedFrames] = useState(() => {
    const allFrames = [1, 2, 3, 4]
    const shuffled = allFrames.sort(() => 0.5 - Math.random())
    return [shuffled[0], shuffled[1]]
  })

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 30%',
          end: 'top 0%',
          scrub: true,
        },
      })

      tl.fromTo(rangoliRef.current, { x: 120 }, { x: 0, ease: 'none' })
      tl.fromTo(
        datesRef.current,
        { x: 200 },
        { x: 0, stagger: 0.1, ease: 'none' },
        '<0.1',
      )

      //  polaroid animation
      gsap.fromTo(
        framesRef.current,
        {
          y: -100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.75,
          ease: 'back.out(1.1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            toggleActions: 'play none none none', // only plays once
          },
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className='relative flex flex-col items-center justify-center h-screen overflow-hidden'
    >
      <div className='relative flex flex-col sm:flex-row items-center justify-center md:w-full h-[75%] sm:h-[60%] md:h-[70%] lg:h-[80%] border-y-3 border-[#F4EFCF] sm:px-3'>
        {/* bg textures */}
        <Texture
          imageName='upper'
          className='absolute top-0 left-0 w-full sm:w-[50%] max-w-250'
        />

        <Texture
          imageName='lower'
          className='absolute bottom-0 right-0 w-full sm:w-[50%] max-w-250'
        />

        {/* LEFT SECTION */}
        <div className='relative z-10 flex flex-col sm:w-[40%] items-center justify-center h-full sm:gap-10 py-5'>
          <div className='flex items-center justify-center h-[30%] sm:min-h-35 md:h-40 lg:h-55 w-[72%] md:w-[95%] -translate-x-4 md:translate-x-0'>
            <img
              ref={rangoliRef}
              src='/images/polaroid_page/rangoli.svg'
              alt='rangoli'
              className='h-[92%] md:h-full object-cover'
            />
            <div className='relative'>
              <KathakaliEyes />
            </div>
          </div>

          <div className='flex items-end justify-center gap-2 translate-y-10 md:translate-y-6 -translate-x-2'>
            <div className='flex items-end gap-1 text-[#b0a695] overflow-hidden'>
              <div className='flex flex-col font-[--font-slackey] text-3xl md:text-4xl lg:text-5xl uppercase leading-none tracking-wide text-[#8F7B75] gap-2'>
                <Date date={27} index={0} datesRef={datesRef} />
                <Date date={28} index={1} datesRef={datesRef} />
                <Date date={29} index={2} datesRef={datesRef} />
              </div>
            </div>
            <Cards imageName='queen' />
            <Cards imageName='king' />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className='relative z-10 flex sm:w-[40%] items-center justify-start bottom-29 sm:bottom-0 sm:ml-5'>
          <div className='flex flex-col items-center sm:-mt-18'>
            <img
              src='/images/polaroid_page/camera.svg'
              alt='camera'
              className='max-w-40 sm:min-w-35 md:max-w-45 lg:max-w-60 object-cover mt-[25%]'
            />
            <img
              ref={(el) => (framesRef.current[0] = el)}
              src={`/images/polaroid_page/polaroids/frame${selectedFrames[0]}.svg`}
              alt='frame1'
              className='max-w-30 sm:max-w-25 md:max-w-30 lg:min-w-46 object-cover -mt-[25%]'
            />
            <img
              ref={(el) => (framesRef.current[1] = el)}
              src={`/images/polaroid_page/polaroids/frame${selectedFrames[1]}.svg`}
              alt='frame2'
              className='max-w-30 sm:max-w-25 md:max-w-30 lg:min-w-45 object-cover -mt-[30%]'
            />
          </div>

          <div className='flex flex-col justify-between items-center gap-5 sm:gap-8 md:gap-6 mt-15 md:mt-10 sm:mr-10 sm:w-90'>
            <VinylDisc />
            <TV />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PolaroidPage
