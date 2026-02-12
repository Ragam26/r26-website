'use client'

import { useEffect, useRef } from 'react'

const mtxValues = [
  '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -120',
  '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 180 -140',
]

export default function Test({ texts = [], morphTime = 1, cooldownTime = 2 }) {
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

      t2.style.filter = `blur(${fraction === 0 ? 100 : Math.min(8 / fraction - 8, 100)}px)`
      t2.style.opacity = Math.pow(fraction, 0.4)

      t1.style.filter = `blur(${fraction === 1 ? 100 : Math.min(8 / (1 - fraction) - 8, 100)}px)`
      t1.style.opacity = Math.pow(1 - fraction, 0.4)

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
        // Keep t1 and t2 as is during cooldown
        setMorph(1)
        if (cooldown <= 0) {
          // Only increment after cooldown
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

      <svg style={{ width: 0, height: 0 }}>
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
