import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Studio' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Digital Work' },
  { id: 'creative-work', label: 'Creative Work' },
  { id: 'process', label: 'Process' },
  { id: 'why-legacya', label: 'Why Legacya' },
  { id: 'contact', label: 'Inquire' },
]

export function SectionGuide() {
  const [active, setActive] = useState<string>('hero')

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
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
              className="pointer-events-none rounded-md border border-border/70 bg-surface/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue-deep opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap"
            >
              {s.label}
            </span>
            <span
              className={`h-2 w-2 shrink-0 rounded-full ring-1 ring-inset transition-all duration-200 ${
                isActive
                  ? 'scale-110 bg-blue-deep ring-blue-deep'
                  : 'bg-surface/80 ring-dim/60 group-hover:ring-blue-deep'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}
