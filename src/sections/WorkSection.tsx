import { projects } from '../data/projects'

const SHORT_LINES: Record<string, string> = {
  'inventory-os':
    'Real-time stock tracking that replaced manual spreadsheets for warehouse teams.',
  'legacya-pos':
    'Cashier, kitchen display, and revenue analytics unified in one platform.',
  'hybrid-dashboard':
    'A zero-backend operations dashboard — revenue, tasks, and projects on one screen.',
  daenuna:
    'A guided catalog flow that turned Instagram DM chaos into structured orders.',
}

export function WorkSection() {
  return (
    <section id="work" className="pb-20 pt-32">
      <div className="mb-12 px-5 md:px-[6vw]" data-animate>
        <p className="eyebrow mb-3.5">Featured Work</p>
        <h2 className="text-[clamp(1.9rem,4vw,3rem)]">Selected systems, shipped.</h2>
      </div>

      <div className="flex flex-col gap-8 px-5 md:px-[6vw]">
        {projects.map((project, i) => (
          <article
            key={project.id}
            className="deck-card grid min-h-[420px] md:sticky md:grid-cols-[1.35fr_1fr] max-md:min-h-0"
            style={{ top: `calc(96px + ${i * 14}px)` }}
          >
            <div className="relative min-h-[200px] overflow-hidden bg-raised md:min-h-[260px]">
              {project.screenshots[0] && (
                <img
                  src={project.screenshots[0].src}
                  alt={project.screenshots[0].alt}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/20 via-transparent to-transparent" />
              <span className="font-soft-italic absolute left-7 top-6 text-lg text-bg drop-shadow-[0_1px_3px_rgba(28,26,23,0.6)]">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-col justify-center gap-3.5 p-7 md:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {project.type}
              </p>
              <h3 className="text-[clamp(1.6rem,3vw,2.4rem)]">{project.name}</h3>
              <p className="max-w-[36ch] text-muted">
                {SHORT_LINES[project.id] ?? project.tagline}
              </p>
              {project.links.live && (
                <a
                  className="link-sweep mt-2.5"
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View live project
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
