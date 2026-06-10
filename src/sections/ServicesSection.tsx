const SERVICES = [
  {
    title: 'Web Systems',
    items: ['Dashboards & internal tools', 'E-commerce platforms', 'POS & operations apps', 'Marketing sites'],
  },
  {
    title: 'Data & Backend',
    items: ['Supabase & PostgreSQL', 'Row-level security', 'Realtime data', 'Auth & role design'],
  },
  {
    title: 'AI Co-Engineering',
    items: ['Claude-assisted builds', 'Workflow automation', 'n8n pipelines', 'AI-assisted operations'],
  },
  {
    title: 'Deploy & Operate',
    items: ['Vercel & CI/CD', 'GitHub workflows', 'Edge & DNS', 'Performance tuning'],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="grad-warm pb-10 pt-32">
      <div className="mb-12 px-5 md:px-[6vw]" data-animate>
        <p className="eyebrow mb-3.5">Services</p>
        <h2 className="text-[clamp(1.9rem,4vw,3rem)]">What we can build for you</h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-px border-y border-border bg-border">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="service-card"
            data-animate
            data-delay={String((i + 1) * 100)}
          >
            <h3 className="mb-4 text-[1.35rem]">{service.title}</h3>
            <ul>
              {service.items.map((item) => (
                <li key={item} className="py-1.5 text-[14px] text-muted">
                  <span className="mr-2.5 text-accent">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
