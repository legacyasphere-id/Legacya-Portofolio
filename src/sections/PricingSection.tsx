import { useRef, useState } from 'react'
import { triggerProjectScope } from '../core/identity'

type Currency = 'IDR' | 'USD'

interface B2BPlan {
  index: string
  name: string
  target: string
  priceIdr: string
  priceUsd: string
  timeline: string
  summary: string
  features: string[]
  cta: string
  featured?: boolean
  recommendedNote?: string
  defaultSystemType: string
}

const PLANS: B2BPlan[] = [
  {
    index: '01.',
    name: 'AI Workflow & Automation',
    target: 'High-Leverage Departmental Systems',
    priceIdr: 'Rp 8.500.000',
    priceUsd: '$600',
    timeline: '1–2 Weeks Delivery',
    summary:
      'Ideal for businesses ready to automate manual document screening, 24/7 customer Q&A, or multi-step lead routing.',
    features: [
      'Custom RAG Assistant grounded on your company knowledge base',
      'Deterministic AI document extraction & structured scoring rubric',
      'Automated Make.com / n8n → Email, WhatsApp & CRM pipelines',
      'High-converting intake portal or internal operator view',
      'Admin upload panel for self-service knowledge base updates',
    ],
    cta: 'Scope AI Workflow',
    defaultSystemType: 'Deterministic AI & Document Pipelines',
  },
  {
    index: '02.',
    name: 'Custom Operations OS',
    target: 'Growing SMEs Outgrowing Spreadsheets',
    priceIdr: 'Rp 18.000.000',
    priceUsd: '$1,250',
    timeline: '3–5 Weeks Delivery',
    summary:
      'Our flagship engagement: a tailored internal operating system, Mini-ERP, or real-time POS built around your exact workflow.',
    features: [
      'Full-stack React / Next.js + TypeScript operational web platform',
      'Transactional PostgreSQL schema with Row-Level Security (RLS)',
      'Multi-role workspaces (Owner, Manager, Operator, Cashier/Staff)',
      'Real-time KPI dashboards, alerts & CSV/JSON reporting exports',
      'Automated CI/CD deployment + 100% source code & IP ownership',
    ],
    cta: 'Scope Custom OS',
    featured: true,
    recommendedNote: 'Most Popular B2B Build',
    defaultSystemType: 'Custom Operations OS & Mini-ERPs',
  },
  {
    index: '03.',
    name: 'Enterprise Infrastructure',
    target: 'Multi-Branch & Complex Organizations',
    priceIdr: 'Rp 35.000.000',
    priceUsd: '$2,500',
    timeline: '5–8+ Weeks / Retainer',
    summary:
      'End-to-end digital infrastructure uniting multiple operational subsystems, custom AI engines, and legacy data migration.',
    features: [
      'Multi-subsystem architecture (ERP + Realtime POS + AI Pipelines)',
      'Legacy spreadsheet & historical database cleansing + migration',
      'Custom REST/Webhook integrations with accounting or ERP tools',
      'Dedicated staging environment, automated test suites & audit logs',
      'Priority post-launch evolution, SLA monitoring & team training',
    ],
    cta: 'Scope Enterprise Build',
    defaultSystemType: 'Enterprise Multi-Subsystem Infrastructure',
  },
]

