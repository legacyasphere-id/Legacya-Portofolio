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

// ── Feature flags ────────────────────────────────────────────────────────
// Stays false until the TODO(yoga) prices it gates are real and approved.
// Nothing behind it renders while it is false.
export const SHOW_PRICING = false

export const identity = {
  // ── Core studio identity ───────────────────────────────────────────────
  title:       'AI-Native Studio for Systems & Brand',
  positioning: 'AI-Native Studio for Systems & Brand',
  tagline:     'The system and the brand behind it. Built by one founder, accelerated by AI.',
  description:
    'Legacya Sphere is an AI-native studio run by Yoga Pratama Effendi. I build business websites, internal tools and AI automations, and create the campaign visuals that sell them, using AI workflows to deliver at studio quality without agency overhead.',
  brandStatement:
    'An AI-native studio building business systems and brand visuals with one founder and a disciplined AI workflow.',
  coreMessage:
    'One partner for the software your team runs on and the visuals your customers see.',

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
