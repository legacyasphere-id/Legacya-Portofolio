import { triggerProjectScope } from '../core/identity'

const DIFFERENTIATORS = [
  {
    index: '01.',
    title: 'Direct to the builder',
    description:
      'You talk directly to me from brief to launch. No account managers or agency handoffs.',
  },
  {
    index: '02.',
    title: 'System + visuals in one scope',
    description:
      'Your website or internal tool ships with the product photos and ad reels that promote it.',
  },
  {
    index: '03.',
    title: 'Fast delivery, full ownership',
    description:
      'AI speeds up drafting while I review every detail. You keep all code, files and logins.',
  },
]

export function WhyLegacyaSection() {
  return (
    <section
      id="why-legacya"
      className="border-t border-border bg-bg/95 px-5 py-10 backdrop-blur-sm md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className="mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-2.5">Why Legacya Sphere</p>
            <h2 className="display text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] [text-wrap:balance]">
              Why business owners work with a one-founder studio
            </h2>
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((item, i) => (
            <article
              key={item.index}
              className="card flex flex-col justify-between p-4 sm:p-5"
              data-animate
              data-delay={String(((i % 3) + 1) * 100)}
            >
              <div>
                <span className="font-mono text-[12px] font-semibold text-blue-deep tabular-nums">
                  {item.index}
                </span>
                <h3 className="mt-1.5 text-[1.05rem] font-semibold tracking-[-0.01em] text-text">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13.5px] leading-snug text-muted">
                  {item.description}
                </p>
              </div>
            </article>
          ))}

          {/* 4th Card: Direct Action Callout */}
          <div
            className="flex flex-col justify-between rounded-2xl border border-border bg-[#17181B] p-4 sm:p-5 text-white"
            data-animate
            data-delay="300"
          >
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-accent">
                Next Step
              </span>
              <h3 className="mt-1.5 text-[1.1rem] font-semibold tracking-[-0.01em] text-white">
                Tell me about your business
              </h3>
              <p className="mt-1 text-[13px] leading-snug text-white/75">
                Share your goal and I will reply within 1 business day.
              </p>
            </div>
            <button
              type="button"
              onClick={() => triggerProjectScope({})}
              className="btn-primary mt-3.5 w-full whitespace-nowrap"
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
