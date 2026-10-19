import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  SERVICE_OPTIONS,
  getObjectivesForService,
  resolveServiceLabel,
  validateInquiryInput,
  composeInquiryBrief,
} from './inquiry.ts'

test('SERVICE_OPTIONS includes all three core studio capabilities plus combined engagement', () => {
  const labels = SERVICE_OPTIONS.map((s) => s.label)
  assert.ok(labels.includes('Digital Experiences & Business Systems'))
  assert.ok(labels.includes('Advertising & Campaign Assets'))
  assert.ok(labels.includes('Cinematic Video & Visual Production'))
  assert.equal(SERVICE_OPTIONS.length, 4)
})

test('getObjectivesForService returns tailored objectives for each service category', () => {
  const adObjectives = getObjectivesForService('Advertising & Campaign Assets')
  assert.ok(adObjectives.length >= 3)
  assert.ok(adObjectives.some((o) => o.toLowerCase().includes('campaign')))

  const videoObjectives = getObjectivesForService('cinematic-video')
  assert.ok(videoObjectives.length >= 3)
  assert.ok(videoObjectives.some((o) => o.toLowerCase().includes('cinematic')))

  const digitalObjectives = getObjectivesForService('Digital Experiences & Business Systems')
  assert.ok(digitalObjectives.length >= 3)
  assert.ok(digitalObjectives.some((o) => o.toLowerCase().includes('website')))
})

test('resolveServiceLabel normalizes IDs and short labels to canonical service titles', () => {
  assert.equal(resolveServiceLabel('advertising-assets'), 'Advertising & Campaign Assets')
  assert.equal(resolveServiceLabel('cinematic-video'), 'Cinematic Video & Visual Production')
  assert.equal(resolveServiceLabel('digital-systems'), 'Digital Experiences & Business Systems')
  assert.equal(resolveServiceLabel('unknown-id'), 'Digital Experiences & Business Systems')
})

test('validateInquiryInput enforces name and valid email or phone/WhatsApp format', () => {
  assert.equal(validateInquiryInput({ name: '   ', contactInfo: 'budi@company.com' }).valid, false)
  assert.equal(validateInquiryInput({ name: 'Budi', contactInfo: '' }).valid, false)
  assert.equal(validateInquiryInput({ name: 'Budi', contactInfo: 'invalid-contact' }).valid, false)

  assert.equal(validateInquiryInput({ name: 'Budi Santoso', contactInfo: 'budi@company.co.id' }).valid, true)
  assert.equal(validateInquiryInput({ name: 'Budi Santoso', contactInfo: '+62 812-3456-7890' }).valid, true)
})

test('composeInquiryBrief generates a clean customer-ready project inquiry summary', () => {
  const brief = composeInquiryBrief({
    serviceCategory: 'Advertising & Campaign Assets',
    objective: 'Develop visual concepts and campaign imagery for an upcoming product launch',
    timeline: 'Within 30 Days',
    referenceWork: 'Radiant Repair Serum: Multi-Format Advertising Suite',
    name: 'Nadia Putri',
    company: 'Atelier Botanica',
    contactInfo: 'nadia@atelierbotanica.com',
    notes: 'Launching 3 new products next month and need campaign imagery plus social ad visuals.',
  })

  assert.ok(brief.includes('Nadia Putri'))
  assert.ok(brief.includes('Atelier Botanica'))
  assert.ok(brief.includes('Advertising & Campaign Assets'))
  assert.ok(brief.includes('Radiant Repair Serum: Multi-Format Advertising Suite'))
  assert.ok(brief.includes('Launching 3 new products next month'))
})

test('All customer-facing sections and portfolio data contain zero developer jargon and zero em-dashes', () => {
  const bannedTerms = [
    'postgresql',
    'prisma',
    'supabase',
    'row-level security',
    'jwt',
    'rag assistant',
    'pgvector',
    'next.js 15',
    'tanstack query',
    'websocket',
    'ci/cd',
    'edge functions',
    '829 kb',
    'recharts',
    '—',
    '&mdash;',
  ]

  const filesToAudit = [
    'index.html',
    'src/core/identity.ts',
    'src/core/inquiry.ts',
    'src/data/projects.ts',
    'src/data/creativeWork.ts',
    'src/sections/HeroSection.tsx',
    'src/sections/StudioIntroSection.tsx',
    'src/sections/SolutionsSection.tsx',
    'src/sections/WorkSection.tsx',
    'src/sections/CreativeWorkSection.tsx',
    'src/sections/ProcessSection.tsx',
    'src/sections/WhyLegacyaSection.tsx',
    'src/sections/FounderSection.tsx',
    'src/sections/CTASection.tsx',
    'src/components/SiteNav.tsx',
    'src/components/Footer.tsx',
  ]

  for (const relPath of filesToAudit) {
    const content = fs.readFileSync(path.resolve(process.cwd(), relPath), 'utf-8').toLowerCase()
    for (const term of bannedTerms) {
      assert.equal(
        content.includes(term),
        false,
        `File ${relPath} should not contain "${term}"`,
      )
    }
  }
})
