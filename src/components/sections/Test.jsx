'use client'

import { useEffect, useRef } from 'react'

export default function Test({ texts = [], morphTime = 1, cooldownTime = 2 }) {
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!texts || texts.length < 2) return

    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime

    function setMorph(fraction) {
      const t1 = text1Ref.current
      const t2 = text2Ref.current
      if (!t1 || !t2) return

      // Avoid division by zero
      const safeFraction = Math.max(Math.min(fraction, 1), 0)

      t2.style.filter = `blur(${safeFraction === 0 ? 100 : Math.min(8 / safeFraction - 8, 100)}px)`
      t2.style.opacity = Math.pow(safeFraction, 0.4)

      t1.style.filter = `blur(${safeFraction === 1 ? 100 : Math.min(8 / (1 - safeFraction) - 8, 100)}px)`
      t1.style.opacity = Math.pow(1 - safeFraction, 0.4)

      t1.textContent = texts[textIndex % texts.length]
      t2.textContent = texts[(textIndex + 1) % texts.length]
    }

    function animate() {
      animationRef.current = requestAnimationFrame(animate)

      const newTime = new Date()
      const dt = (newTime - time) / 1000
      time = newTime

      cooldown -= dt

      if (cooldown <= 0) {
        morph += dt
        let fraction = morph / morphTime

        if (fraction >= 1) {
          cooldown = cooldownTime
          fraction = 1
          textIndex++
          morph = 0
        }
        setMorph(fraction)
      } else {
        setMorph(0)
      }
    }

    animate()

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

      <svg style={{ position: 'absolute w-200 h-200', width: 0, height: 0 }}>
        <filter id='threshold'>
          <feColorMatrix
            in='SourceGraphic'
            type='matrix'
            values='1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140'
          />
        </filter>
      </svg>
    </>
  )
}
