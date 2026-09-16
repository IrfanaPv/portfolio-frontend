'use client'
import { useInView } from "../ui/useInView"



export default function Experience( {data = []}) {
  const [ref, inView] = useInView({ threshold: 0.1, repeat: true })
  const play = inView ? 'in-view' : ''

  return (
    <section id="experience"
      ref={ref}
      className="w-full relative py-20 xs:py-24 sm:py-32 px-4 xs:px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-3xl mx-auto">
        <p
          className={`entrance ${play} entrance-1 text-white/40`}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.5vw, 0.875rem)', letterSpacing: '0.05em' }}
        >
          Experience
        </p>
        <h2
          className={`entrance ${play} entrance-2 font-bold text-white mt-3 leading-[1.05] tracking-tight max-w-2xl`}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          }}
        >
          Where I&apos;ve worked and built.
        </h2>

        <div className="relative mt-12 sm:mt-16">
          <div className="absolute left-[6px] xs:left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#5eead4]/40 via-white/10 to-transparent" />

          <div className="flex flex-col gap-8 sm:gap-10">
            {data.map((job, i) => (
              <div
                key={job.id }
                className={`entrance ${play} entrance-${Math.min(i + 2, 5)} relative pl-6 xs:pl-8 sm:pl-10`}
              >
                <span className="timeline-node absolute left-0 top-1.5 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-[18px] sm:h-[18px] rounded-full bg-[#5eead4] border-2 border-black" />

                <div className="timeline-card group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 overflow-hidden">
                  <div className="timeline-card-glow" aria-hidden="true" />
                  <div className="relative flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <h3
                      className="text-white font-semibold"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.2vw, 1.125rem)' }}
                    >
                      {job.role}
                    </h3>
                    <span
                      className="text-white/35 shrink-0"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.3vw, 0.75rem)' }}
                    >
                      {job.period}
                    </span>
                  </div>
                  <p
                    className="relative text-[#7ef0e3] mt-1"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}
                  >
                    {job.org}
                  </p>
                  <ul className="relative flex flex-col gap-2 mt-4">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="text-white/55 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-white/25"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}