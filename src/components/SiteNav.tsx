import { useEffect, useRef, useState } from 'react'
import { triggerProjectScope } from '../core/identity'

function GlowNavLink({ href, label }: { href: string; label: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)
  const raf = useRef(0)

  const handleMove = (e: React.MouseEvent) => {
    const link = linkRef.current
    const glow = glowRef.current
    if (!link || !glow) return
    const x = e.clientX
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const r = link.getBoundingClientRect()
      glow.style.transform = `translateX(${x - r.left - r.width / 2}px)`
    })
  }

  return (
    <a
      ref={linkRef}
      href={href}
      onMouseMove={handleMove}
      className="nav-glow-link relative text-[14px] text-muted whitespace-nowrap shrink-0"
    >
      <span ref={glowRef} className="nav-glow" aria-hidden="true" />
      {label}
    </a>
  )
}

const LINKS = [
  { href: '#solutions', label: 'Solutions' },
  { href: '#work', label: 'Case Studies' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
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
            ? 'border-b border-border bg-bg/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-bg/40 backdrop-blur-sm'
        }`}
      >
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="display text-[16px] font-semibold tracking-tight text-text whitespace-nowrap shrink-0"
        >
          Legacya Sphere
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((l) =>
            l.href === '#pricing' ? (
              <GlowNavLink key={l.href} href={l.href} label={l.label} />
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="nav-link whitespace-nowrap shrink-0"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden shrink-0 lg:block">
          <button
            type="button"
            onClick={() => triggerProjectScope({})}
            className="btn-primary whitespace-nowrap shrink-0"
          >
            Scope Your System
          </button>
        </div>

        <button
          type="button"
          className={`burger z-[101] flex flex-col gap-1.5 p-1.5 lg:hidden ${open ? 'open' : ''}`}
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
          Scope Your System
        </a>
      </nav>
    </>
  )
}
