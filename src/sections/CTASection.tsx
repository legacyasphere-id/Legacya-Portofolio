import { useEffect, useState } from 'react'
import { identity, type ScopeSelectionDetail } from '../core/identity'
import {
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  composeInquiryBrief,
  getObjectivesForService,
  resolveServiceLabel,
  validateInquiryInput,
} from '../core/inquiry'

export function CTASection() {
  const [serviceCategory, setServiceCategory] = useState<string>(
    SERVICE_OPTIONS[0].label,
  )
  const [objective, setObjective] = useState<string>(
    SERVICE_OPTIONS[0].objectives[0],
  )
  const [timeline, setTimeline] = useState<string>(TIMELINE_OPTIONS[1])
  const [referenceWork, setReferenceWork] = useState<string>('')

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [notes, setNotes] = useState('')

  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [submittedChannel, setSubmittedChannel] = useState<'whatsapp' | 'email' | null>(null)

  const currentObjectives = getObjectivesForService(serviceCategory)

  const handleServiceSelect = (newServiceLabel: string) => {
    const resolved = resolveServiceLabel(newServiceLabel)
    setServiceCategory(resolved)
    const objs = getObjectivesForService(resolved)
    if (!objs.includes(objective)) {
      setObjective(objs[0])
    }
    setSubmittedChannel(null)
  }

  useEffect(() => {
    const onScopeSelect = (e: Event) => {
      const custom = e as CustomEvent<ScopeSelectionDetail>
      const d = custom.detail
      if (!d) return
      if (d.serviceCategory) {
        const resolved = resolveServiceLabel(d.serviceCategory)
        setServiceCategory(resolved)
        const objs = getObjectivesForService(resolved)
        setObjective(d.objective ?? objs[0])
      } else if (d.objective) {
        setObjective(d.objective)
      }
      if (d.projectReference) {
        setReferenceWork(d.projectReference)
      }
      setSubmittedChannel(null)
    }
    window.addEventListener('legacya:select-scope', onScopeSelect)
    return () => window.removeEventListener('legacya:select-scope', onScopeSelect)
  }, [])

  const getBriefText = () =>
    composeInquiryBrief({
      serviceCategory,
      objective,
      timeline,
      referenceWork: referenceWork || undefined,
      name,
      company,
      contactInfo,
      notes,
    })

  const checkValid = () => {
    const res = validateInquiryInput({ name, contactInfo })
    setError(res.error)
    return res.valid
  }

  const handleWhatsAppDispatch = () => {
    if (!checkValid()) return
    const brief = getBriefText()
    const waUrl = `https://wa.me/${identity.social.whatsapp}?text=${encodeURIComponent(brief)}`
    setSubmittedChannel('whatsapp')
    const a = document.createElement('a')
    a.href = waUrl
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleEmailDispatch = () => {
    if (!checkValid()) return
    const brief = getBriefText()
    const subject = `Project Inquiry: ${company.trim() || name.trim()} | ${serviceCategory}`
    const mailtoUrl = `mailto:${identity.social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`
    setSubmittedChannel('email')
    window.location.href = mailtoUrl
  }

  const handleCopyBrief = async () => {
    const brief = getBriefText()
    try {
      await navigator.clipboard.writeText(brief)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      setError('Could not copy automatically. Please use the WhatsApp or Email button.')
    }
  }

  return (
    <section
      id="contact"
      className="border-t border-border bg-bg/95 px-5 py-12 backdrop-blur-md md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div className="mb-8 max-w-[640px]" data-animate>
          <p className="eyebrow mb-3">Start a Project</p>
          <h2 className="display text-[clamp(1.95rem,3.5vw,2.9rem)] leading-[1.08] [text-wrap:balance]">
            Tell me about your business and what you want to{' '}
            <span className="text-blue-deep">build or create</span>.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            Pick a service below and send your brief directly via WhatsApp or email.
          </p>
        </div>

        {/* 2-Column Interactive Project Inquiry Configurator */}
        <div
          className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-stretch"
          data-animate
          data-delay="100"
        >
          {/* Left Column: Inquiry Form */}
          <div className="card p-5 sm:p-7">
            {referenceWork && (
              <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-blue/30 bg-blue/[0.06] px-4 py-2.5">
                <p className="font-mono text-[12px] text-blue-deep">
                  Reference:{' '}
                  <strong className="font-semibold">{referenceWork}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setReferenceWork('')}
                  className="font-mono text-[11px] text-muted hover:text-text whitespace-nowrap cursor-pointer"
                >
                  Clear &times;
                </button>
              </div>
            )}

            {/* Step 1: Service Category */}
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep">
                01. Service
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((opt) => {
                  const active = serviceCategory === opt.label
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleServiceSelect(opt.label)}
                      className={`min-h-[44px] rounded-xl border px-3 py-2 text-left transition-all duration-150 cursor-pointer ${
                        active
                          ? 'border-blue-deep bg-blue-deep text-white shadow-sm'
                          : 'border-border bg-bg/70 text-text hover:border-blue/40 hover:bg-surface'
                      }`}
                    >
                      <span className="block text-[13px] font-semibold leading-snug">
                        {opt.shortLabel}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Primary Challenge or Objective */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="scoper-objective"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep"
                >
                  02. Goal
                </label>
                <select
                  id="scoper-objective"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text focus:border-blue-deep focus:outline-none"
                >
                  {currentObjectives.map((obj) => (
                    <option key={obj} value={obj}>
                      {obj}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="scoper-timeline"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep"
                >
                  03. Timeline
                </label>
                <select
                  id="scoper-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text focus:border-blue-deep focus:outline-none"
                >
                  {TIMELINE_OPTIONS.map((tl) => (
                    <option key={tl} value={tl}>
                      {tl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Business / Brand & Contact Details */}
            <div className="mt-5 border-t border-border pt-5">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep">
                04. Your Details
              </p>

              <div className="mt-3 grid gap-3.5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="scoper-name"
                    className="block text-[12.5px] font-medium text-text"
                  >
                    Your Name *
                  </label>
                  <input
                    id="scoper-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="e.g. Budi Santoso"
                    className="mt-1 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="scoper-company"
                    className="block text-[12.5px] font-medium text-text"
                  >
                    Business / Brand
                  </label>
                  <input
                    id="scoper-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Nusantara Retail"
                    className="mt-1 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="scoper-contact"
                    className="block text-[12.5px] font-medium text-text"
                  >
                    Email or WhatsApp *
                  </label>
                  <input
                    id="scoper-contact"
                    type="text"
                    value={contactInfo}
                    onChange={(e) => {
                      setContactInfo(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="name@company.com or +62..."
                    className="mt-1 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3.5">
                <label
                  htmlFor="scoper-notes"
                  className="block text-[12.5px] font-medium text-text"
                >
                  Project Notes (Optional)
                </label>
                <textarea
                  id="scoper-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any context on what you want to build or promote..."
                  className="mt-1 w-full rounded-xl border border-border bg-bg p-3 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-3.5 rounded-xl border border-red-700/30 bg-red-50 px-4 py-2.5 text-[13px] font-medium text-red-900"
                >
                  {error}
                </div>
              )}

              {submittedChannel && (
                <div
                  role="status"
                  className="mt-3.5 rounded-xl border border-blue-deep/30 bg-blue/[0.08] px-4 py-2.5 text-[13px] font-medium text-blue-deep"
                >
                  {submittedChannel === 'whatsapp'
                    ? 'Your brief is ready in WhatsApp.'
                    : 'Your email app has been opened with your project brief.'}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Project Inquiry Summary & Dispatch */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-[#17181B] p-5 text-white sm:p-7">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-accent">
                  Inquiry Summary
                </span>
                <span className="font-mono text-[11px] text-white/60">
                  Reply within 1 business day
                </span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-[12px]">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                    Service
                  </span>
                  <span className="mt-0.5 block text-[13.5px] font-semibold text-white">
                    {serviceCategory}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                    Goal
                  </span>
                  <span className="mt-0.5 block text-white/90">
                    {objective}
                    {referenceWork ? ` (Ref: ${referenceWork})` : ''}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                      Timeline
                    </span>
                    <span className="mt-0.5 block text-white/85">{timeline}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                      Client
                    </span>
                    <span className="mt-0.5 block truncate text-white/85">
                      {name.trim()
                        ? `${name}${company ? ` · ${company}` : ''}`
                        : 'Awaiting your details...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispatch Actions */}
            <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={handleWhatsAppDispatch}
                className="btn w-full bg-[#25D366] font-semibold text-[#0D1418] hover:brightness-105 whitespace-nowrap"
              >
                Send Inquiry via WhatsApp &rarr;
              </button>

              <button
                type="button"
                onClick={handleEmailDispatch}
                className="btn-primary w-full whitespace-nowrap"
              >
                Send Inquiry via Email ({identity.social.email})
              </button>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="btn w-full border border-white/15 bg-white/5 text-[13px] text-white/85 hover:bg-white/10 whitespace-nowrap"
              >
                {copied ? 'Copied Project Brief ✓' : 'Copy Brief to Clipboard'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
