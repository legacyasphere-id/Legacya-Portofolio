import { useEffect, useState } from 'react'
import { triggerProjectScope } from '../core/identity'
import { navigate, useRoute } from '../core/router'
import { useT } from '../i18n/context'
import { asset } from '../utils/asset'
import { Link } from './Link'

export function SiteNav() {
  const { lang, toggleLang, t } = useT()
  const { route } = useRoute()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/#about', label: t.nav.links.about, isWork: false },
    { to: '/#services', label: t.nav.links.services, isWork: false },
    { to: '/work', label: t.nav.links.work, isWork: true },
    { to: '/#process', label: t.nav.links.process, isWork: false },
    { to: '/#ai-workflow', label: t.nav.links.aiWorkflow, isWork: false },
  ]

  const toggleAriaLabel = t.nav.switchLangAria

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
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-4 px-5 py-4 transition-all duration-300 md:px-10 ${
          scrolled
            ? 'border-b border-border bg-bg/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-bg/50 backdrop-blur-sm'
        }`}
      >
        {/* Zone 1: Legacya Sphere emblem + wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            if (route !== '/') {
              e.preventDefault()
              navigate('/#top')
            }
          }}
          className="flex min-h-[44px] items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface shadow-xs">
            <img
              src={asset('logo.png')}
              alt={t.nav.emblemAlt}
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

        {/* Zone 2: Primary navigation links */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label={t.nav.primaryAria}>
          {links.map((l) => {
            const isCurrent = l.isWork && route === '/work'
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isCurrent ? 'page' : undefined}
                className={`nav-link whitespace-nowrap shrink-0 ${
                  isCurrent ? 'font-medium text-blue-deep' : ''
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Zone 3: Language toggle + primary action / mobile menu trigger */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={toggleAriaLabel}
            aria-pressed={lang === 'id'}
            className="inline-flex min-h-[44px] w-[78px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface/90 px-2.5 font-mono text-[12px] tracking-tight transition-colors hover:border-blue-deep cursor-pointer"
          >
            <span className={lang === 'en' ? 'font-bold text-blue-deep' : ' font-normal text-muted'}>
              EN
            </span>
            <span className="text-border select-none" aria-hidden="true">
              |
            </span>
            <span className={lang === 'id' ? 'font-bold text-blue-deep' : 'font-normal text-muted'}>
              ID
            </span>
          </button>

          <div className="hidden shrink-0 lg:block">
            <button
              type="button"
              onClick={() => triggerProjectScope({})}
              className="btn-primary whitespace-nowrap shrink-0"
            >
              {t.nav.cta}
            </button>
          </div>

          <button
            type="button"
            className={`burger z-[101] flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 p-2 lg:hidden ${open ? 'open' : ''}`}
            aria-label={t.nav.toggleMenuAria}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav
        className={`nav-overlay lg:hidden ${open ? 'open' : ''}`}
        aria-label={t.nav.mobileAria}
        aria-hidden={!open}
      >
        {links.map((l) => {
          const isCurrent = l.isWork && route === '/work'
          return (
            <Link
              key={l.to}
              to={l.to}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          )
        })}
        <button
          type="button"
          onClick={toggleLang}
          aria-label={toggleAriaLabel}
          aria-pressed={lang === 'id'}
          className="mt-2 inline-flex min-h-[44px] w-[96px] items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 font-mono text-[13px] tracking-tight cursor-pointer"
        >
          <span className={lang === 'en' ? 'font-bold text-blue-deep' : 'font-normal text-muted'}>
            EN
          </span>
          <span className="text-border select-none" aria-hidden="true">
            |
          </span>
          <span className={lang === 'id' ? 'font-bold text-blue-deep' : 'font-normal text-muted'}>
            ID
          </span>
        </button>
        <Link
          to="/#contact"
          onClick={() => setOpen(false)}
          className="nav-cta mt-3 rounded-[10px] bg-blue-deep px-6 py-3 text-[15px] font-medium text-white whitespace-nowrap"
        >
          {t.nav.cta}
        </Link>
      </nav>
    </>
  )
}
