'use client'
import { useInView } from "../ui/useInView"

export default function Education({ education = [], certifications = [], languages = '' }) {
  const [ref, inView] = useInView({ threshold: 0.15, repeat: true })
  const play = inView ? 'in-view' : ''

  const languageList = languages
    ? languages.split(',').map((l) => l.trim()).filter(Boolean)
    : []

  return (
    <section id="education"
      ref={ref}
      className="w-full relative py-20 xs:py-24 sm:py-32 px-4 xs:px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        <p
          className={`entrance ${play} entrance-1 text-white/40`}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.5vw, 0.875rem)', letterSpacing: '0.05em' }}
        >
          Education
        </p>
        <h2
          className={`entrance ${play} entrance-2 font-bold text-white mt-3 leading-[1.05] tracking-tight max-w-2xl`}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
        >
          Learning, credentials, and language.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 xs:gap-10 lg:gap-16 mt-12 sm:mt-16">
          {/* Education timeline */}
          <div className={`entrance ${play} entrance-3 relative`}>
            <div className="absolute left-[6px] xs:left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#5eead4]/40 via-white/10 to-transparent" />
            <div className="flex flex-col gap-5 xs:gap-6 sm:gap-8">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 xs:pl-8">
                  <span className="timeline-node absolute left-0 top-1.5 w-3 h-3 xs:w-3.5 xs:h-3.5 rounded-full bg-[#5eead4] border-2 border-black" />
                  <div className="timeline-card group relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 xs:p-5 overflow-hidden">
                    <div className="timeline-card-glow" aria-hidden="true" />
                    <div className="relative flex flex-col xs:flex-row xs:items-baseline xs:justify-between gap-1">
                      <h3
                        className="text-white font-semibold"
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)' }}
                      >
                        {edu.degree}
                      </h3>
                      <span
                        className="text-white/35 shrink-0"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.3vw, 0.75rem)' }}
                      >
                        {edu.period}
                      </span>
                    </div>
                    <p
                      className="relative text-[#7ef0e3] mt-1"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.4vw, 0.8125rem)' }}
                    >
                      {edu.org}
                    </p>
                    <p
                      className="relative text-white/45 mt-2"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.4vw, 0.8125rem)' }}
                    >
                      {edu.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications + Languages */}
          <div className="flex flex-col gap-8 xs:gap-10">
            <div className={`entrance ${play} entrance-4`}>
              <h3
                className="text-white/70 mb-4"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', letterSpacing: '0.03em' }}
              >
                Certifications &amp; Training
              </h3>
              <div className="flex flex-col gap-3">
                {certifications.map((cert) => (
  <div
    key={cert.id}
    className="cert-card relative rounded-2xl border border-[#5eead4]/20 bg-white/[0.02] pl-4 xs:pl-5 pr-4 xs:pr-5 py-3.5 xs:py-4 overflow-hidden"
  >
    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#5eead4] to-[#a7f3d0]" aria-hidden="true" />
    <p
      className="text-white/90"
      style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}
    >
      {cert.title}
    </p>
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-1.5">
      <span
        className="text-[#7ef0e3]"
        style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.3vw, 0.8125rem)' }}
      >
        {cert.org}
      </span>
      {cert.period && (
        <span
          className="text-white/35"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.2vw, 0.75rem)' }}
        >
          · {cert.period}
        </span>
      )}
    </div>
  </div>
))}
              </div>
            </div>

            {languageList.length > 0 && (
              <div className={`entrance ${play} entrance-5`}>
                <h3
                  className="text-white/70 mb-4"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', letterSpacing: '0.03em' }}
                >
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languageList.map((lang) => (
                    <span
                      key={lang}
                      className="px-3.5 py-2 rounded-full text-white/85 border border-white/10 bg-white/[0.02]"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}