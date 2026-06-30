import { identity } from '../core/identity'
import { asset } from '../utils/asset'

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
    <footer className="relative overflow-hidden border-t border-white/15 px-5 pb-8 pt-20 md:px-10">
      {/* Soft dark scrim so the white footer text stays readable over the
          brighter and darker areas of the artwork behind it. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,38,0.42)_0%,rgba(15,23,38,0.60)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10">
                <img src={asset('logo.png')} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-white">
                Legacya Sphere
              </span>
            </a>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-white/70">
              {identity.brandStatement}
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4 text-white">{col.title}</p>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-1 text-[14px] text-white/75 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          {/* Connect */}
          <div>
            <p className="eyebrow mb-4 text-white">Connect</p>
            <a
              href={`mailto:${identity.social.email}`}
              className="block py-1 text-[14px] text-white/75 transition-colors duration-300 hover:text-white"
            >
              Email
            </a>
            <a
              href={identity.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 text-[14px] text-white/75 transition-colors duration-300 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href={identity.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 text-[14px] text-white/75 transition-colors duration-300 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>

        <p className="wordmark wordmark-light mt-20" aria-hidden="true">
          Legacya Sphere
        </p>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-white/15 pt-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[13px] font-medium text-white">
            Legacya Sphere — AI-Native Business Systems Studio
          </p>
          <p className="text-[12px] text-white/60">
            © {new Date().getFullYear()} · Helping companies transform manual
            operations into scalable business systems.
          </p>
        </div>
      </div>
    </footer>
  )
}
