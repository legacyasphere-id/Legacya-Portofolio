import { triggerProjectInspect, triggerProjectScope } from '../core/identity'

interface SolutionPillar {
  index: string
  title: string
  subtitle: string
  replaces: string
  description: string
  deliverables: string[]
  referenceProjectId: string
  referenceName: string
  recommendedTier: string
  spanClass: string
}

const SOLUTIONS: SolutionPillar[] = [
  {
    index: '01.',
    title: 'Custom Operations OS & Mini-ERPs',
    subtitle: 'Centralized Internal Platforms · Multi-Role Access',
    replaces: 'Fragmented Excel/Google Sheets, manual stock counts & WhatsApp approvals',
    description:
      'Purpose-built operational platforms that unify inventory, purchasing, supplier workflows, and team permissions into one database-enforced source of truth.',
    deliverables: [
      'Transactional PostgreSQL schema with atomic stock & order ledgers',
      'Role-Based Access Control (Admin, Manager, Operator, Finance)',
      'Automated low-stock alerts, purchase order lifecycles & KPI dashboards',
    ],
    referenceProjectId: 'inventory-os',
    referenceName: 'InventoryOS (Warehouse ERP)',
    recommendedTier: 'Custom Operations OS',
    spanClass: 'lg:col-span-7',
  },
  {
    index: '02.',
    title: 'Deterministic AI & Document Pipelines',
    subtitle: 'Structured Extraction · Auditable Scoring Engines',
    replaces: 'Manual CV/document screening, subjective evaluations & copy-paste data entry',
    description:
      'We separate LLM extraction from business judgment: AI turns messy PDFs and documents into structured fields, while a fixed, auditable formula computes rankings and decisions.',
    deliverables: [
      'Schema-bound Gemini / Claude extraction pipelines via Edge Functions',
      'Deterministic, bias-auditable weighted scoring rubrics',
      'Visual radar comparisons, explainability logs & CSV/JSON export',
    ],
    referenceProjectId: 'ai-cv-screening',
    referenceName: 'Allure AI Talent Engine',
    recommendedTier: 'AI Workflow & Automation',
    spanClass: 'lg:col-span-5',
  },
  {
    index: '03.',
    title: 'AI Customer Portals & Lead Engines',
    subtitle: '24/7 RAG Assistants · Automated Intake Routing',
    replaces: 'Missed after-hours inquiries, slow front-desk replies & manual lead tracking',
    description:
      'High-converting web portals equipped with bilingual RAG assistants grounded strictly on your company knowledge base—capturing leads and dispatching instant staff notifications.',
    deliverables: [
      'GPT-4o / Claude RAG assistant trained on your verified documents & pricing',
      'Dual-path lead capture (conversational + structured booking forms)',
      'Automated Make.com / n8n → Gmail, WhatsApp & CRM webhook pipelines',
    ],
    referenceProjectId: 'brightpath-dental',
    referenceName: 'BrightPath Patient & Lead OS',
    recommendedTier: 'AI Workflow & Automation',
    spanClass: 'lg:col-span-5',
  },
  {
    index: '04.',
    title: 'Real-Time POS & Field Execution Systems',
    subtitle: 'Live WebSockets · Synchronized Multi-Screen Workflows',
    replaces: 'Paper kitchen tickets, disconnected cashier registers & delayed daily reports',
    description:
      'Low-latency operational workspaces where front-of-house intake, production queues, and executive revenue analytics stay synchronized in real time without page refreshes.',
    deliverables: [
      'Synchronized Cashier, Kitchen/Production Display & Owner personas',
      'Supabase Realtime WebSocket queues with split payment/fulfillment states',
      'Database-level Row-Level Security (RLS) & live revenue telemetry',
    ],
    referenceProjectId: 'legacya-pos',
    referenceName: 'Legacya POS & Kitchen OS',
    recommendedTier: 'Custom Operations OS',
    spanClass: 'lg:col-span-7',
  },
]

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="border-t border-border bg-bg/95 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end" data-animate>
          <div className="max-w-[54ch]">
            <p className="eyebrow mb-4">Solutions &amp; Capabilities</p>
            <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] [text-wrap:balance]">
              What we architect and ship for your business
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            Every engagement replaces a specific operational bottleneck with
            production infrastructure—backed by a live reference architecture you
            can inspect today.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {SOLUTIONS.map((sol, idx) => (
            <article
              key={sol.index}
              className={`card card-hover flex flex-col justify-between p-7 md:p-9 ${sol.spanClass}`}
              data-animate
              data-delay={String(((idx % 3) + 1) * 100)}
            >
              <div>
                {/* Clean unboxed editorial numbering + metadata line */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                  <span className="font-mono text-[13px] font-semibold text-blue-deep tabular-nums">
                    {sol.index}
                  </span>
                  <span className="font-mono text-[11px] text-dim">
                    {sol.subtitle}
                  </span>
                </div>

                <h3 className="mt-5 text-[clamp(1.35rem,2.2vw,1.7rem)] font-semibold tracking-[-0.02em] text-text">
                  {sol.title}
                </h3>

                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {sol.description}
                </p>

                {/* What it replaces */}
                <div className="mt-5 rounded-xl border border-border bg-raised/60 px-4 py-3">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                    Replaces Manual Bottleneck
                  </p>
                  <p className="mt-1 text-[13.5px] font-medium text-text">
                    {sol.replaces}
                  </p>
                </div>

                {/* Deliverables list */}
                <ul className="mt-5 space-y-2.5">
                  {sol.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13.5px] leading-snug text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-deep" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Footer: Inspect Reference vs Scope This Solution */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={() => triggerProjectInspect(sol.referenceProjectId)}
                  className="link-sweep text-left text-[13.5px] whitespace-nowrap"
                >
                  Inspect Reference: {sol.referenceName}
                  <span aria-hidden="true">&rarr;</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    triggerProjectScope({
                      tier: sol.recommendedTier,
                      systemType: sol.title,
                      bottleneck: sol.replaces,
                      projectReference: sol.referenceName,
                    })
                  }
                  className="btn-secondary px-4 py-2 text-[13px] whitespace-nowrap"
                >
                  Scope This Solution
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
