import { useEffect, useState } from 'react'
import {
  consumePendingScopeSelection,
  identity,
  type ScopeSelectionDetail,
} from '../core/identity'
import {
  type ServiceCategoryId,
  composeInquiryBrief,
  getServiceOptions,
  getTimelineOptions,
  resolveObjectiveIndex,
  resolveServiceId,
  validateInquiryInput,
} from '../core/inquiry'
import { useT } from '../i18n/context'

export function CTASection() {
  const { lang, t } = useT()

  const [serviceId, setServiceId] = useState<ServiceCategoryId>('digital-systems')
  const [objectiveIdx, setObjectiveIdx] = useState<number>(0)
  const [timelineIdx, setTimelineIdx] = useState<number>(1)
  const [referenceWork, setReferenceWork] = useState<string>('')

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [notes, setNotes] = useState('')

  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [submittedChannel, setSubmittedChannel] = useState<'whatsapp' | 'email' | null>(null)

  const serviceOptions = getServiceOptions(lang)
  const timelineOptions = getTimelineOptions(lang)
  const activeServiceOption =
    serviceOptions.find((s) => s.id === serviceId) ?? serviceOptions[0]
  const currentObjectives = activeServiceOption.objectives
  const serviceCategory = activeServiceOption.label
  const objective = currentObjectives[objectiveIdx] ?? currentObjectives[0]
  const timeline = timelineOptions[timelineIdx] ?? timelineOptions[1]

  const handleServiceSelect = (nextServiceId: ServiceCategoryId) => {
    setServiceId(nextServiceId)
    setObjectiveIdx(0)
    setSubmittedChannel(null)
  }

  const applyScopeDetail = (d: ScopeSelectionDetail) => {
    if (d.serviceCategory) {
      const resolvedId = resolveServiceId(d.serviceCategory)
      setServiceId(resolvedId)
      setObjectiveIdx(resolveObjectiveIndex(resolvedId, d.objective))
    } else if (d.objective) {
      setObjectiveIdx((prevIdx) =>
        resolveObjectiveIndex(serviceId, d.objective) ?? prevIdx,
      )
    }
    if (d.projectReference) {
      setReferenceWork(d.projectReference)
    }
    setSubmittedChannel(null)
  }

  useEffect(() => {
    const pending = consumePendingScopeSelection()
    if (pending) {
      applyScopeDetail(pending)
    }
  }, [])

  useEffect(() => {
    const onScopeSelect = (e: Event) => {
      const custom = e as CustomEvent<ScopeSelectionDetail>
      const d = custom.detail
      if (!d) return
      applyScopeDetail(d)
    }
    window.addEventListener('legacya:select-scope', onScopeSelect)
    return () => window.removeEventListener('legacya:select-scope', onScopeSelect)
  }, [serviceId])

  const getBriefText = () =>
    composeInquiryBrief(
      {
        serviceCategory,
        objective,
        timeline,
        referenceWork: referenceWork || undefined,
        name,
        company,
        contactInfo,
        notes,
      },
      lang,
    )

  const checkValid = () => {
    const res = validateInquiryInput({ name, contactInfo }, lang)
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
    const subject = `${t.cta.emailSubjectPrefix} ${company.trim() || name.trim()} | ${serviceCategory}`
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
      setError(t.cta.copyError)
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
          <p className="eyebrow mb-3">{t.cta.eyebrow}</p>
          <h2 className="display text-[clamp(1.95rem,3.5vw,2.9rem)] leading-[1.08] [text-wrap:balance]">
            {t.cta.headingPrefix}
            <span className="text-blue-deep">{t.cta.headingAccent}</span>
            {t.cta.headingSuffix}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">
            {t.cta.subline}
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
                  {t.cta.referenceLabel}{' '}
                  <strong className="font-semibold">{referenceWork}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setReferenceWork('')}
                  className="font-mono text-[11px] text-muted hover:text-text whitespace-nowrap cursor-pointer"
                >
                  {t.cta.clearBtn} &times;
                </button>
              </div>
            )}

            {/* Step 1: Service Category */}
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep">
                {t.cta.step1Label}
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {serviceOptions.map((opt) => {
                  const active = serviceId === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleServiceSelect(opt.id)}
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
                  {t.cta.step2Label}
                </label>
                <select
                  id="scoper-objective"
                  value={objectiveIdx}
                  onChange={(e) => setObjectiveIdx(Number(e.target.value))}
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text focus:border-blue-deep focus:outline-none"
                >
                  {currentObjectives.map((obj, idx) => (
                    <option key={obj} value={idx}>
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
                  {t.cta.step3Label}
                </label>
                <select
                  id="scoper-timeline"
                  value={timelineIdx}
                  onChange={(e) => setTimelineIdx(Number(e.target.value))}
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text focus:border-blue-deep focus:outline-none"
                >
                  {timelineOptions.map((tl, idx) => (
                    <option key={tl} value={idx}>
                      {tl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Business / Brand & Contact Details */}
            <div className="mt-5 border-t border-border pt-5">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-deep">
                {t.cta.step4Label}
              </p>

              <div className="mt-3 grid gap-3.5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="scoper-name"
                    className="block text-[12.5px] font-medium text-text"
                  >
                    {t.cta.nameLabel}
                  </label>
                  <input
                    id="scoper-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder={t.cta.namePlaceholder}
                    className="mt-1 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="scoper-company"
                    className="block text-[12.5px] font-medium text-text"
                  >
                    {t.cta.companyLabel}
                  </label>
                  <input
                    id="scoper-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={t.cta.companyPlaceholder}
                    className="mt-1 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="scoper-contact"
                    className="block text-[12.5px] font-medium text-text"
                  >
                    {t.cta.contactLabel}
                  </label>
                  <input
                    id="scoper-contact"
                    type="text"
                    value={contactInfo}
                    onChange={(e) => {
                      setContactInfo(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder={t.cta.contactPlaceholder}
                    className="mt-1 min-h-[44px] w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-[13.5px] text-text placeholder:text-dim focus:border-blue-deep focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3.5">
                <label
                  htmlFor="scoper-notes"
                  className="block text-[12.5px] font-medium text-text"
                >
                  {t.cta.notesLabel}
                </label>
                <textarea
                  id="scoper-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.cta.notesPlaceholder}
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
                    ? t.cta.whatsappStatus
                    : t.cta.emailStatus}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Project Inquiry Summary & Dispatch */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-[#17181B] p-5 text-white sm:p-7">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-accent">
                  {t.cta.summaryEyebrow}
                </span>
                <span className="font-mono text-[11px] text-white/60">
                  {t.cta.summaryReplyTime}
                </span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-[12px]">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                    {t.cta.summaryService}
                  </span>
                  <span className="mt-0.5 block text-[13.5px] font-semibold text-white">
                    {serviceCategory}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                    {t.cta.summaryGoal}
                  </span>
                  <span className="mt-0.5 block text-white/90">
                    {objective}
                    {referenceWork ? ` (${t.cta.summaryRefPrefix} ${referenceWork})` : ''}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                      {t.cta.summaryTimeline}
                    </span>
                    <span className="mt-0.5 block text-white/85">{timeline}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                      {t.cta.summaryClient}
                    </span>
                    <span className="mt-0.5 block truncate text-white/85">
                      {name.trim()
                        ? `${name}${company ? ` · ${company}` : ''}`
                        : t.cta.summaryAwaiting}
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
                {t.cta.sendWhatsApp} &rarr;
              </button>

              <button
                type="button"
                onClick={handleEmailDispatch}
                className="btn-primary w-full whitespace-nowrap"
              >
                {t.cta.sendEmailPrefix} ({identity.social.email})
              </button>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="btn w-full border border-white/15 bg-white/5 text-[13px] text-white/85 hover:bg-white/10 whitespace-nowrap"
              >
                {copied ? t.cta.copiedBrief : t.cta.copyBrief}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
