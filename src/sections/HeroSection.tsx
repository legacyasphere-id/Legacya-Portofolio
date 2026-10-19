import { triggerProjectScope } from '../core/identity'

const STUDIO_PILLARS = [
  {
    index: '01.',
    unit: 'Digital Experiences & Systems',
    detail:
      'Modern business websites, customer portals, and custom operational tools that simplify how your team works every day.',
  },
  {
    index: '02.',
    unit: 'Advertising & Campaign Assets',
    detail:
      'Campaign key visuals, product imagery, and promotional creative direction tailored to your brand and launch goals.',
  },
  {
    index: '03.',
    unit: 'Cinematic Video & Production',
    detail:
      'Cinematic promotional videos, short-form campaign reels, and visual storytelling designed to create lasting brand impressions.',
  },
  {
    index: '04.',
    unit: 'Direct Studio Partnership',
    detail:
      'One focused partner connecting your brand visuals and digital execution without the overhead of a large agency.',
  },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="grad-hero relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-5 pb-16 pt-28 sm:pt-32 md:px-10 md:pb-24 md:pt-36"
    >
      {/* Editorial reading veil so dark ink and slate copy maintain WCAG AA contrast
          against the continuous background artwork without hiding the art. */}
      <div
        className="hero-veil pointer-events-none absolute inset-0 z-0 w-full"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto my-auto w-full max-w-[1180px] py-6 sm:py-10">
        <div className="flex w-full flex-col items-center gap-8 text-center sm:items-stretch sm:text-left lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          {/* Left Column: Headline + Lead Copy */}
          <div className="w-full max-w-[750px]">
            <h1
              className="display mx-auto font-extrabold leading-[1.08] tracking-[-0.03em] text-text text-[clamp(2.15rem,6.5vw,3.9rem)] [text-wrap:balance] sm:mx-0"
              data-animate
              data-delay="100"
            >
              Building Brands. Creating Experiences.{' '}
              <span className="text-blue-deep">Shaping What&rsquo;s Next.</span>
            </h1>

            <p
              className="mx-auto mt-6 w-full max-w-[64ch] rounded-xl border border-border/85 bg-surface/90 p-5 text-[clamp(0.98rem,1.35vw,1.15rem)] leading-[1.68] text-text shadow-sm backdrop-blur-md sm:mx-0"
              data-animate
              data-delay="200"
            >
              Legacya Sphere is a creative and digital studio that helps businesses
              strengthen their presence, serve customers more effectively, and tell
              compelling visual stories through modern websites, connected
              business systems, advertising campaign visuals, and cinematic video
              production.
            </p>
          </div>

          {/* Right Column: Action Block */}
          <div
            className="flex w-full flex-col gap-3.5 rounded-2xl border border-border/85 bg-surface/90 p-5 shadow-sm backdrop-blur-md sm:flex-row sm:items-center lg:w-[290px] lg:shrink-0 lg:flex-col lg:items-stretch"
            data-animate
            data-delay="300"
          >
            <button
              type="button"
              onClick={() => triggerProjectScope({})}
              className="btn-primary btn-lg w-full whitespace-nowrap"
            >
              Start Your Project
            </button>
            <a
              href="#work"
              className="btn-secondary btn-lg w-full bg-bg/70 text-center whitespace-nowrap"
            >
              Explore Our Work
            </a>
            <p className="mt-0.5 text-center font-mono text-[11px] leading-snug text-text/80 lg:text-left">
              Founder-led execution · Tailored to your business goals
            </p>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Studio Capability Strip below the Hero Split */}
      <div
        className="relative z-10 mx-auto mt-8 w-full max-w-[1180px]"
        data-animate
        data-delay="400"
      >
        <div className="grid w-full gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STUDIO_PILLARS.map((item) => (
            <div
              key={item.unit}
              className="flex flex-col justify-between bg-surface/95 p-6 text-left backdrop-blur-md"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="display font-mono text-[14px] font-bold tracking-tight text-blue-deep tabular-nums">
                    {item.index}
                  </span>
                  <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-text">
                    {item.unit}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
