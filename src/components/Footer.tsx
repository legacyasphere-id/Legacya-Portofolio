import { ArrowUpRight } from 'lucide-react'
import { identity, triggerProjectScope } from '../core/identity'
import { asset } from '../utils/asset'

const STUDIO_LINKS = [
  { label: 'About Legacya Sphere', href: '#about' },
  { label: 'What We Do', href: '#services' },
  { label: 'Selected Digital Work', href: '#work' },
  { label: 'Advertising & Film Showcase', href: '#creative-work' },
  { label: 'How We Work', href: '#process' },
  { label: 'Why Legacya', href: '#why-legacya' },
]

const CAPABILITY_LINKS = [
  {
    label: 'Digital Experiences & Business Systems',
    serviceCategory: 'Digital Experiences & Business Systems',
  },
  {
    label: 'Advertising & Campaign Assets',
    serviceCategory: 'Advertising & Campaign Assets',
  },
  {
    label: 'Cinematic Video & Visual Production',
    serviceCategory: 'Cinematic Video & Visual Production',
  },
  {
    label: 'Start a Project Inquiry',
    serviceCategory: 'Combined Brand, Creative & Digital Engagement',
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-[#121620] px-5 pb-10 pt-16 md:px-10">
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-12 md:grid-cols-[1.35fr_1fr_1.15fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10">
                <img
                  src={asset('logo.png')}
                  alt="Legacya Sphere emblem"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="display text-[15px] font-semibold tracking-tight text-white">
                Legacya Sphere
              </span>
            </a>
            <p className="mt-4 max-w-[36ch] text-[14px] leading-relaxed text-white/75">
              {identity.brandStatement}
            </p>
            <p className="mt-3 font-mono text-[11px] text-white/55">
              {identity.location} ({identity.timezone}) · Serving Businesses Locally &amp; Globally
            </p>
          </div>

          {/* Studio Navigation */}
          <div>
            <p className="eyebrow mb-4 text-white/90">Studio</p>
            {STUDIO_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-1.5 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Core Capabilities */}
          <div>
            <p className="eyebrow mb-4 text-white/90">Inquire by Service</p>
            {CAPABILITY_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                aria-label={`Inquire about ${item.label}`}
                onClick={() =>
                  triggerProjectScope({
                    serviceCategory: item.serviceCategory,
                  })
                }
                className="block py-1.5 text-left text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Direct Contact */}
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
              WhatsApp Business <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={identity.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1.5 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              Instagram ({identity.social.instagramHandle}) <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={identity.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1.5 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              LinkedIn Profile <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/15 pt-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[13px] font-medium text-white">
            Legacya Sphere · Building systems. Elevating brands. Creating legacies.
          </p>
          <p className="text-[12px] text-white/60">
            © {new Date().getFullYear()} {identity.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
