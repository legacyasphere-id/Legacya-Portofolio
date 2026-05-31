import { AIFlow } from '../components/AIFlow'

export function FlowSection() {
  return (
    <section id="ai-flow" className="section-divider py-24 sm:py-32" style={{ background: '#0a0a14' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="eyebrow mb-4">04 — AI Build Flow</div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight leading-[1.1] text-text">
            AI is wired into
            <br />
            <span className="text-gradient-cyan">every stage.</span>
          </h2>
          <p className="text-[14px] text-muted max-w-sm lg:text-right">
            Not just code generation. Architecture, review, and iteration — AI as a co-engineer at every step.
          </p>
        </div>
        <AIFlow />
      </div>
    </section>
  )
}
