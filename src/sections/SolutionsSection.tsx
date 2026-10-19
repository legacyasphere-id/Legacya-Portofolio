import {
  triggerCreativeInspect,
  triggerProjectInspect,
  triggerProjectScope,
} from '../core/identity'

interface ServicePillar {
  index: string
  id: string
  title: string
  subtitle: string
  availability: string
  problemAddressed: string
  description: string
  deliverables: string[]
  visualDirection: string
  workTarget: 'digital' | 'creative-ads' | 'creative-video'
  workActionLabel: string
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    index: '01.',
    id: 'digital-systems',
    title: 'Digital Experiences & Business Systems',
    subtitle: 'Websites · Customer Portals · Internal Tools & Automation',
    availability: 'Available Now · Full Studio Execution',
    problemAddressed:
      'Outdated websites that fail to win customer trust, or manual spreadsheets and repetitive tasks that slow down daily operations.',
    description:
      'We create modern websites, customer-facing portals, and connected internal business tools that help your company serve customers more effectively, simplify daily operations, and establish a stronger digital presence.',
    deliverables: [
      'Business websites and company profiles designed for phones, tablets, and computers',
      'Landing pages and customer booking or inquiry experiences',
      'Custom internal tools for inventory, point-of-sale, recruitment, or team operations',
      'Workflow automation and intelligent assistants that reduce repetitive manual work',
    ],
    visualDirection:
      'Clean, structured interfaces with clear navigation, fast performance, and intuitive layouts your team and customers can use effortlessly.',
    workTarget: 'digital',
    workActionLabel: 'Explore Live Digital Systems',
  },
  {
    index: '02.',
    id: 'advertising-assets',
    title: 'Advertising & Campaign Assets',
    subtitle: 'Campaign Imagery · Product Visuals · Creative Direction',
    availability: 'Available Now · Campaign & Brand Creative',
    problemAddressed:
      'Inconsistent promotional graphics and generic product photos that blend into crowded feeds and fail to communicate brand value.',
    description:
      'We develop cohesive visual concepts and campaign-ready creative assets tailored to your brand objectives, connecting visual storytelling, brand identity, and promotional goals so your products stand out.',
    deliverables: [
      'Advertising campaign imagery and key visuals for digital and print placements',
      'High-impact product and promotional visuals crafted around your brand identity',
      'Coordinated social media advertising assets (feed, story, and carousel formats)',
      'Brand campaign concepts and creative direction for product launches and promotions',
    ],
    visualDirection:
      'Editorial lighting, purposeful composition, and disciplined typography that elevate product perception and campaign recall.',
    workTarget: 'creative-ads',
    workActionLabel: 'View Advertising Concepts',
  },
  {
    index: '03.',
    id: 'cinematic-video',
    title: 'Cinematic Video & Visual Production',
    subtitle: 'Promotional Films · Campaign Reels · Visual Storytelling',
    availability: 'Short-Form & Concept Production Available Now · Extended Films Scoped Custom',
    problemAddressed:
      'Difficulty capturing customer attention quickly or explaining the quality and story behind a product through static text and images alone.',
    description:
      'We produce cinematic video assets and visual stories that help brands communicate their value, create stronger first impressions, and showcase products in motion across digital campaigns and social platforms.',
    deliverables: [
      'Cinematic advertising videos and product-focused promotional films (Available Now)',
      'Short-form campaign videos and cinematic social media reels (Available Now)',
      'Visual concepts, storyboards, and motion direction for product launches (Available Now)',
      'Extended narrative brand films and multi-scene storytelling (Custom Scoped / Developing)',
    ],
    visualDirection:
      'Atmospheric lighting, deliberate pacing, and filmic color grading focused on product craft and clear brand messaging.',
    workTarget: 'creative-video',
    workActionLabel: 'View Cinematic Production Studies',
  },
]

export function SolutionsSection() {
  const handleExploreWork = (target: ServicePillar['workTarget']) => {
    if (target === 'digital') {
      triggerProjectInspect('inventory-os')
    } else if (target === 'creative-ads') {
      triggerCreativeInspect('Advertising & Campaign Assets')
    } else {
      triggerCreativeInspect('Cinematic Video & Visual Production')
    }
  }

  return (
    <section
      id="services"
      className="border-t border-border bg-bg/95 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div
          className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">What We Do</p>
            <h2 className="display text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.1] [text-wrap:balance]">
              Three focused ways we help your business grow and operate
            </h2>
          </div>
          <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-muted">
            Engage Legacya Sphere for a single capability, such as a new business
            website, a product launch campaign, or a promotional video, or combine
            them into one cohesive brand and digital rollout.
          </p>
        </div>

        {/* 3 Service Categories */}
        <div className="grid gap-7 lg:grid-cols-3">
          {SERVICE_PILLARS.map((service, idx) => (
            <article
              key={service.id}
              className="card card-hover flex flex-col justify-between p-7 md:p-8"
              data-animate
              data-delay={String((idx + 1) * 100)}
            >
              <div>
                {/* Editorial Index + Availability Metadata (unboxed) */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                  <span className="font-mono text-[13px] font-semibold text-blue-deep tabular-nums">
                    {service.index}
                  </span>
                  <span className="font-mono text-[11px] text-dim">
                    {service.subtitle}
                  </span>
                </div>

                <h3 className="mt-5 text-[clamp(1.3rem,2vw,1.55rem)] font-semibold tracking-[-0.02em] text-text">
                  {service.title}
                </h3>

                <p className="mt-1.5 font-mono text-[11px] text-blue-deep">
                  {service.availability}
                </p>

                <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted">
                  {service.description}
                </p>

                {/* Business Problem Addressed */}
                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                    Business Problem Addressed
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-text">
                    {service.problemAddressed}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                    Example Deliverables
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13.5px] leading-snug text-muted"
                      >
                        <span className="font-mono text-[12px] font-semibold text-blue-deep select-none" aria-hidden="true">
                          &bull;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Direction Note */}
                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                    Visual &amp; Execution Direction
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {service.visualDirection}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={() =>
                    triggerProjectScope({
                      serviceCategory: service.title,
                    })
                  }
                  className="btn-primary w-full py-2.5 text-[13.5px] whitespace-nowrap"
                >
                  Inquire About {service.index.replace('.', '') === '01' ? 'Digital Systems' : service.index.replace('.', '') === '02' ? 'Advertising Assets' : 'Video Production'}
                </button>

                <button
                  type="button"
                  onClick={() => handleExploreWork(service.workTarget)}
                  className="link-sweep mx-auto text-[13px] whitespace-nowrap"
                >
                  {service.workActionLabel}
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
