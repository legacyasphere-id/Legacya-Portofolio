import { roadmap } from '../data/roadmap'
import { profile } from '../data/profile'
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

        {/* Verified Credentials */}
        {profile.credentials.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-cyan flex-shrink-0" />
              Verified Credentials
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.credentials.map((cred) => (
                <div key={cred.id} className="card-base p-5 flex gap-4">
                  {/* Issuer badge */}
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-cyan">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-[14px] font-semibold text-text leading-tight">{cred.title}</h3>
                      <span className="font-mono text-[10px] text-dim flex-shrink-0">{cred.date}</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-cyan mb-2">{cred.issuer}</div>
                    <p className="text-[12px] text-muted leading-relaxed mb-3">{cred.description}</p>

                    <div className="flex items-center gap-3">
                      {cred.pdfUrl && (
                        <a
                          href={cred.pdfUrl}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan hover:text-text transition-colors"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                          Certificate
                        </a>
                      )}
                      {cred.imageUrl && (
                        <a
                          href={cred.imageUrl}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-cyan transition-colors"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          Preview
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
