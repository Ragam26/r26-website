'use client'
import { useEffect, useRef } from 'react'

export default function ContactInfoCard({
  isOpen,
  onClose,
  title = 'CONTACTS',
  columns = [],
}) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.dataset.scrollY = scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.dataset.scrollY || 0
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      window.scrollTo(0, parseInt(scrollY))
    }
  }, [isOpen])

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      onMouseDown={handleOverlayClick}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4'
    >
      <div
        ref={modalRef}
        className='relative w-full bg-[#1e0b0b]/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col'
        style={{ maxWidth: 'min(90vw, 720px)', maxHeight: '85vh' }}
      >
        {/* ── Header ── */}
        <div className="relative shrink-0 px-8 py-3 bg-[url('/images/infoCard/banner.svg')] bg-cover bg-center flex items-center justify-center min-h-13">
          <h2 className='text-xl sm:text-2xl font-bold text-white tracking-[0.2em] text-center uppercase pr-8'>
            {title}
          </h2>
          <button
            onClick={onClose}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform cursor-pointer'
            aria-label='Close'
          >
            <img src='/images/infoCard/X.svg' alt='Close' className='w-5 h-5' />
          </button>
        </div>
        <div className='overflow-y-auto overflow-x-hidden flex-1 p-4 sm:p-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {columns.map((col, ci) => (
              <div
                key={ci}
                className='rounded-xl border border-white/10 bg-black/30 overflow-hidden'
              >
                <div className='px-4 py-2 border-b border-white/10 bg-white/5'>
                  <h3 className='text-center text-white/60 text-xs uppercase tracking-[0.2em] font-semibold'>
                    {col.heading}
                  </h3>
                </div>
                <div className='p-3 space-y-2'>
                  {col.pocs.map((poc, pi) => (
                    <button
                      key={pi}
                      className='flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-black/40 border border-white/5 hover:border-yellow-500/40 hover:bg-black/60 transition-all duration-200 group w-full'
                    >
                      <span className='text-white text-sm font-medium tracking-wide truncate min-w-0'>
                        {poc.name}
                      </span>
                      <span className='text-yellow-400/80 text-xs font-light tracking-wider whitespace-nowrap shrink-0 group-hover:text-yellow-300 transition-colors'>
                        {poc.phone}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
