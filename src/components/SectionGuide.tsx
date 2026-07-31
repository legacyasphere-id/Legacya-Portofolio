import { useEffect, useState } from 'react'

/**
 * Section guide, a quiet right-edge wayfinder so visitors always know which
 * section they're in on this long single page. Dots track scroll position;
 * the active section's name shows in a light frosted chip, and any dot is
 * click-to-jump. Desktop only, on mobile the page just reads top to bottom.
 */
const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'systems', label: 'Systems' },
  { id: 'work', label: 'Case Studies' },
  { id: 'proof', label: 'Proof' },
  { id: 'process', label: 'Process' },
  { id: 'founder', label: 'Founder' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
]

export function SectionGuide() {
  const [active, setActive] = useState<string>('hero')

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // A band around the upper-middle of the viewport decides "current".
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Section guide"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-end gap-2.5"
          >
            <span
              className={`rounded-full border border-border/70 bg-surface/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur transition-all duration-300 ${
                isActive
                  ? 'text-blue-deep opacity-100'
                  : 'text-muted opacity-0 group-hover:opacity-100'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-2 w-2 shrink-0 rounded-full ring-1 ring-inset transition-all duration-300 ${
                isActive
                  ? 'scale-110 bg-blue-deep ring-blue-deep'
                  : 'bg-surface/70 ring-dim/60 group-hover:ring-blue-deep'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}
