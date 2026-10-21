import { triggerProjectScope } from '../core/identity'

const DIFFERENTIATORS = [
  {
    index: '01.',
    title: 'One Partner for Connected Creative & Digital Needs',
    description:
      'Your website, internal tools, advertising visuals and promotional videos come from one focused partner with one consistent vision, without the overhead of a large agency or the disconnect of managing separate freelancers.',
  },
  {
    index: '02.',
    title: 'Solutions Shaped Around Your Business Objective',
    description:
      'I do not force your company into a rigid template. Every website layout, operational workflow, or campaign visual is tailored to solve a real goal for your business and customers.',
  },
  {
    index: '03.',
    title: 'Thoughtful Visual Direction & Practical Execution',
    description:
      'I pair strong editorial design and visual storytelling with dependable digital execution, so your brand looks credible on the outside and works smoothly behind the scenes.',
  },
  {
    index: '04.',
    title: 'Flexible Collaboration Appropriate to Your Scope',
    description:
      'Start with a focused project, such as a company website refresh, a launch campaign asset kit, or a single workflow tool, and expand only when your business is ready.',
  },
  {
    index: '05.',
    title: 'Direct Communication & Complete Ownership',
    description:
      'You collaborate directly with the studio founder from initial discovery to final handover, and you retain full ownership of all agreed digital platforms and creative assets delivered.',
  },
]

export function WhyLegacyaSection() {
  return (
    <section
      id="why-legacya"
      className="border-t border-border bg-bg/95 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div
          className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">Why Legacya Sphere</p>
            <h2 className="display text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.1] [text-wrap:balance]">
              Practical advantages of working with a unified creative and digital studio
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            I focus on clarity, craftsmanship, and business relevance, helping
            companies move forward with confidence without unnecessary complexity.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((item, i) => (
            <article
              key={item.index}
              className="card flex flex-col justify-between p-7"
              data-animate
              data-delay={String(((i % 3) + 1) * 100)}
            >
              <div>
                <span className="font-mono text-[12.5px] font-semibold text-blue-deep tabular-nums">
                  {item.index}
                </span>
                <h3 className="mt-3 text-[1.2rem] font-semibold tracking-[-0.01em] text-text">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </article>
          ))}

          {/* 6th Card: Direct Action Callout */}
          <div
            className="flex flex-col justify-between rounded-2xl border border-border bg-[#17181B] p-7 text-white"
            data-animate
            data-delay="300"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-accent">
                Ready When You Are
              </span>
              <h3 className="mt-3 text-[1.25rem] font-semibold tracking-[-0.01em] text-white">
                Not sure where to begin?
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/75">
                Share your business goal or current challenge, whether it involves
                your website, internal operations, or upcoming campaign visuals, and
                I will recommend a clear, practical starting point.
              </p>
            </div>
            <button
              type="button"
              onClick={() => triggerProjectScope({})}
              className="btn-primary mt-6 w-full whitespace-nowrap"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
