import { useEffect, useState } from 'react'
import { useT } from '../i18n/context'

const SECTION_IDS = [
  'hero',
  'about',
  'services',
  'work',
  'creative-work',
  'process',
  'ai-workflow',
  'why-legacya',
  'contact',
] as const

export function SectionGuide() {
  const { t } = useT()
  const [active, setActive] = useState<string>('hero')

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
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
      aria-label={t.sectionGuide.ariaLabel}
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {SECTION_IDS.map((id) => {
        const isActive = active === id
        const label = t.sectionGuide.sections[id]
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-end gap-2.5"
          >
            <span
              className="pointer-events-none rounded-md border border-border/70 bg-surface/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue-deep opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap"
            >
              {label}
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
