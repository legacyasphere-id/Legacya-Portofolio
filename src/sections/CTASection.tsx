import { useEffect, useState } from 'react'
import { identity, type ScopeSelectionDetail } from '../core/identity'

const TIER_OPTIONS = [
  'AI Workflow & Automation',
  'Custom Operations OS',
  'Enterprise Infrastructure',
  'Architecture Discovery / Advisory',
]

const SYSTEM_TYPES = [
  'Custom Operations OS & Mini-ERPs',
  'Deterministic AI & Document Pipelines',
  'AI Customer Portals & Lead Engines',
  'Real-Time POS & Field Execution Systems',
  'Multi-Subsystem Custom Platform',
]

const BOTTLENECKS = [
  'Replacing fragmented Excel / Google Sheets across roles',
  'Automating manual document / CV screening & scoring',
  'Capturing & qualifying 24/7 customer inquiries automatically',
  'Synchronizing cashier, kitchen/warehouse & live revenue analytics',
  'Consolidating multiple disconnected SaaS tools into one OS',
]

const TIMELINES = [
  'Immediate (Kickoff within 7 days)',
  'Within 30 Days',
  '1–3 Months (Planning Phase)',
  'Flexible / Exploring Options',
]

export function CTASection() {
  const [tier, setTier] = useState<string>('Custom Operations OS')
  const [systemType, setSystemType] = useState<string>('Custom Operations OS & Mini-ERPs')
  const [bottleneck, setBottleneck] = useState<string>(BOTTLENECKS[0])
  const [timeline, setTimeline] = useState<string>('Within 30 Days')
  const [referenceProject, setReferenceProject] = useState<string>('')

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [notes, setNotes] = useState('')

  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [submittedChannel, setSubmittedChannel] = useState<'whatsapp' | 'email' | null>(null)

  // Listen for pre-fill events from Solutions, Work, or Pricing sections
  useEffect(() => {
    const onScopeSelect = (e: Event) => {
      const custom = e as CustomEvent<ScopeSelectionDetail>
      const d = custom.detail
      if (!d) return
      if (d.tier) setTier(d.tier)
      if (d.systemType) setSystemType(d.systemType)
      if (d.bottleneck) setBottleneck(d.bottleneck)
      if (d.projectReference) setReferenceProject(d.projectReference)
      setSubmittedChannel(null)
    }
    window.addEventListener('legacya:select-scope', onScopeSelect)
    return () => window.removeEventListener('legacya:select-scope', onScopeSelect)
  }, [])

  const composeBriefText = () => {
    const lines = [
      `Hello Legacya Sphere Team,`,
      ``,
      `I would like to scope a business system project:`,
      `• Client Name: ${name.trim() || 'Not specified'}`,
      `• Company / Organization: ${company.trim() || 'Not specified'}`,
      `• Reply Contact (Email/WA): ${contactInfo.trim() || 'Not specified'}`,
      `• Target Tier: ${tier}`,
      `• System Category: ${systemType}`,
      referenceProject ? `• Reference Architecture: ${referenceProject}` : null,
      `• Primary Bottleneck: ${bottleneck}`,
      `• Target Timeline: ${timeline}`,
      notes.trim() ? `• Operational Context: ${notes.trim()}` : null,
    ].filter(Boolean)

    return lines.join('\n')
  }

  const validateForm = () => {
    if (!name.trim()) {
      setError('Please enter your name so we know how to address you.')
      return false
    }
    if (!contactInfo.trim()) {
      setError('Please provide your work email or WhatsApp number so we can reply.')
      return false
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.trim())
    const isPhone = /^[+\d][\d\s\-()]{6,}$/.test(contactInfo.trim())
    if (!isEmail && !isPhone) {
      setError('Please enter a valid email address (e.g. name@company.com) or phone/WhatsApp number.')
      return false
    }
    setError(null)
    return true
  }

  const handleWhatsAppDispatch = () => {
    if (!validateForm()) return
    const brief = composeBriefText()
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
    if (!validateForm()) return
    const brief = composeBriefText()
    const subject = `System Discovery Brief: ${company.trim() || name.trim()} — ${tier}`
    const mailtoUrl = `mailto:${identity.social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`
    setSubmittedChannel('email')
    window.location.href = mailtoUrl
  }

  const handleCopyBrief = async () => {
    const brief = composeBriefText()
    try {
      await navigator.clipboard.writeText(brief)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      setError('Could not copy automatically—please use the Email or WhatsApp button.')
    }
  }

  return (
    <section
      id="contact"
      className="border-t border-border bg-bg/95 px-5 py-24 backdrop-blur-md md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div className="mb-12 max-w-[58ch]" data-animate>
          <p className="eyebrow mb-4">Start Your Engagement</p>
          <h2 className="display text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.08] [text-wrap:balance]">
            Scope the system behind your next stage of{' '}
            <span className="text-blue-deep">growth</span>.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
            Configure your operational requirements below to generate a
            structured system brief. Send it directly to our founder via
            WhatsApp or Email for a complimentary architecture review within 24
            hours.
          </p>
        </div>

        {/* 2-Column Interactive Project Scoper */}
        <div
          className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-stretch"
          data-animate
          data-delay="100"
        >
          {/* Left Column: Interactive Configurator */}
          <div className="card p-6 sm:p-8 md:p-10">
            {referenceProject && (
              <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-blue/30 bg-blue/[0.06] px-4 py-3">
                <p className="font-mono text-[12px] text-blue-deep">
                  Reference Architecture Selected: <strong className="font-semibold">{referenceProject}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setReferenceProject('')}
                  className="font-mono text-[11px] text-muted hover:text-text whitespace-nowrap"
                >
                  Clear &#x2715;
                </button>
              </div>
            )}

            {/* Step 1: Engagement Tier */}
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep">
                01. Target Engagement Tier
              </label>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {TIER_OPTIONS.map((opt) => {
                  const active = tier === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTier(opt)}
                      className={`rounded-xl border px-4 py-3 text-left text-[13.5px] font-medium transition-all duration-150 ${
                        active
                          ? 'border-blue-deep bg-blue-deep text-white shadow-sm'
                          : 'border-border bg-bg/70 text-text hover:border-blue/40 hover:bg-surface'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: System Category & Primary Bottleneck */}
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="scoper-system-type"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep"
                >
                  02. System Architecture Type
                </label>
                <select
                  id="scoper-system-type"
                  value={systemType}
                  onChange={(e) => setSystemType(e.target.value)}
                  className="mt-2.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[13.5px] text-text focus:border-blue-deep focus:outline-none"
                >
                  {SYSTEM_TYPES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="scoper-timeline"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep"
                >
                  03. Target Delivery Timeline
                </label>
                <select
                  id="scoper-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="mt-2.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[13.5px] text-text focus:border-blue-deep focus:outline-none"
                >
                  {TIMELINES.map((tl) => (
                    <option key={tl} value={tl}>
                      {tl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Operational Bottleneck */}
            <div className="mt-7">
              <label
                htmlFor="scoper-bottleneck"
                className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep"
              >
                04. Primary Operational Bottleneck to Solve
              </label>
              <select
                id="scoper-bottleneck"
                value={bottleneck}
                onChange={(e) => setBottleneck(e.target.value)}
                className="mt-2.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[13.5px] text-text focus:border-blue-deep focus:outline-none"
              >
                {BOTTLENECKS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Client Identity & Context */}
            <div className="mt-7 border-t border-border pt-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep">
                05. Your Contact &amp; Operational Context
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="scoper-name" className="block text-[12.5px] font-medium text-text">
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
                    className="mt-1.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="scoper-company" className="block text-[12.5px] font-medium text-text">
                    Company / Brand
                  </label>
                  <input
                    id="scoper-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. PT Maju Logistik"
                    className="mt-1.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="scoper-contact" className="block text-[12.5px] font-medium text-text">
                    Work Email or WhatsApp *
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
                    className="mt-1.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="scoper-notes" className="block text-[12.5px] font-medium text-text">
                  Current Workflow &amp; Desired Outcome (Optional)
                </label>
                <textarea
                  id="scoper-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us briefly how your team currently handles this process (e.g., 5 staff updating shared spreadsheets) and what success looks like..."
                  className="mt-1.5 w-full rounded-xl border border-border bg-bg p-3.5 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-red-700/30 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-900"
                >
                  {error}
                </div>
              )}

              {submittedChannel && (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-blue-deep/30 bg-blue/[0.08] px-4 py-3 text-[13px] font-medium text-blue-deep"
                >
                  {submittedChannel === 'whatsapp'
                    ? 'Your structured brief is ready in WhatsApp. If the tab did not open, you can also copy the brief on the right.'
                    : 'Your email client has been opened with the structured brief pre-filled.'}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Brief Summary & Multi-Channel Dispatch */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-[#17181B] p-6 text-white sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-accent">
                  Live System Discovery Brief
                </span>
                <span className="font-mono text-[11px] text-white/60">
                  Response &lt; 24h
                </span>
              </div>

              <div className="mt-5 space-y-3.5 font-mono text-[12px]">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                    Selected Tier
                  </span>
                  <span className="mt-0.5 block text-[13.5px] font-semibold text-white">
                    {tier}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                    Target Architecture
                  </span>
                  <span className="mt-0.5 block text-white/90">
                    {systemType}
                    {referenceProject ? ` (Ref: ${referenceProject})` : ''}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                    Operational Bottleneck
                  </span>
                  <span className="mt-0.5 block text-white/85">
                    {bottleneck}
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
                      Client / Organization
                    </span>
                    <span className="mt-0.5 block truncate text-white/85">
                      {name.trim() ? `${name}${company ? ` · ${company}` : ''}` : 'Awaiting input...'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-[12.5px] leading-relaxed text-white/75">
                <p className="font-semibold text-white">What happens next:</p>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-[12px]">
                  <li>We review your workflow bottleneck and reference architecture.</li>
                  <li>We schedule a focused 30-minute architecture &amp; ROI call.</li>
                  <li>You receive a fixed-scope blueprint, database model &amp; timeline.</li>
                </ol>
              </div>
            </div>

            {/* Dispatch Actions */}
            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={handleWhatsAppDispatch}
                className="btn w-full bg-[#25D366] text-[#0D1418] font-semibold hover:brightness-105 whitespace-nowrap"
              >
                Send Brief via WhatsApp &rarr;
              </button>

              <button
                type="button"
                onClick={handleEmailDispatch}
                className="btn-primary w-full whitespace-nowrap"
              >
                Send Brief via Email ({identity.social.email})
              </button>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="btn w-full border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 text-[13px] whitespace-nowrap"
              >
                {copied ? 'Copied Brief to Clipboard ✓' : 'Copy Formatted Brief to Clipboard'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
