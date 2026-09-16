'use client'
import { useState } from 'react'
import { useInView } from "../ui/useInView"
import { submitContactMessage } from '@/lib/strapi'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name'
  else if (form.name.trim().length < 2) errors.name = 'Name looks too short'

  if (!form.email.trim()) errors.email = 'Please enter your email'
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email address'

  if (!form.message.trim()) errors.message = 'Please add a message'
  else if (form.message.trim().length < 10) errors.message = 'Say a little more — a few words is enough'

  return errors
}

function Field({ id, label, type = 'text', textarea = false, value, onChange, error }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="text-left">
      <label
        htmlFor={id}
        className="block text-white/45 mb-2"
        style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.75rem, 1.3vw, 0.8125rem)' }}
      >
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={textarea ? undefined : type}
        rows={textarea ? 5 : undefined}
        placeholder={textarea ? 'Tell me a bit about the project or role…' : label}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`field-input ${textarea ? 'resize-none' : ''} ${error ? 'field-input-error' : ''}`}
        style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}
      />
      {error && (
        <p
          className="text-[#ff8a8a] mt-1.5"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem' }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact({ contact }) {
  const [ref, inView] = useInView({ threshold: 0.2, repeat: true })
  const play = inView ? 'in-view' : ''

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const foundErrors = validate(form)
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }

    setStatus('sending')
    const result = await submitContactMessage(form)
    if (result.success) {
      setStatus('sent')
    } else {
      setStatus('failed')
    }
  }

  const handleReset = () => {
    setForm({ name: '', email: '', message: '' })
    setErrors({})
    setStatus('idle')
  }

  const PLATFORMS = contact
    ? [
        contact.email && {
          label: 'Email',
          href: `mailto:${contact.email}`,
          icon: <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm2 0 7 6 7-6" />,
        },
        // contact.phone && {
        //   label: 'Phone',
        //   href: `tel:${contact.phone.replace(/\s+/g, '')}`,
        //   icon: <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.25 1L6.6 10.8Z" />,
        // },
        contact.linkedinUrl && {
          label: 'LinkedIn',
          href: contact.linkedinUrl,
          external: true,
          icon: <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" />,
        },
        contact.githubUrl && {
          label: 'GitHub',
          href: contact.githubUrl,
          external: true,
          icon: <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.6 4.6 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.6 4.6 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />,
        },
      ].filter(Boolean)
    : []

  return (
    <section id="contact"
      ref={ref}
      className="w-full relative py-20 xs:py-24 sm:py-32 px-4 xs:px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          className={`entrance ${play} entrance-1 text-white/40`}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6875rem, 1.5vw, 0.875rem)', letterSpacing: '0.05em' }}
        >
          Contact
        </p>
        <h2
          className={`entrance ${play} entrance-2 font-bold text-white mt-3 leading-[1.05] tracking-tight`}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
        >
          Let&apos;s build something together.
        </h2>
        {contact?.availabilityNote && (
          <p
            className={`entrance ${play} entrance-3 text-white/45 mt-4 max-w-lg mx-auto leading-relaxed`}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.4vw, 0.9375rem)' }}
          >
            {contact.availabilityNote}
          </p>
        )}

        {PLATFORMS.length > 0 && (
          <div className={`entrance ${play} entrance-3 flex items-center justify-center gap-3 xs:gap-4 mt-8 sm:mt-10`}>
            {PLATFORMS.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noopener noreferrer' : undefined}
                aria-label={p.label}
                className="icon-link w-12 h-12 xs:w-14 xs:h-14 rounded-full border border-white/12 text-white/60 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  {p.icon}
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* <div className={`entrance ${play} entrance-4 form-glow-frame max-w-xl mx-auto mt-10 sm:mt-14`}> */}
      <div className={`entrance ${play} form-glow-frame max-w-2xl mx-auto mt-10 sm:mt-14`}>
        <div className="rounded-[calc(1.5rem-1px)] bg-black p-6 xs:p-7 sm:p-10">
          {status === 'sent' ? (
            // Success state — replaces the form entirely, not layered on top of it
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#5eead4]/10 border border-[#5eead4]/30 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#5eead4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                className="text-white font-semibold mt-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem' }}
              >
                Message sent
              </h3>
              <p
                className="text-white/45 mt-2 max-w-sm"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}
              >
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 px-5 py-2 rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-[#5eead4]/40 hover:text-white"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="name" label="Name" value={form.name} onChange={handleChange} error={errors.name} />
                <Field id="email" label="Email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
              </div>

              <Field id="message" label="Message" textarea value={form.message} onChange={handleChange} error={errors.message} />

              {status === 'failed' && (
                <p
                  className="text-[#ff8a8a] text-center"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}
                >
                  Something went wrong sending that — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="send-btn mt-1 px-6 py-2.5 bg-[#5eead4] text-black rounded-full font-semibold w-full sm:w-fit flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="3" strokeOpacity="0.25" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="black" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}