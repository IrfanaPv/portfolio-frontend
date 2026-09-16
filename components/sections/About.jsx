'use client'
import Image from 'next/image'
import { useInView } from '../ui/useInView'

export default function About({ data }) {
  const [ref, inView] = useInView({ threshold: 0.25, repeat: true })
  const play = inView ? 'in-view' : ''

  // No content duplicated here — if Strapi returns nothing, don't render
  // broken/partial UI. Better to surface the gap than mask it with stale text.
  if (!data) return null

  const FACTS = [
    { label: 'Based in', value: data.basedIn },
    { label: 'Focus', value: data.focus },
    { label: 'Education', value: data.education },
    { label: 'Languages', value: data.languages },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="w-full relative py-24 sm:py-32 px-5 xs:px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] gap-14 lg:gap-20 items-center">
        <div className={`entrance ${play} entrance-1 relative mx-auto lg:mx-0 w-56 h-56 sm:w-72 sm:h-72`}>
          <div className="photo-ring" aria-hidden="true" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">
            {data.photo && (
              <Image
                src={data.photo}
                alt="Irfana PV"
                fill
                sizes="(max-width: 640px) 224px, 288px"
                className="object-cover"
                priority={false}
              />
            )}
          </div>
        </div>

        <div>
          <p
            className={`entrance ${play} entrance-1 text-white/40 text-xs sm:text-sm tracking-wide`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            About
          </p>
          <h2
            className={`entrance ${play} entrance-2 font-bold text-white mt-3 leading-[1.05] tracking-tight`}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {data.headline}
          </h2>
          <p
          className={`entrance ${play} entrance-3 text-white/55 mt-6 max-w-2xl leading-relaxed`}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)' }}
          >
            {data.bio}
          </p>
<div className={`entrance ${play} entrance-4 grid grid-cols-2 gap-x-8 gap-y-5 mt-10 max-w-2xl`}>
            {FACTS.map((f) => (
              <div key={f.label}>
                <p className="text-white/35 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                  {f.label}
                </p>
                <p className="text-white/85 text-sm mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                  {f.value}
                </p>
              </div>
            ))}
          </div>

          <div className={`entrance ${play} entrance-5 mt-10`}>
            <a
              href="/CV_IRFANA.pdf"
              download
              className="inline-block px-6 py-2.5 border border-white/20 rounded-full text-sm text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}