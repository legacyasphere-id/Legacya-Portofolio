const METRICS = [
  {
    value: '4',
    label: 'Production Systems Live',
    context: 'Full-stack ERP, AI Screening, Healthcare RAG & POS',
  },
  {
    value: '-80%',
    label: 'Payload Optimization',
    context: '829 KB → 162 KB initial JS bundle on InventoryOS',
  },
  {
    value: '100%',
    label: 'Deterministic Ranking',
    context: 'Zero hallucination drift in candidate & ops scoring',
  },
  {
    value: '4',
    label: 'Industries Equipped',
    context: 'Logistics, HR Tech, Healthcare & Food Service',
  },
]

const STANDARDS = [
  {
    index: '01.',
    title: 'Deterministic AI Boundaries',
    description:
      'We never let an LLM guess a financial number or hiring score. Models handle unstructured extraction and natural language RAG; deterministic code enforces rules and calculations.',
  },
  {
    index: '02.',
    title: 'Database-First Integrity & RLS',
    description:
      'Every platform is modeled from the PostgreSQL schema outward—using atomic transactions and Row-Level Security (RLS) so multi-role permissions hold even if the UI is bypassed.',
  },
  {
    index: '03.',
    title: 'Full Code & Infrastructure Ownership',
    description:
      'No proprietary low-code lock-in or per-seat SaaS tax. You receive clean TypeScript/React/Supabase repositories deployed on your own cloud accounts.',
  },
  {
    index: '04.',
    title: 'Production CI/CD From Day One',
    description:
      'Automated GitHub Actions pipelines, strict TypeScript compilation, and edge-ready deployments ensure your team can rely on the system in daily operations immediately.',
  },
]

export function ProofSection() {
  return (
    <section
      id="proof"
      className="border-t border-border bg-bg/95 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end" data-animate>
          <div className="max-w-[48ch]">
            <p className="eyebrow mb-4">Engineering Proof &amp; Studio Standards</p>
            <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] [text-wrap:balance]">
              Running in production, not just in pitch decks.
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            Every system we deliver adheres to four non-negotiable architectural
            standards—giving your business enterprise-grade reliability without
            agency bloat.
          </p>
        </div>

        {/* High-Contrast Dark Metrics Band */}
        <div
          className="overflow-hidden rounded-2xl bg-[#17181B] px-6 py-12 md:px-10 md:py-16"
          data-animate
        >
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="flex flex-col justify-between border-b border-white/10 pb-6 sm:border-b-0 sm:pb-0 lg:border-r lg:pr-6 last:border-r-0 last:pr-0"
              >
                <div>
                  <span className="display block font-mono font-extrabold leading-none text-blue-accent text-[clamp(2.6rem,5vw,3.8rem)] tabular-nums">
                    {m.value}
                  </span>
                  <span className="mt-3 block font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-white">
                    {m.label}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#9CA3AF]">
                  {m.context}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Architecture Guarantees */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STANDARDS.map((std, i) => (
            <article
              key={std.index}
              className="card flex flex-col justify-between p-6 md:p-7"
              data-animate
              data-delay={String((i + 1) * 100)}
            >
              <div>
                <span className="font-mono text-[12px] font-semibold text-blue-deep tabular-nums">
                  {std.index}
                </span>
                <h3 className="mt-3 text-[1.15rem] font-semibold tracking-[-0.01em] text-text">
                  {std.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  {std.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
