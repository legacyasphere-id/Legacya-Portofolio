import { triggerProjectScope } from '../core/identity'
import { SERVICE_OPTIONS } from '../core/inquiry'
import { useT } from '../i18n/context'

export function HeroSection() {
  const { t } = useT()

  const needChips = [
    {
      label: t.hero.chips.website,
      serviceCategory: SERVICE_OPTIONS[0].id,
      objective: SERVICE_OPTIONS[0].objectives[0],
    },
    {
      label: t.hero.chips.internalTool,
      serviceCategory: SERVICE_OPTIONS[0].id,
      objective: SERVICE_OPTIONS[0].objectives[1],
    },
    {
      label: t.hero.chips.automation,
      serviceCategory: SERVICE_OPTIONS[0].id,
      objective: SERVICE_OPTIONS[0].objectives[2],
    },
    {
      label: t.hero.chips.visuals,
      serviceCategory: SERVICE_OPTIONS[1].id,
      objective: SERVICE_OPTIONS[1].objectives[0],
    },
  ]

  return (
    <section
      id="hero"
      className="grad-hero relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-5 pb-12 pt-24 sm:pt-28 md:px-10 md:pb-20 md:pt-32"
    >
      {/* Editorial reading veil so dark ink and slate copy maintain WCAG AA contrast
          against the continuous background artwork without hiding the art. */}
      <div
        className="hero-veil pointer-events-none absolute inset-0 z-0 w-full"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto my-auto w-full max-w-[1180px] py-4 sm:py-8">
        <div className="flex w-full flex-col items-center gap-6 text-center sm:items-stretch sm:text-left lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          {/* Left Column: Headline + Lead Copy + Service Chooser Chips */}
          <div className="w-full max-w-[820px]">
            <h1
              className="display mx-auto font-normal leading-[0.98] tracking-[-0.015em] text-text text-[clamp(2.5rem,6.3vw,5.4rem)] [text-wrap:balance] sm:mx-0"
              data-animate
              data-delay="100"
            >
              <span className="block">{t.hero.headlineLine1}</span>
              <span className="block">{t.hero.headlineLine2}</span>
              <span className="block text-blue-deep">
                {t.hero.headlineLine3Prefix}
                <span className="whitespace-nowrap">{t.hero.headlineLine3NoWrap}</span>
                {t.hero.headlineLine3Suffix}
              </span>
            </h1>

            <p
              className="mx-auto mt-4 w-full max-w-[54ch] rounded-xl border border-border/85 bg-surface/90 p-4 text-[16.5px] sm:text-[17.5px] leading-[1.55] text-text shadow-sm backdrop-blur-md sm:mx-0"
              data-animate
              data-delay="200"
            >
              {t.hero.subline}
            </p>

            {/* "What do you need?" Service Chooser Chips */}
            <div
              className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-start"
              data-animate
              data-delay="250"
            >
              <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-muted sm:mr-1">
                {t.hero.needPrompt}
              </span>
              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
                {needChips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() =>
                      triggerProjectScope({
                        serviceCategory: chip.serviceCategory,
                        objective: chip.objective,
                      })
                    }
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border bg-surface/95 px-4 py-2 font-mono text-[12px] font-medium text-text shadow-xs backdrop-blur-sm transition-colors hover:border-blue-deep hover:bg-blue-deep hover:text-white cursor-pointer"
                  >
                    {chip.label} &rarr;
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Action Block */}
          <div
            className="flex w-full flex-col gap-3 rounded-2xl border border-border/85 bg-surface/90 p-5 shadow-sm backdrop-blur-md sm:flex-row sm:items-center lg:w-[280px] lg:shrink-0 lg:flex-col lg:items-stretch"
            data-animate
            data-delay="300"
          >
            <button
              type="button"
              onClick={() => triggerProjectScope({})}
              className="btn-primary btn-lg w-full whitespace-nowrap"
            >
              {t.hero.primaryCta}
            </button>
            <a
              href="#work"
              className="btn-secondary btn-lg w-full bg-bg/70 text-center whitespace-nowrap"
            >
              {t.hero.secondaryCta}
            </a>
            <p className="mt-0.5 text-center font-mono text-[11px] leading-snug text-text/80 lg:text-left">
              {t.hero.locationLine}
            </p>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Studio Capability Strip below the Hero Split */}
      <div
        className="relative z-10 mx-auto mt-6 w-full max-w-[1180px]"
        data-animate
        data-delay="400"
      >
        <div className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {t.hero.pillars.map((item) => (
            <div
              key={item.index}
              className="flex flex-col justify-between bg-surface/95 p-4 sm:p-5 text-left backdrop-blur-md"
            >
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="display font-mono text-[13px] font-bold tracking-tight text-blue-deep tabular-nums">
                    {item.index}
                  </span>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-text">
                    {item.unit}
                  </span>
                </div>
                <p className="mt-1.5 text-[12.5px] sm:text-[13px] leading-snug text-muted">
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
