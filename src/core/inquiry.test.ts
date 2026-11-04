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
import { en } from '../i18n/en.ts'
import { id } from '../i18n/id.ts'

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

test('composeInquiryBrief and validateInquiryInput support Indonesian language (id)', () => {
  const invalidRes = validateInquiryInput({ name: '', contactInfo: '' }, 'id')
  assert.equal(invalidRes.valid, false)
  assert.ok(invalidRes.error?.includes('namamu'))

  const briefId = composeInquiryBrief(
    {
      serviceCategory: resolveServiceLabel('digital-systems', 'id'),
      objective: getObjectivesForService('digital-systems', 'id')[0],
      timeline: 'Dalam 30 Hari',
      name: 'Budi Santoso',
      company: 'Nusantara Retail',
      contactInfo: '+62 812-3456-7890',
      notes: 'Ingin membuat sistem stok gudang terpadu.',
    },
    'id',
  )

  assert.ok(briefId.includes('Halo Yoga (Legacya Sphere),'))
  assert.ok(briefId.includes('Layanan yang Diminati: Pengalaman Digital & Sistem Bisnis'))
  assert.ok(briefId.includes('Tujuan Utama: Meluncurkan atau memperbarui website perusahaan'))
  assert.ok(briefId.includes('Target Waktu: Dalam 30 Hari'))
})

test('en and id dictionaries have identical keys and no empty strings', () => {
  function verifyNode(enNode: unknown, idNode: unknown, keyPath: string) {
    assert.equal(typeof enNode, typeof idNode, `Type mismatch at ${keyPath}`)

    if (typeof enNode === 'string') {
      assert.equal(typeof idNode, 'string', `Expected string at ${keyPath}`)
      assert.ok(
        (enNode as string).trim().length > 0,
        `Empty English string at ${keyPath}`,
      )
      assert.ok(
        (idNode as string).trim().length > 0,
        `Empty Indonesian string at ${keyPath}`,
      )
      return
    }

    if (Array.isArray(enNode)) {
      assert.ok(Array.isArray(idNode), `Expected array at ${keyPath}`)
      assert.equal(
        enNode.length,
        (idNode as unknown[]).length,
        `Array length mismatch at ${keyPath}`,
      )
      for (let i = 0; i < enNode.length; i++) {
        verifyNode(enNode[i], (idNode as unknown[])[i], `${keyPath}[${i}]`)
      }
      return
    }

    if (enNode && typeof enNode === 'object') {
      const enKeys = Object.keys(enNode as Record<string, unknown>).sort()
      const idKeys = Object.keys(idNode as Record<string, unknown>).sort()
      assert.deepEqual(enKeys, idKeys, `Key mismatch at ${keyPath}`)
      for (const k of enKeys) {
        verifyNode(
          (enNode as Record<string, unknown>)[k],
          (idNode as Record<string, unknown>)[k],
          keyPath ? `${keyPath}.${k}` : k,
        )
      }
    }
  }

  verifyNode(en, id, '')
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
    'src/i18n/en.ts',
    'src/i18n/id.ts',
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
    'src/components/SectionGuide.tsx',
    'src/components/Footer.tsx',
    'src/components/CurveShowcaseCard.tsx',
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
