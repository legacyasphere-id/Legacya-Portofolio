import { ArrowUpRight } from 'lucide-react'
import { identity, triggerProjectScope } from '../core/identity'
import { navigate, useRoute } from '../core/router'
import { useT } from '../i18n/context'
import { asset } from '../utils/asset'
import { Link } from './Link'

export function Footer() {
  const { t } = useT()
  const { route } = useRoute()

  const studioLinks = [
    { label: t.footer.studioLinks.about, to: '/#about' },
    { label: t.footer.studioLinks.services, to: '/#services' },
    { label: t.footer.studioLinks.work, to: '/work' },
    { label: t.footer.studioLinks.process, to: '/#process' },
    { label: t.footer.studioLinks.aiWorkflow, to: '/#ai-workflow' },
    { label: t.footer.studioLinks.whyLegacya, to: '/#why-legacya' },
  ]

  const capabilityLinks = [
    {
      label: t.footer.capabilityLinks.digital,
      serviceCategory: 'digital-systems',
    },
    {
      label: t.footer.capabilityLinks.advertising,
      serviceCategory: 'advertising-assets',
    },
    {
      label: t.footer.capabilityLinks.motion,
      serviceCategory: 'motion-animation',
    },
    {
      label: t.footer.capabilityLinks.video,
      serviceCategory: 'cinematic-video',
    },
    {
      label: t.footer.capabilityLinks.startProject,
      serviceCategory: 'combined-engagement',
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-[#121620] px-5 pb-8 pt-12 md:px-10">
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.35fr_1fr_1.15fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="#top"
              onClick={(e) => {
                if (route !== '/') {
                  e.preventDefault()
                  navigate('/#top')
                }
              }}
              className="inline-flex min-h-[44px] items-center gap-2.5"
            >
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10">
                <img
                  src={asset('logo.png')}
                  alt={t.footer.emblemAlt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="display text-[15px] font-semibold tracking-tight text-white">
                Legacya Sphere
              </span>
            </a>
            <p className="mt-2 max-w-[34ch] text-[13.5px] leading-relaxed text-white/75">
              {t.identity.brandStatement}
            </p>
            <p className="mt-2 font-mono text-[11px] text-white/55">
              {identity.location} ({identity.timezone})
            </p>
          </div>

          {/* Studio Navigation */}
          <div>
            <p className="eyebrow mb-2 text-white/90">{t.footer.studioHeading}</p>
            {studioLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={link.to === '/work' && route === '/work' ? 'page' : undefined}
                className="flex min-h-[44px] items-center py-1 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Core Capabilities */}
          <div>
            <p className="eyebrow mb-2 text-white/90">{t.footer.inquireHeading}</p>
            {capabilityLinks.map((item) => (
              <button
                key={item.serviceCategory}
                type="button"
                aria-label={`${t.footer.inquireAriaPrefix} ${item.label}`}
                onClick={() =>
                  triggerProjectScope({
                    serviceCategory: item.serviceCategory,
                  })
                }
                className="flex min-h-[44px] items-center py-1 text-left text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Direct Contact */}
          <div>
            <p className="eyebrow mb-2 text-white/90">{t.footer.directContactHeading}</p>
            <a
              href={`mailto:${identity.social.email}`}
              className="flex min-h-[44px] items-center py-1 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              {identity.social.email}
            </a>
            <a
              href={`https://wa.me/${identity.social.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-1 py-1 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              {t.footer.whatsappBusiness} <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={identity.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-1 py-1 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              {t.footer.instagramPrefix} ({identity.social.instagramHandle}) <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={identity.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-1 py-1 text-[13.5px] text-white/75 transition-colors duration-200 hover:text-white"
            >
              {t.footer.linkedinProfile} <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-white/15 pt-5 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[13px] font-medium text-white">
            {t.footer.closingLine}
          </p>
          <p className="text-[12px] text-white/60">
            © {new Date().getFullYear()} {identity.company}. {t.footer.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
