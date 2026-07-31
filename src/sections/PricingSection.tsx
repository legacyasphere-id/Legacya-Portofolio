import { useRef } from 'react'

interface Plan {
  name: string
  target: string
  price: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    target: 'UMKM & Small Businesses',
    price: 'Rp500.000',
    features: [
      'Landing Page',
      'Company Profile',
      'Google Sheets Database',
      'WhatsApp Integration',
      'Responsive Design',
    ],
    cta: 'Start a project',
  },
  {
    name: 'Business',
    target: 'Growing SMEs',
    price: 'Rp2.500.000',
    features: [
      'WordPress CMS',
      'SEO Ready',
      'Multi-page Website',
      'Contact Form',
      'Premium UI',
      'Easy Content Management',
    ],
    cta: 'Start a project',
    featured: true,
    badge: '★ Most Popular',
  },
  {
    name: 'Enterprise',
    target: 'Companies & Startups',
    price: 'Rp10.000.000',
    features: [
      'Custom Laravel/Vue App',
      'Dashboard',
      'API Integration',
      'AI Automation',
      'Database',
      'Maintenance',
    ],
    cta: 'Let’s talk',
  },
]

function Check({ featured }: { featured?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-white' : 'text-blue-deep'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  )
}

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const raf = useRef(0)

  // Mouse spotlight: write pointer position into CSS vars, throttled to a frame.
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const x = e.clientX
    const y = e.clientY
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${x - r.left}px`)
      el.style.setProperty('--my', `${y - r.top}px`)
    })
  }

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}
      data-animate
      data-delay={String((index + 1) * 100)}
    >
      <div className="relative z-10 flex h-full flex-col">
        {plan.badge && <span className="pricing-badge">{plan.badge}</span>}

        <p
          className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
            plan.featured ? 'text-white/70' : 'text-muted'
          }`}
        >
          {plan.target}
        </p>
        <h3
          className={`mt-2 text-[1.65rem] font-bold tracking-[-0.02em] ${
            plan.featured ? 'text-white' : 'text-text'
          }`}
        >
          {plan.name}
        </h3>

        <div className="mt-5 flex items-end gap-1.5">
          <span
            className={`text-[2rem] font-extrabold tracking-tight ${
              plan.featured ? 'text-white' : 'text-blue-deep'
            }`}
          >
            {plan.price}
          </span>
          <span
            className={`mb-1.5 text-[13px] ${
              plan.featured ? 'text-white/70' : 'text-muted'
            }`}
          >
            /service
          </span>
        </div>
        <p
          className={`mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
            plan.featured ? 'text-white/50' : 'text-dim'
          }`}
        >
          Starting from
        </p>

        <ul
          className={`mt-6 flex flex-1 flex-col gap-3 border-t pt-6 ${
            plan.featured ? 'border-white/20' : 'border-border'
          }`}
        >
          {plan.features.map((f) => (
            <li
              key={f}
              className={`flex gap-2.5 text-[14px] leading-snug ${
                plan.featured ? 'text-white/85' : 'text-muted'
              }`}
            >
              <Check featured={plan.featured} />
              {f}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={`pricing-cta mt-7 ${
            plan.featured ? 'pricing-cta--light' : 'pricing-cta--gradient'
          }`}
        >
          {plan.cta}
        </a>
      </div>
    </article>
  )
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="border-t border-border bg-surface/50 px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-14 max-w-[48ch] text-center" data-animate>
          <p className="eyebrow mb-4">Pricing</p>
          <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08]">
            Find the right build
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-[1.05rem] leading-relaxed text-muted">
            Transparent starting prices, per service. Pick a tier, or get a
            custom quote for anything bigger.
          </p>
        </div>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <p
          className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-dim"
          data-animate
          data-delay="200"
        >
          Prices in IDR · add-ons and AI integration available
        </p>
      </div>
    </section>
  )
}
