'use client'
import { useState, useEffect } from 'react'
import HeroScene from '../ui/HeroScene'
import { useTypewriter } from '../ui/useTypewriter'
import { useInView } from '../ui/useInView'

const ROLES = ['Next.js', 'Django REST', 'Full-Stack Developer']

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const typed = useTypewriter(ROLES, 70, 40, 1400)
    const [textRef, inView] = useInView({ threshold: 0.3, repeat: true })


  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
    const play = inView ? 'in-view' : ''

  return (
    <section id='home' className="min-h-[100svh] w-full relative overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <HeroScene mouse={mouse} />
      </div>

      {/* legibility scrim only — no boxed panel, no blur edge. This is what replaces the card. */}
      {/* <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, black 0%, black 20%, rgba(0,0,0,0.82) 38%, rgba(0,0,0,0.35) 60%, transparent 80%)',
        }}
      /> */}
      
<div
  className="absolute inset-0 z-[1] pointer-events-none"
  style={{
    background:
      'linear-gradient(90deg, black 0%, black 16%, rgba(0,0,0,0.78) 32%, rgba(0,0,0,0.25) 52%, transparent 68%)',
  }}
/>
      {/* extra vertical scrim so mobile (where the horizontal gradient has less room) still reads clean */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none lg:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)' }}
      />
<div ref={textRef} className="w-full px-5 xs:px-6 sm:px-15 lg:px-30 z-10">
        {/* <div className="max-w-xl lg:max-w-2xl"> */}
        <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <p
            className={`entrance ${play} entrance-1 text-white/40 text-xs sm:text-sm`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Full-stack developer, based in Kannur
          </p>
          <h1
            className={`entrance ${play} entrance-2 font-bold text-white mt-3 sm:mt-4 leading-[0.95] tracking-tight`}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
              textShadow: '0 2px 20px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.6)',
            }}
          >
            Irfana PV
          </h1>
          <h2
            className={`entrance ${play} entrance-3 font-semibold mt-2 sm:mt-3 bg-clip-text text-transparent`}
            style={{
              fontFamily: 'var(--font-display)',
              backgroundImage: 'linear-gradient(90deg, #7ef0e3, #a7f3d0)',
              fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
              minHeight: '1.3em',
            }}
          >
            {typed}
            <span className="inline-block w-[2px] h-[0.8em] bg-[#7ef0e3] ml-1 align-middle animate-pulse" />
          </h2>
          <p
            className={`entrance ${play} entrance-3 text-white/55 mt-4 sm:mt-6 max-w-md leading-relaxed`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.5vw, 0.9375rem)',
              textShadow: '0 1px 12px rgba(0,0,0,0.5)',
            }}
          >
            I build digital systems that turn complex ideas into elegant products — backend architecture with Django REST, full-stack products, and interactive web experiences.
          </p>
          <div className={`entrance ${play} entrance-4 flex flex-wrap gap-3 mt-7 sm:mt-9`}>
            <button className="px-5 sm:px-6 py-2.5 bg-[#5eead4] text-black rounded-full text-sm font-semibold transition-transform duration-200 hover:scale-[1.04] hover:bg-[#7ef0e3]">
              See selected work
            </button>
            <button className="px-5 sm:px-6 py-2.5 border border-white/20 rounded-full text-sm text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5">
              Get in touch
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex absolute bottom-8 left-6 sm:left-10 lg:left-16 z-10 items-center gap-2 text-white/30 text-xs animate-bounce">
        <span>Scroll</span>
        <span>↓</span>
      </div>
    </section>
  )
}

