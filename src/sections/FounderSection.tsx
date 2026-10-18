import { useEffect, useState } from 'react'
import { identity } from '../core/identity'
import { asset } from '../utils/asset'

interface Cert {
  title: string
  issuer: string
  focus: string
  thumb: string
  pdf: string
}

const CERTS: Cert[] = [
  {
    title: 'Claude Code 101',
    issuer: 'Anthropic Verified',
    focus: 'AI Co-Engineered Architecture & Codebase Execution',
    thumb: asset('assets/certificates/claude-code-101.webp'),
    pdf: asset('assets/certificates/claude-code-101-anthropic.pdf'),
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic Verified',
    focus: 'Deterministic Prompting & System Reliability',
    thumb: asset('assets/certificates/ai-fluency-framework.webp'),
    pdf: asset('assets/certificates/ai-fluency-framework-anthropic.pdf'),
  },
  {
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic Verified',
    focus: 'Agentic Workflows & Multi-Step Operations',
    thumb: asset('assets/certificates/claude-cowork.webp'),
    pdf: asset('assets/certificates/claude-cowork-anthropic.pdf'),
  },
  {
    title: 'Claude 101',
    issuer: 'Anthropic Verified',
    focus: 'Enterprise LLM Integration & Safety Boundaries',
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
      className="border-t border-border bg-bg px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Top Grid: Portrait + Founder Bio */}
        <div className="grid items-center gap-12 md:grid-cols-[340px_1fr] md:gap-16">
          {/* Portrait */}
          <div className="mx-auto w-full max-w-[340px]" data-animate>
            <div className="overflow-hidden rounded-2xl border border-border bg-raised shadow-sm">
              <img
                src={`${asset('img-04.webp')}?v=updated`}
                alt={`${identity.name}, Founder & Lead Systems Architect at ${identity.company}`}
                referrerPolicy="no-referrer"
                className="aspect-[3/4] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bio & Studio Leadership */}
          <div>
            <p className="eyebrow mb-4" data-animate>
              Founder &amp; Lead Systems Architect
            </p>

            <h2
              className="display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1]"
              data-animate
              data-delay="100"
            >
              {identity.name}
            </h2>
            <p
              className="mt-2 font-mono text-[13px] font-medium text-blue-deep"
              data-animate
              data-delay="100"
            >
              Founder · {identity.company} · {identity.badges.join(' · ')}
            </p>

            <div
              className="mt-6 max-w-[62ch] space-y-4 text-[clamp(1rem,1.35vw,1.12rem)] leading-relaxed text-muted"
              data-animate
              data-delay="200"
            >
              <p>
                Every engagement at Legacya Sphere is architected and led
                directly by me—no account-manager handoffs or junior outsourcing.
                I partner with founders and operations leaders who have outgrown
                spreadsheets to design and ship production platforms, mini-ERPs,
                and deterministic AI workflows.
              </p>
              <p>
                By pairing rigorous database-first systems engineering with
                Anthropic-certified AI co-engineering workflows,{' '}
                <span className="font-medium text-text">
                  we compress multi-month development cycles into focused weeks
                </span>
                —delivering clean, documented infrastructure built to outlast
                the people who set it up.
              </p>
            </div>

            {/* Clean Unboxed Metadata Line */}
            <div
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-5 font-mono text-[11.5px] text-muted"
              data-animate
              data-delay="300"
            >
              <span className="font-medium text-blue-deep">4 Systems in Production</span>
              <span aria-hidden="true">·</span>
              <span>{identity.location} ({identity.timezone})</span>
              <span aria-hidden="true">·</span>
              <span>{identity.availability}</span>
              <span aria-hidden="true">·</span>
              <span>EN / ID Bilingual</span>
            </div>

            {/* Direct Founder Links */}
            <div
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
              data-animate
              data-delay="400"
            >
              <a
                href={identity.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep whitespace-nowrap"
              >
                LinkedIn Profile &nearr;
              </a>
              <a
                href={identity.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep whitespace-nowrap"
              >
                GitHub Architecture &nearr;
              </a>
              <a
                href={`mailto:${identity.social.email}`}
                className="link-sweep whitespace-nowrap"
              >
                Direct Email
              </a>
            </div>
          </div>
        </div>

        {/* Relocated Anthropic Credentials Sub-Panel */}
        <div
          className="mt-16 border-t border-border pt-12"
          data-animate
          data-delay="200"
        >
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-2">Verified Founder Credentials</p>
              <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-text">
                Anthropic AI Engineering &amp; Fluency Certifications
              </h3>
            </div>
            <p className="font-mono text-[11.5px] text-muted">
              Click any credential to inspect the verified certificate or download PDF
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map((c) => (
              <div
                key={c.title}
                className="card card-hover flex flex-col justify-between overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCert(c)}
                  className="group relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-raised text-left"
                >
                  <img
                    src={c.thumb}
                    alt={`${c.title} certificate from Anthropic`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
                    Preview &#x26F6;
                  </span>
                </button>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p className="font-mono text-[10.5px] text-blue-deep">
                      {c.issuer}
                    </p>
                    <p className="mt-1 text-[14px] font-semibold tracking-tight text-text">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-muted">
                      {c.focus}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[12px]">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(c)}
                      className="font-medium text-blue-deep hover:underline whitespace-nowrap"
                    >
                      Inspect Image
                    </button>
                    <a
                      href={c.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-muted hover:text-text whitespace-nowrap"
                    >
                      Official PDF &nearr;
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
                  {selectedCert.issuer} · {selectedCert.focus}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-medium text-white hover:bg-white/20"
              >
                Close (ESC) &#x2715;
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
                Open Full Certificate PDF &nearr;
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
