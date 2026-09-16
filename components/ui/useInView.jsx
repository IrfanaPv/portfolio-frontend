'use client'
import { useEffect, useRef, useState } from 'react'

export function useInView({ threshold = 0.25, repeat = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (!repeat) observer.unobserve(el)
        } else if (repeat) {
          setInView(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, repeat])

  return [ref, inView]
}