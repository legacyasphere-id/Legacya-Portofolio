import { asset } from '../utils/asset'

export interface ScopeSelectionDetail {
  serviceCategory?: string
  objective?: string
  projectReference?: string
}

export function triggerProjectScope(detail: ScopeSelectionDetail) {
  window.dispatchEvent(new CustomEvent<ScopeSelectionDetail>('legacya:select-scope', { detail }))
  const el = document.getElementById('contact')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function triggerProjectInspect(projectId: string) {
  window.dispatchEvent(new CustomEvent<string>('legacya:select-project', { detail: projectId }))
  const el = document.getElementById('work')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function triggerCreativeInspect(categoryOrId?: string) {
  if (categoryOrId) {
    window.dispatchEvent(new CustomEvent<string>('legacya:select-creative', { detail: categoryOrId }))
  }
  const el = document.getElementById('creative-work')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export const identity = {
  // ── Core studio identity ───────────────────────────────────────────────
  title:          'Brand, Digital Experience & Creative Studio',
  positioning:    'Brand, Digital Experience & Creative Studio',
  tagline:        "Building Brands. Creating Experiences. Shaping What's Next.",
  description:
    'Legacya Sphere helps businesses build stronger brands, modern websites, connected business systems, advertising campaign visuals, and cinematic video productions.',
  brandStatement:
    'A creative and digital studio helping businesses strengthen their presence, streamline daily operations, and tell compelling visual stories.',
  coreMessage:
    'Thoughtful digital experiences, connected operations, and campaign-ready creative work under one roof.',

  // ── Public-facing studio pillars ───────────────────────────────────────
  pillars: [
    'Digital Experiences & Business Systems',
    'Advertising & Campaign Assets',
    'Cinematic Video & Visual Production',
  ] as const,

  // ── Personal / Founder ────────────────────────────────────────────────
  name:         'Yoga Pratama Effendi',
  role:         'Founder · Creative & Digital Lead',
  company:      'Legacya Sphere',
  location:     'Bekasi, Indonesia',
  timezone:     'GMT+7',
  availability: 'Accepting New B2B & Brand Projects',
  languages:    ['English', 'Bahasa Indonesia'] as const,

  // ── Social / contact ──────────────────────────────────────────────────
  social: {
    email:     'legacyasphere@gmail.com',
    whatsapp:  '6285156862140',
    instagram: 'https://www.instagram.com/legacya.id',
    instagramHandle: '@legacya.id',
    github:    'https://github.com/legacyasphere-id',
    linkedin:  'https://www.linkedin.com/in/yoga-pratamaeffendi-59b376245',
    fiverr:    'https://www.fiverr.com/yogapratama',
  },

  // ── Assets ────────────────────────────────────────────────────────────
  assets: {
    photo: asset('img-04.webp'),
    logo:  asset('img-15.webp'),
  },
}

export type Identity = typeof identity
