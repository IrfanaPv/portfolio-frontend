'use client'
import { useEffect, useRef, useState } from 'react'

const RADIUS = 16
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function Footer() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
      setProgress(pct)
      setVisible(scrollTop > 400)
      rafRef.current = null
    }
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <footer className="w-full border-t border-white/10 px-4 xs:px-6 sm:px-10 lg:px-16 py-6 sm:py-8 relative">
      <div className="max-w-6xl mx-auto flex flex-col xs:flex-row items-center justify-between gap-3">
        <p
          className="text-white/35 text-center xs:text-left"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.3vw, 0.75rem)' }}
        >
          © {new Date().getFullYear()} Irfana PV. 
        </p>
        
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`scroll-top-btn fixed bottom-5 right-4 xs:bottom-6 xs:right-6 z-40 w-11 h-11 xs:w-12 xs:h-12 rounded-full border border-white/15 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" className="absolute inset-0">
          <circle cx="18" cy="18" r={RADIUS} fill="none" strokeWidth="2" className="scroll-ring-track" />
          <circle
            cx="18"
            cy="18"
            r={RADIUS}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            className="scroll-ring-fill"
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>
        <span className="text-white/70 text-sm relative">↑</span>
      </button>
    </footer>
  )
}