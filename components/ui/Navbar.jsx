'use client'
import { useEffect, useState, useRef } from 'react'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
]

const ALL_SECTION_IDS = ['home', ...LINKS.map((l) => l.id), 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleRatios = useRef({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ALL_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0
        })
        let winner = 'home'
        let best = 0
        for (const id of ALL_SECTION_IDS) {
          const ratio = visibleRatios.current[id] || 0
          if (ratio > best) {
            best = ratio
            winner = id
          }
        }
        setActive(winner)
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-80px 0px 0px 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`nav-shell fixed top-0 left-0 right-0 z-[60] ${scrolled ? 'scrolled' : ''}`}>
        {/* 3-column grid: empty left spacer / centered nav / right-aligned CTA+burger.
            No logo element rendered at all — the left column is structural only. */}
        <div className="max-w-6xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-16 h-14 xs:h-[60px] grid grid-cols-[1fr_auto_1fr] items-center">
          <div aria-hidden="true" />

          <nav className="hidden lg:flex items-center gap-5 justify-self-center">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-link ${active === link.id ? 'active text-white' : 'text-white/55 hover:text-white/85'}`}
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3 justify-self-end">
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#5eead4] text-black font-semibold transition-transform duration-200 hover:scale-[1.04] hover:bg-[#7ef0e3]"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
            >
              Let&apos;s Connect
              <span className="text-[0.9em]">↗</span>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            >
              <span
                className="nav-burger-line block w-5 h-[1.5px] bg-white"
                style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }}
              />
              <span className="nav-burger-line block w-5 h-[1.5px] bg-white" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span
                className="nav-burger-line block w-5 h-[1.5px] bg-white"
                style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`nav-mobile-panel ${menuOpen ? 'open' : ''} lg:hidden fixed top-14 xs:top-[60px] left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10`}
      >
        <nav className="flex flex-col px-4 xs:px-6 py-4">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left py-3.5 border-b border-white/5 ${active === link.id ? 'text-[#7ef0e3]' : 'text-white/70'}`}
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('contact')}
            className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#5eead4] text-black font-semibold w-fit"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
          >
            Let&apos;s Connect <span className="text-[0.9em]">↗</span>
          </button>
        </nav>
      </div>
    </>
  )
}