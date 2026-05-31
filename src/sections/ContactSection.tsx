import { profile } from '../data/profile'

const PROJECT_LABELS: Record<string, string> = {
  operational: 'Operational Software System',
  frontend: 'Frontend UI Development',
  automation: 'AI Automation Workflow',
  other: 'Other / Not sure yet',
}

const BUDGET_LABELS: Record<string, string> = {
  '1500-3000': '$1,500 – $3,000',
  '3000-6000': '$3,000 – $6,000',
  '6000+': '$6,000+',
  open: "Open — let's scope it together",
}

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const honeypot = data.get('website_url') as string
    if (honeypot?.trim()) return

    const name = (data.get('name') as string)?.trim() || 'Anonymous'
    const email = (data.get('email') as string)?.trim()
    const project = PROJECT_LABELS[data.get('project') as string] || (data.get('project') as string)
    const budget = BUDGET_LABELS[data.get('budget') as string] || (data.get('budget') as string)
    const message = (data.get('message') as string)?.trim() || '(no message)'

    const subject = `Project inquiry — ${name} · ${project}`
    const body = `Hello Yoga,\n\nI'd like to discuss a project.\n\n— PROJECT DETAILS —\nName: ${name}\nEmail: ${email}\nProject type: ${project}\nBudget: ${budget}\n\n— MESSAGE —\n${message}\n\n—\nSent via legacyasphere.com`

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="section-divider py-24 sm:py-32" style={{ background: '#0a0a14' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="eyebrow mb-4">06 — Initiate Build</div>

        <div className="mt-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight text-text leading-[1.1]">
              Let's build operational
              <br />systems that scale.
            </h2>
            <p className="mt-5 text-[15px] text-muted leading-relaxed max-w-md">
              Available for selective projects. Startups, scale-ups, and technical founders building internal tools or operational software.
            </p>
            <p className="mt-2 text-[13px] text-dim italic">
              Tersedia untuk proyek pilihan · Bekasi, ID · GMT+7
            </p>

            <div className="mt-10 space-y-4">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-cyan flex-shrink-0 group-hover:border-cyan/30 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 6 12 13 2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-dim">Email</div>
                  <div className="text-[14px] text-text group-hover:text-cyan transition-colors mt-0.5">{profile.email}</div>
                </div>
              </a>

              <a href={profile.github} target="_blank" rel="noopener" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-cyan flex-shrink-0 group-hover:border-cyan/30 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-dim">GitHub</div>
                  <div className="text-[14px] text-text group-hover:text-cyan transition-colors mt-0.5">github.com/legacyasphere-id</div>
                </div>
              </a>

              <a href={profile.linkedin} target="_blank" rel="noopener" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-cyan flex-shrink-0 group-hover:border-cyan/30 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-dim">LinkedIn</div>
                  <div className="text-[14px] text-text group-hover:text-cyan transition-colors mt-0.5">Yoga Pratama Effendi</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-green flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-dim">Availability</div>
                  <div className="text-[14px] text-text mt-0.5 flex items-center gap-2">
                    <span className="status-dot-green animate-pulse" />
                    Available for selective engagements
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="card-base p-6 sm:p-8 space-y-5">
              {/* Honeypot */}
              <div style={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-mono text-[11px] uppercase tracking-wider text-dim mb-2">Your name</label>
                  <input id="name" name="name" type="text" required placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-lg text-[14px] bg-bg border border-border text-text placeholder:text-dim focus:outline-none focus:border-cyan/40 transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[11px] uppercase tracking-wider text-dim mb-2">Email</label>
                  <input id="email" name="email" type="email" required placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 rounded-lg text-[14px] bg-bg border border-border text-text placeholder:text-dim focus:outline-none focus:border-cyan/40 transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block font-mono text-[11px] uppercase tracking-wider text-dim mb-2">Project type</label>
                <select id="project" name="project"
                  className="w-full px-4 py-2.5 rounded-lg text-[14px] bg-bg border border-border text-text focus:outline-none focus:border-cyan/40 transition-colors appearance-none">
                  <option value="operational">Operational Software System</option>
                  <option value="frontend">Frontend UI Development</option>
                  <option value="automation">AI Automation Workflow</option>
                  <option value="other">Other / Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block font-mono text-[11px] uppercase tracking-wider text-dim mb-2">Estimated budget</label>
                <select id="budget" name="budget"
                  className="w-full px-4 py-2.5 rounded-lg text-[14px] bg-bg border border-border text-text focus:outline-none focus:border-cyan/40 transition-colors appearance-none">
                  <option value="1500-3000">$1,500 – $3,000</option>
                  <option value="3000-6000">$3,000 – $6,000</option>
                  <option value="6000+">$6,000+</option>
                  <option value="open">Open — let's scope it together</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-wider text-dim mb-2">Tell me about your system</label>
                <textarea id="message" name="message" rows={5} required
                  placeholder="What are you building? What does it need to do? What's the scale?"
                  className="w-full px-4 py-2.5 rounded-lg text-[14px] bg-bg border border-border text-text placeholder:text-dim focus:outline-none focus:border-cyan/40 transition-colors resize-none" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                <p className="font-mono text-[11px] text-dim">Opens in your email app · No data sent to servers.</p>
                <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
                  Send Inquiry
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
