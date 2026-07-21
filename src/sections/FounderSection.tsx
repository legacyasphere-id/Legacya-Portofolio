import { identity } from '../core/identity'
import { asset } from '../utils/asset'

export function FounderSection() {
  return (
    <section
      id="founder"
      className="border-t border-border bg-bg px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1080px] items-center gap-12 md:grid-cols-[300px_1fr] md:gap-16">
        {/* ── Portrait ───────────────────────────────────────────────────── */}
        <div className="mx-auto w-full max-w-[300px]" data-animate>
          <div className="overflow-hidden rounded-2xl border border-border bg-raised">
            <img
              src={asset('img-04.webp')}
              alt={`${identity.name}, Founder of ${identity.company}`}
              className="aspect-[9/16] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── Bio ────────────────────────────────────────────────────────── */}
        <div>
          <p className="eyebrow mb-5" data-animate>
            Who&rsquo;s behind Legacya Sphere
          </p>

          <h2
            className="display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1]"
            data-animate
            data-delay="100"
          >
            {identity.name}
          </h2>
          <p
            className="mt-2 text-[15px] font-medium text-blue-deep"
            data-animate
            data-delay="100"
          >
            Founder · {identity.company}
          </p>

          <div
            className="mt-6 max-w-[58ch] space-y-4 text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-muted"
            data-animate
            data-delay="200"
          >
            <p>
              I build AI-native business systems for companies that have outgrown
              spreadsheets, turning manual operations into platforms,
              dashboards, and automation that scale.
            </p>
            <p>
              Legacya Sphere is how I do that work: an{' '}
              <span className="font-medium text-text">
                AI-assisted studio building digital infrastructure for business
                legacy.
              </span>{' '}
              Systems designed to outlast the people who set them up.
            </p>
          </div>

          {/* Credibility anchor */}
          <p
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-blue-deep"
            data-animate
            data-delay="250"
          >
            4 systems in production · open to remote engagements · Bekasi &rarr; Global
          </p>

          {/* Meta + links */}
          <div
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
            data-animate
            data-delay="300"
          >
            <span>{identity.location}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{identity.timezone}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{identity.availability}</span>
          </div>

          <div
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
            data-animate
            data-delay="400"
          >
            <a
              href={identity.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep"
            >
              LinkedIn
            </a>
            <a
              href={identity.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep"
            >
              GitHub
            </a>
            <a href={`mailto:${identity.social.email}`} className="link-sweep">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
