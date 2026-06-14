import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#systems', label: 'Systems' },
  { href: '#process', label: 'Solutions' },
  { href: '#work', label: 'Case Studies' },
  { href: '#os-status', label: 'OS Status' },
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
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-4 transition-all duration-300 md:px-10 ${
          scrolled
            ? 'border-b border-border bg-bg/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Legacya Sphere — home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-[13px] font-semibold tracking-tight text-blue-deep">
            LS
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-text">
            Legacya Sphere
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary">
            Start a Project
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
          Start a Project
        </a>
      </nav>
    </>
  )
}
