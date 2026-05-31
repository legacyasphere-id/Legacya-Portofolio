import { roadmap } from '../data/roadmap'
import { Roadmap } from '../components/Roadmap'

export function RoadmapSection() {
  return (
    <section id="roadmap" className="section-divider py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="eyebrow mb-4">05 — System Evolution</div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight leading-[1.1] text-text">
            Live evolution
            <br />system.
          </h2>
          <p className="text-[14px] text-muted max-w-sm lg:text-right">
            Active learning tracks, experimental builds, and planned system extensions — continuously updated.
          </p>
        </div>
        <Roadmap roadmap={roadmap} />
      </div>
    </section>
  )
}
