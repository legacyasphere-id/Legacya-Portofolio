import { useEffect } from 'react'

/**
 * Reveals every element carrying a [data-animate] attribute when it enters
 * the viewport, by adding the `is-visible` class (styled in index.css as a
 * blur-to-clear + rise transition). Stagger with [data-delay="100".."500"].
 * Respects prefers-reduced-motion by showing everything immediately.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
