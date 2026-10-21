import { useEffect, useState } from 'react'
import { triggerProjectScope } from '../core/identity'
import { asset } from '../utils/asset'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Digital Work' },
  { href: '#creative-work', label: 'Creative Work' },
  { href: '#process', label: 'Process' },
  { href: '#ai-workflow', label: 'AI Workflow' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-8 px-6 py-4 transition-all duration-300 md:px-10 ${
          scrolled
            ? 'border-b border-border bg-bg/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-bg/50 backdrop-blur-sm'
        }`}
      >
        {/* Zone 1: Legacya Sphere emblem + wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface shadow-xs">
            <img
              src={asset('logo.png')}
              alt="Legacya Sphere emblem"
              width={32}
              height={32}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="display text-[16px] font-semibold tracking-tight text-text">
            Legacya Sphere
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link whitespace-nowrap shrink-0"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden shrink-0 lg:block">
          <button
            type="button"
            onClick={() => triggerProjectScope({})}
            className="btn-primary whitespace-nowrap shrink-0"
          >
            Start a Project
          </button>
        </div>

        <button
          type="button"
          className={`burger z-[101] flex flex-col gap-1.5 p-2 lg:hidden ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <nav
        className={`nav-overlay lg:hidden ${open ? 'open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="nav-cta mt-4 rounded-[10px] bg-blue-deep px-6 py-3 text-[15px] font-medium text-white whitespace-nowrap"
        >
          Start a Project
        </a>
      </nav>
    </>
  )
}
