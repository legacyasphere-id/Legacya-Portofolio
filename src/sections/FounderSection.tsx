import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { identity } from '../core/identity'
import { asset } from '../utils/asset'

interface Cert {
  title: string
  issuer: string
  thumb: string
  pdf: string
}

const CERTS: Cert[] = [
  {
    title: 'Claude Code 101',
    issuer: 'Anthropic Academy',
    thumb: asset('assets/certificates/claude-code-101.webp'),
    pdf: asset('assets/certificates/claude-code-101-anthropic.pdf'),
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic Academy',
    thumb: asset('assets/certificates/ai-fluency-framework.webp'),
    pdf: asset('assets/certificates/ai-fluency-framework-anthropic.pdf'),
  },
  {
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic Academy',
    thumb: asset('assets/certificates/claude-cowork.webp'),
    pdf: asset('assets/certificates/claude-cowork-anthropic.pdf'),
  },
  {
    title: 'Claude 101',
    issuer: 'Anthropic Academy',
    thumb: asset('assets/certificates/claude-101.webp'),
    pdf: asset('assets/certificates/claude-101-anthropic.pdf'),
  },
]

export function FounderSection() {
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null)

  useEffect(() => {
    if (!selectedCert) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedCert])

  return (
    <section
      id="founder"
      className="border-t border-border bg-surface/80 px-5 py-10 md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Top Grid: Portrait + Founder Bio */}
        <div className="grid items-center gap-5 sm:grid-cols-[180px_1fr] md:grid-cols-[220px_1fr] md:gap-10">
          {/* Portrait */}
          <div className="w-[140px] sm:w-full" data-animate>
            <div className="overflow-hidden rounded-2xl border border-border bg-raised shadow-sm">
              <img
                src={`${asset('img-04.webp')}?v=updated`}
                alt={`${identity.name}, Founder of ${identity.company}`}
                referrerPolicy="no-referrer"
                className="aspect-[3/4] w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Bio & Studio Leadership */}
          <div>
            <p className="eyebrow mb-2" data-animate>
              Founder
            </p>

            <h2
              className="display text-[clamp(1.8rem,3.4vw,2.65rem)] leading-[1.08]"
              data-animate
              data-delay="100"
            >
              {identity.name}
            </h2>
            <p
              className="mt-1 font-mono text-[12px] font-medium text-blue-deep"
              data-animate
              data-delay="100"
            >
              {identity.role} · {identity.company} · {identity.location} ({identity.timezone})
            </p>

            <p
              className="mt-3 max-w-[58ch] text-[16.5px] leading-relaxed text-muted"
              data-animate
              data-delay="200"
            >
              I handle every project personally from discovery to handover, in
              English or Bahasa Indonesia.
            </p>

            {/* Direct Links */}
            <div
              className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border pt-3"
              data-animate
              data-delay="300"
            >
              <a
                href={identity.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep whitespace-nowrap"
              >
                LinkedIn <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={identity.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep whitespace-nowrap"
              >
                Instagram <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${identity.social.email}`}
                className="link-sweep whitespace-nowrap"
              >
                Email
              </a>
              <a
                href={`https://wa.me/${identity.social.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep whitespace-nowrap"
              >
                WhatsApp <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Training Sub-Panel */}
        <div
          className="mt-8 border-t border-border pt-6"
          data-animate
          data-delay="200"
        >
          <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-1">Training</p>
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-text">
                Anthropic courses completed
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {CERTS.map((c) => (
              <div
                key={c.title}
                className="card card-hover flex flex-col justify-between overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCert(c)}
                  className="group relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-raised text-left cursor-pointer"
                >
                  <img
                    src={c.thumb}
                    alt={`${c.title} certificate from Anthropic`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </button>

                <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                  <div>
                    <p className="font-mono text-[10px] text-blue-deep">
                      {c.issuer}
                    </p>
                    <p className="mt-0.5 text-[13px] sm:text-[14px] font-semibold leading-snug tracking-tight text-text">
                      {c.title}
                    </p>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2 text-[11.5px]">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(c)}
                      className="min-h-[44px] inline-flex items-center font-medium text-blue-deep hover:underline whitespace-nowrap cursor-pointer"
                    >
                      Preview
                    </button>
                    <a
                      href={c.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center font-mono text-[10.5px] text-muted hover:text-text whitespace-nowrap"
                    >
                      PDF <ArrowUpRight className="inline h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCert.title} certificate preview`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-[820px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121316] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 text-white">
              <div>
                <p className="text-[14px] font-semibold">{selectedCert.title}</p>
                <p className="font-mono text-[11px] text-white/65">
                  {selectedCert.issuer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="min-h-[44px] rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-medium text-white hover:bg-white/20 cursor-pointer"
              >
                Close (ESC) &times;
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-auto bg-black p-4">
              <img
                src={selectedCert.thumb}
                alt={selectedCert.title}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto rounded-lg object-contain"
              />
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3.5 text-white">
              <span className="font-mono text-[11.5px] text-white/70">
                Issued to {identity.name}
              </span>
              <a
                href={selectedCert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-4 py-2 text-[12.5px] whitespace-nowrap"
              >
                Open PDF <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
