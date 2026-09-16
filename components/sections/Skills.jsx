'use client'
import { useInView } from "../ui/useInView"



export default function Skills({ data = [] }) {
  const [ref, inView] = useInView({ threshold: 0.15, repeat: true })
  const play = inView ? 'in-view' : ''

  

  return (
    <section id="skills"
      ref={ref}
      className="w-full relative py-20 xs:py-24 sm:py-32 px-4 xs:px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        <p
          className={`entrance ${play} entrance-1 text-white/40`}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.5vw, 0.875rem)', letterSpacing: '0.05em' }}
        >
          Skills
        </p>
        <h2
          className={`entrance ${play} entrance-2 font-bold text-white mt-3 leading-[1.05] tracking-tight max-w-2xl`}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          }}
        >
          The stack I build with.
        </h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14 auto-rows-fr">
          {data.map((group, i) => (
            <div
              key={group.id}
              className={`entrance ${play} entrance-${Math.min(i + 2, 5)} skill-card group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 overflow-hidden flex flex-col justify-center min-h-[140px]`}
            >
              <div className="skill-card-glow" aria-hidden="true" />
              <h3
                className="relative text-white font-semibold"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
              >
                {group.category}
              </h3>
              <div className="relative flex flex-wrap gap-2 mt-4">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-white/70 border border-white/10 bg-white/[0.03] transition-colors duration-200 group-hover:border-[#5eead4]/30 group-hover:text-white/90"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.3vw, 0.75rem)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
