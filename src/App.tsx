import { useEffect } from 'react'
import { SiteNav } from './components/SiteNav'
import { SectionGuide } from './components/SectionGuide'
import { HeroSection } from './sections/HeroSection'
import { StudioIntroSection } from './sections/StudioIntroSection'
import { SolutionsSection } from './sections/SolutionsSection'
import { WorkPage, WorkSection } from './sections/WorkSection'
import { ProcessSection } from './sections/ProcessSection'
import { AIWorkflowSection } from './sections/AIWorkflowSection'
import { WhyLegacyaSection } from './sections/WhyLegacyaSection'
import { FounderSection } from './sections/FounderSection'
import { CTASection } from './sections/CTASection'
import { Footer } from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useRoute } from './core/router'
import { useT } from './i18n/context'

export default function App() {
  const routeState = useRoute()
  const { lang, t } = useT()

  useEffect(() => {
    ;(window as unknown as { __spl: boolean }).__spl = true
    const splash = document.getElementById('ls-splash')
    if (!splash) return
    splash.classList.add('hidden')
    const tId = setTimeout(() => splash.remove(), 450)
    return () => clearTimeout(tId)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title =
      routeState.route === '/work' ? t.meta.workTitle : t.meta.title
  }, [lang, t, routeState.route])

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scrollBehavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth'

    if (routeState.navType === 'push' || routeState.navType === 'pop') {
      const h1 = document.querySelector<HTMLElement>('main h1')
      h1?.focus({ preventScroll: true })
    }

    if (
      routeState.navType === 'pop' &&
      typeof routeState.savedScrollY === 'number' &&
      !routeState.hash
    ) {
      const targetY = routeState.savedScrollY
      window.scrollTo({
        top: targetY,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      })
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: targetY,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        })
      })
      return
    }

    if (routeState.hash) {
      if (routeState.hash === '#top') {
        window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior })
        return
      }
      const targetId = routeState.hash.slice(1)
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
      }
      return
    }

    if (routeState.route === '/work' && routeState.search) {
      const params = new URLSearchParams(routeState.search)
      if (params.get('project')) {
        document
          .getElementById('work-panel')
          ?.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
        return
      }
      if (params.get('creative')) {
        document
          .getElementById('creative-work')
          ?.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
        return
      }
      if (params.get('motion')) {
        document
          .getElementById('motion-work')
          ?.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
        return
      }
    }

    if (routeState.navType !== 'initial') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      })
    }
  }, [routeState])

  useScrollReveal()

  return (
    <div id="top" className="min-h-screen">
      <SiteNav />
      <SectionGuide />
      <main>
        {routeState.route === '/work' ? (
          <WorkPage />
        ) : (
          <>
            <HeroSection />
            <StudioIntroSection />
            <SolutionsSection />
            <WorkSection />
            <ProcessSection />
            <AIWorkflowSection />
            <WhyLegacyaSection />
            <FounderSection />
            <CTASection />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
