import { projects } from '../data/projects'

const OVERVIEW: Record<string, string> = {
  'inventory-os':
    'A mini-ERP that gives warehouse teams real-time control over stock, movements, and reorder decisions.',
  'legacya-pos':
    'A unified restaurant operations platform covering cashier, kitchen, and revenue analytics.',
  'hybrid-dashboard':
    'A zero-backend studio operations dashboard — revenue, tasks, and projects on one screen.',
  daenuna:
    'A structured e-commerce catalog and order flow for a high-repeat artisan brand.',
}

const SOLUTION: Record<string, string> = {
  'inventory-os':
    'A centralized platform with role-based access, real-time stock tracking, and an alert system — built on a database designed to prevent inventory errors at the source.',
  'legacya-pos':
    'One platform unifying order intake, a live kitchen display, and a revenue analytics layer, so the whole operation works from a single real-time view.',
  'hybrid-dashboard':
    'A single-screen operational dashboard with live revenue charts, a persistent task manager, and a project tracker — fully owned, with zero SaaS cost.',
  daenuna:
    'A guided catalog flow that routes completed orders straight into the brand\'s existing channel, replacing chaotic DMs with structured, trackable orders.',
}

const STATUS_LABEL: Record<string, string> = {
  live: 'Production',
  'in-progress': 'Active Development',
  archived: 'Archived',
}

export function WorkSection() {
  return (
    <section id="work" className="border-t border-border px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-14 max-w-[46ch]" data-animate>
          <p className="eyebrow mb-4">Featured Work</p>
          <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08]">
            Systems in production
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
            Real platforms built for real operations. Each one replaced manual
            work with a system the business now runs on.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="card overflow-hidden lg:grid lg:grid-cols-[1.1fr_1.4fr]"
              data-animate
              data-delay="100"
            >
              {/* Visual */}
              <div className="relative min-h-[220px] overflow-hidden bg-raised lg:min-h-full">
                {project.screenshots[0] && (
                  <img
                    src={project.screenshots[0].src}
                    alt={project.screenshots[0].alt}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-deep/25 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2.5">
                  <span className="rounded-md bg-bg/90 px-2 py-1 font-mono text-[11px] font-medium text-blue-deep backdrop-blur">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`badge ${
                      project.status === 'live' ? 'badge-production' : 'badge-active'
                    }`}
                  >
                    <span className="badge-dot" />
                    {STATUS_LABEL[project.status] ?? project.status}
                  </span>
                </div>
              </div>

              {/* Case study */}
              <div className="flex flex-col gap-5 p-7 md:p-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue">
                    {project.type}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.02em]">
                    {project.name}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                    {OVERVIEW[project.id] ?? project.tagline}
                  </p>
                </div>

                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                      Problem
                    </dt>
                    <dd className="text-[13.5px] leading-relaxed text-muted">
                      {project.caseStudy.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                      Solution
                    </dt>
                    <dd className="text-[13.5px] leading-relaxed text-muted">
                      {SOLUTION[project.id] ?? project.caseStudy.technicalExecution}
                    </dd>
                  </div>
                </dl>

                <div className="rounded-xl border border-blue/25 bg-blue/[0.05] p-4">
                  <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-deep">
                    Outcome
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-text">
                    {project.caseStudy.outcome}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.links.live && (
                  <a
                    className="link-sweep mt-1"
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View live system
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
