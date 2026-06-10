import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#studio', label: 'Studio' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
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
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-5 transition-all duration-300 md:px-12 ${
          scrolled
            ? 'bg-bg/85 shadow-[0_1px_0_#E6DFD0] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <a href="#top" className="font-display text-xl text-text">
          Legacya<span className="font-soft-italic text-accent">Sphere</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.slice(0, 3).map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-border px-[18px] py-2 text-[14px] text-text transition-colors duration-300 hover:border-accent"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          className={`burger z-[101] flex flex-col gap-1.5 p-1.5 md:hidden ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <nav
        className={`nav-overlay md:hidden ${open ? 'open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  )
}
