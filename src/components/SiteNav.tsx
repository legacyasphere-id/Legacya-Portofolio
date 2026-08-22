import { useEffect, useRef, useState } from 'react'
import { asset } from '../utils/asset'

/**
 * Nav link with a soft indigo/violet glow that fades in on hover and follows
 * the cursor horizontally (Linear/Vercel-style). Position is written straight
 * to the element inside a rAF; width is never animated.
 */
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
      className="nav-glow-link relative text-[14px] text-muted"
    >
      <span ref={glowRef} className="nav-glow" aria-hidden="true" />
      {label}
    </a>
  )
}

const LINKS = [
  { href: '#process', label: 'Solutions' },
  { href: '#work', label: 'Case Studies' },
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
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-10 ${
          scrolled
            ? 'border-b border-border bg-bg/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Legacya Sphere, home">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border bg-surface">
            <img src={asset('logo.png')} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-text">
            Legacya Sphere
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((l) =>
            l.href === '#pricing' ? (
              <GlowNavLink key={l.href} href={l.href} label={l.label} />
            ) : (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary">
            Free Consultation
          </a>
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
          className="nav-cta mt-4 rounded-[10px] bg-blue-deep px-6 py-3 text-[15px] font-medium text-white"
        >
          Free Consultation
        </a>
      </nav>
    </>
  )
}
