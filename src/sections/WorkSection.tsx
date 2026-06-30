import { work } from '../data/work'

export function WorkSection() {
  return (
    <section id="work" className="pb-20 pt-32">
      <div className="mb-12 px-5 md:px-[6vw]" data-animate>
        <p className="eyebrow mb-3.5">Featured Work</p>
        <h2 className="text-[clamp(1.9rem,4vw,3rem)]">Selected systems, shipped.</h2>
      </div>

      <div className="flex flex-col gap-8 px-5 md:px-[6vw]">
        {work.map((project, i) => (
          <article
            key={project.id}
            className="deck-card grid min-h-[420px] md:sticky md:grid-cols-[1.35fr_1fr] max-md:min-h-0"
            style={{ top: `calc(96px + ${i * 14}px)` }}
            data-animate
          >
            <div
              className="relative min-h-[200px] overflow-hidden bg-navy-deep md:min-h-[260px]"
              style={project.gradient ? { background: project.gradient } : undefined}
            >
              {project.image ? (
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <span
                  className="font-display absolute bottom-6 right-7 text-[clamp(3rem,8vw,5rem)] leading-none text-white/10"
                  aria-hidden="true"
                >
                  {project.name.split(' ')[0]}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/30 via-transparent to-transparent" />
              <span className="font-soft-italic absolute left-7 top-6 text-lg text-bg drop-shadow-[0_1px_3px_rgba(28,26,23,0.6)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute right-6 top-6 rounded-full bg-bg/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-navy">
                {project.status === 'live' ? 'Live' : 'In development'}
              </span>
            </div>

            <div className="flex flex-col justify-center gap-3 p-7 md:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {project.type}
              </p>
              <h3 className="text-[clamp(1.6rem,3vw,2.4rem)]">{project.name}</h3>
              <p className="max-w-[40ch] text-muted">{project.summary}</p>
              <p className="mt-1 font-mono text-[11px] text-navy-soft">{project.stack}</p>
              <div className="mt-3 flex flex-wrap items-center gap-5">
                {project.live && (
                  <a
                    className="link-sweep"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View live project
                  </a>
                )}
                <a
                  className="link-sweep text-muted"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
