import { useEffect } from 'react'
import { SiteNav } from './components/SiteNav'
import { SectionGuide } from './components/SectionGuide'
import { HeroSection } from './sections/HeroSection'
import { StudioIntroSection } from './sections/StudioIntroSection'
import { SolutionsSection } from './sections/SolutionsSection'
import { WorkSection } from './sections/WorkSection'
import { CreativeWorkSection } from './sections/CreativeWorkSection'
import { ProcessSection } from './sections/ProcessSection'
import { AIWorkflowSection } from './sections/AIWorkflowSection'
import { WhyLegacyaSection } from './sections/WhyLegacyaSection'
import { FounderSection } from './sections/FounderSection'
import { CTASection } from './sections/CTASection'
import { Footer } from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  useEffect(() => {
    ;(window as unknown as { __spl: boolean }).__spl = true
    const splash = document.getElementById('ls-splash')
    if (!splash) return
    splash.classList.add('hidden')
    const t = setTimeout(() => splash.remove(), 450)
    return () => clearTimeout(t)
  }, [])

  useScrollReveal()

  return (
    <div id="top" className="min-h-screen">
      <SiteNav />
      <SectionGuide />
      <main>
        <HeroSection />
        <StudioIntroSection />
        <SolutionsSection />
        <WorkSection />
        <CreativeWorkSection />
        <ProcessSection />
        <AIWorkflowSection />
        <WhyLegacyaSection />
        <FounderSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
