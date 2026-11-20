import { triggerProjectScope } from '../core/identity'
import { useT } from '../i18n/context'

export function StudioIntroSection() {
  const { t } = useT()

  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-border bg-surface/85 px-5 py-10 backdrop-blur-sm md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-[720px]" data-animate>
          <p className="eyebrow mb-2.5">{t.about.eyebrow}</p>
          <h2 className="display text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] [text-wrap:balance]">
            {t.about.heading}
          </h2>

          <p className="mt-3.5 text-[16.5px] leading-[1.6] text-muted">
            {t.about.body}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => triggerProjectScope({})}
              className="btn-primary whitespace-nowrap"
            >
              {t.about.primaryCta}
            </button>
            <a
              href="#work"
              className="link-sweep whitespace-nowrap"
            >
              {t.about.secondaryCta}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