function Check({ featured }: { featured?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-white' : 'text-blue-deep'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  )
}

function PricingCard({
  plan,
  index,
  currency,
}: {
  plan: B2BPlan
  index: number
  currency: Currency
}) {
  const ref = useRef<HTMLElement>(null)
  const raf = useRef(0)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const x = e.clientX
    const y = e.clientY
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${x - r.left}px`)
      el.style.setProperty('--my', `${y - r.top}px`)
    })
  }

  const displayedPrice = currency === 'IDR' ? plan.priceIdr : plan.priceUsd

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}
      data-animate
      data-delay={String((index + 1) * 100)}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span
              className={`font-mono text-[11px] font-semibold tabular-nums ${
                plan.featured ? 'text-white/80' : 'text-blue-deep'
              }`}
            >
              {plan.index} {plan.target}
            </span>
            {plan.recommendedNote && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/90 underline underline-offset-4">
                {plan.recommendedNote}
              </span>
            )}
          </div>

          <h3
            className={`mt-3 text-[1.55rem] font-bold tracking-[-0.02em] ${
              plan.featured ? 'text-white' : 'text-text'
            }`}
          >
            {plan.name}
          </h3>

          <p
            className={`mt-2.5 text-[13.5px] leading-relaxed ${
              plan.featured ? 'text-white/80' : 'text-muted'
            }`}
          >
            {plan.summary}
          </p>

          <div className="mt-6 flex items-baseline gap-2">
            <span
              className={`font-mono text-[2rem] font-extrabold tracking-tight tabular-nums ${
                plan.featured ? 'text-white' : 'text-blue-deep'
              }`}
            >
              {displayedPrice}
            </span>
            <span
              className={`font-mono text-[12px] ${
                plan.featured ? 'text-white/75' : 'text-muted'
              }`}
            >
              starting investment
            </span>
          </div>
          <p
            className={`mt-1 font-mono text-[11px] ${
              plan.featured ? 'text-white/65' : 'text-dim'
            }`}
          >
            Typical timeline: {plan.timeline} · Zero recurring license fees
          </p>

          <ul
            className={`mt-6 flex flex-col gap-3 border-t pt-6 ${
              plan.featured ? 'border-white/20' : 'border-border'
            }`}
          >
            {plan.features.map((f) => (
              <li
                key={f}
                className={`flex gap-2.5 text-[13.5px] leading-snug ${
                  plan.featured ? 'text-white/90' : 'text-muted'
                }`}
              >
                <Check featured={plan.featured} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() =>
            triggerProjectScope({
              tier: plan.name,
              systemType: plan.defaultSystemType,
            })
          }
          className={`pricing-cta mt-8 whitespace-nowrap ${
            plan.featured ? 'pricing-cta--light' : 'pricing-cta--gradient'
          }`}
        >
          {plan.cta} &rarr;
        </button>
      </div>
    </article>
  )
}

export function PricingSection() {
  const [currency, setCurrency] = useState<Currency>('IDR')

  return (
    <section
      id="pricing"
      className="border-t border-border bg-surface/75 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[54ch]">
            <p className="eyebrow mb-4">B2B System Investment Tiers</p>
            <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] [text-wrap:balance]">
              Transparent system engagements built for ROI
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              We don&rsquo;t charge per-user SaaS rent. You invest once in
              custom operational infrastructure tailored to your business and
              own 100% of the platform.
            </p>
          </div>

          {/* Interactive Currency Switcher (IDR / USD) */}
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
              Display Currency
            </span>
            <div
              role="group"
              aria-label="Select pricing currency"
              className="inline-flex rounded-xl border border-border bg-bg p-1"
            >
              <button
                type="button"
                onClick={() => setCurrency('IDR')}
                className={`rounded-lg px-4 py-1.5 font-mono text-[12px] font-medium transition-colors whitespace-nowrap ${
                  currency === 'IDR'
                    ? 'bg-blue-deep text-white shadow-sm'
                    : 'text-muted hover:text-text'
                }`}
              >
                IDR (Rp · Indonesia)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`rounded-lg px-4 py-1.5 font-mono text-[12px] font-medium transition-colors whitespace-nowrap ${
                  currency === 'USD'
                    ? 'bg-blue-deep text-white shadow-sm'
                    : 'text-muted hover:text-text'
                }`}
              >
                USD ($ · Global)
              </button>
            </div>
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={i}
              currency={currency}
            />
          ))}
        </div>

        <p
          className="mt-9 text-center font-mono text-[11.5px] text-muted"
          data-animate
          data-delay="200"
        >
          Every tier includes architecture documentation, staging environment
          previews, and post-launch handover · Milestone-based billing (50%
          kickoff / 50% production handover)
        </p>
      </div>
    </section>
  )
}
