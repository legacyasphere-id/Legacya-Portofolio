import { founderOS } from '../core/founder-os'
import { FounderOS } from '../components/FounderOS'

export function OSSection() {
  return (
    <section id="founder-os" className="section-divider py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="eyebrow mb-4">01 — Founder OS</div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight leading-[1.1] text-text max-w-xl">
            Not a portfolio.{' '}
            <span className="text-gradient-cyan">A system.</span>
          </h2>
          <p className="text-[14px] text-muted max-w-md lg:text-right">
            {founderOS.tagline}
          </p>
        </div>
        <FounderOS principles={founderOS.principles} workflow={founderOS.workflow} />
      </div>
    </section>
  )
}
