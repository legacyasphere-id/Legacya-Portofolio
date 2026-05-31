import { projects } from '../data/projects'
import { OSStatus } from '../components/OSStatus'
import { Projects } from '../components/Projects'
import { founderOS } from '../core/founder-os'

export function ProjectsSection() {
  return (
    <>
      {/* OS Snapshot */}
      <section id="os-status" className="section-divider py-24 sm:py-32" style={{ background: '#0a0a14' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="eyebrow mb-4">02 — OS Snapshot</div>
          <div className="flex items-end justify-between gap-4 mb-10">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight leading-[1.1] text-text">
              System Status
            </h2>
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-green">
              <span className="status-dot-green animate-pulse" />
              All systems operational
            </div>
          </div>
          <OSStatus snapshot={founderOS.snapshot} />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section-divider py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="eyebrow mb-4">03 — Built Systems</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight leading-[1.1] text-text">
              Operational software,
              <br />shipped to production.
            </h2>
            <a href="https://github.com/legacyasphere-id" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[13px] text-dim hover:text-cyan transition-colors">
              All projects on GitHub →
            </a>
          </div>
          <Projects projects={projects} />
        </div>
      </section>
    </>
  )
}
