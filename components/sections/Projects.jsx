'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useInView } from '../ui/useInView'



export default function Projects( {data =[]}) {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, repeat: true })
  const play = headerInView ? 'in-view' : ''

  const cardRefs = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      cardRefs.current.forEach((card, i) => {
        const next = cardRefs.current[i + 1]
        if (!card) return
        if (!next) {
          card.style.transform = 'none'
          card.style.filter = 'none'
          return
        }
        const nextRect = next.getBoundingClientRect()
        const progress = Math.min(1, Math.max(0, (vh - nextRect.top) / vh))
        card.style.transform = `scale(${1 - progress * 0.08})`
        card.style.filter = `brightness(${1 - progress * 0.5})`
      })
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section id="projects" className="w-full relative py-20 xs:py-24 sm:py-32">
      <div ref={headerRef} className="max-w-5xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-16">
        <p
          className={`entrance ${play} entrance-1 text-white/40`}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.5vw, 0.875rem)', letterSpacing: '0.05em' }}
        >
          Projects
        </p>
        <h2
          className={`entrance ${play} entrance-2 font-bold text-white mt-3 leading-[1.05] tracking-tight max-w-2xl`}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
        >
          Things I&apos;ve built end to end.
        </h2>
        <p
          className={`entrance ${play} entrance-3 text-white/35 mt-3`}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
        >
          Scroll to move through each build.
        </p>
      </div>

      <div className="relative mt-4 sm:mt-6">
        {data.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => (cardRefs.current[i] = el)}
            className="stack-card h-[100svh] w-full flex items-center justify-center px-4 xs:px-6 sm:px-10 lg:px-16"
            style={{ zIndex: i + 1 }}
          >
            <div className="project-frame max-w-5xl w-full rounded-3xl bg-black/95 overflow-hidden grid grid-cols-1 lg:grid-cols-2 h-[85vh] lg:h-[70vh] ">
              {/* <div className="relative h-full min-h-[220px]"> */}
              <div className="relative h-full min-h-[220px] lg:min-w-[380px] ">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6) 100%)' }}
                />
              </div>

              <div className="p-6 xs:p-7 sm:p-9 flex flex-col justify-center overflow-y-auto h-full scrollbar-hidden">
                <h3
                  className="text-white font-semibold"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
                >
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-[#7ef0e3] border border-[#5eead4]/25 bg-[#5eead4]/[0.05]"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.3vw, 0.75rem)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="flex flex-col gap-2 mt-5">
                  {project.points.map((point) => (
                    <li
                      key={point}
                      className="text-white/55 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-white/25"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)' }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-7 px-5 py-2.5 rounded-full border border-[#5eead4]/30 text-white w-fit transition-colors duration-200 hover:border-[#5eead4]/60 hover:bg-[#5eead4]/[0.08]"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.6 4.6 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.6 4.6 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
                  </svg>
                  View code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}