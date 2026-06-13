import { identity } from '../core/identity'

const COLUMNS = [
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '#process' },
      { label: 'Systems', href: '#systems' },
      { label: 'Case Studies', href: '#work' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { label: 'Business Systems', href: '#systems' },
      { label: 'Dashboards', href: '#systems' },
      { label: 'Automation', href: '#systems' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-5 pb-8 pt-20 md:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-[13px] font-semibold tracking-tight text-blue-deep">
                LS
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-text">
                Legacya Sphere
              </span>
            </a>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-muted">
              {identity.brandStatement}
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4">{col.title}</p>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-blue-deep"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          {/* Connect */}
          <div>
            <p className="eyebrow mb-4">Connect</p>
            <a
              href={`mailto:${identity.social.email}`}
              className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-blue-deep"
            >
              Email
            </a>
            <a
              href={identity.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-blue-deep"
            >
              LinkedIn
            </a>
            <a
              href={identity.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-blue-deep"
            >
              GitHub
            </a>
          </div>
        </div>

        <p className="wordmark mt-20" aria-hidden="true">
          Legacya Sphere
        </p>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[13px] font-medium text-text">
            Legacya Sphere — AI-Native Business Systems Studio
          </p>
          <p className="text-[12px] text-muted">
            © {new Date().getFullYear()} · Helping companies transform manual
            operations into scalable business systems.
          </p>
        </div>
      </div>
    </footer>
  )
}
