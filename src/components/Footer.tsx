import { identity } from '../core/identity'
import { asset } from '../utils/asset'

const COLUMNS = [
  {
    title: 'Studio',
    links: [
      { label: 'Solutions & Capabilities', href: '#solutions' },
      { label: 'Production Case Studies', href: '#work' },
      { label: 'Engineering Process', href: '#process' },
      { label: 'Founder & Credentials', href: '#founder' },
    ],
  },
  {
    title: 'Engagement Tiers',
    links: [
      { label: 'AI Workflow & Automation', href: '#pricing' },
      { label: 'Custom Operations OS', href: '#pricing' },
      { label: 'Enterprise Infrastructure', href: '#pricing' },
      { label: 'Interactive Project Scoper', href: '#contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-[#121620] px-5 pb-10 pt-16 md:px-10">
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10">
                <img
                  src={asset('logo.png')}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="display text-[15px] font-semibold tracking-tight text-white">
                Legacya Sphere
              </span>
            </a>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-white/75">
              {identity.brandStatement}
            </p>
            <p className="mt-3 font-mono text-[11px] text-white/55">
              {identity.location} ({identity.timezone}) · Serving Global B2B Clients
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4 text-white/90">{col.title}</p>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-1.5 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          {/* Connect */}
          <div>
            <p className="eyebrow mb-4 text-white/90">Direct Contact</p>
            <a
              href={`mailto:${identity.social.email}`}
              className="block py-1.5 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              {identity.social.email}
            </a>
            <a
              href={`https://wa.me/${identity.social.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1.5 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              WhatsApp Business &nearr;
            </a>
            <a
              href={identity.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1.5 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              LinkedIn &nearr;
            </a>
            <a
              href={identity.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1.5 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              GitHub Repositories &nearr;
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/15 pt-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[13px] font-medium text-white">
            Legacya Sphere · AI-Native Business Systems Studio
          </p>
          <p className="text-[12px] text-white/60">
            © {new Date().getFullYear()} {identity.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
