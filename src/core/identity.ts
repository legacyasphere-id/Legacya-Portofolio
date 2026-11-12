import { asset } from '../utils/asset'
import { navigate } from './router'

export interface ScopeSelectionDetail {
  serviceCategory?: string
  objective?: string
  projectReference?: string
}

const PENDING_SCOPE_STORAGE_KEY = 'legacya-pending-scope'
let pendingScopeSelection: ScopeSelectionDetail | null = null

export function consumePendingScopeSelection(): ScopeSelectionDetail | null {
  const fromMemory = pendingScopeSelection
  pendingScopeSelection = null
  try {
    const raw = window.sessionStorage.getItem(PENDING_SCOPE_STORAGE_KEY)
    if (raw) {
      window.sessionStorage.removeItem(PENDING_SCOPE_STORAGE_KEY)
      if (!fromMemory) {
        return JSON.parse(raw) as ScopeSelectionDetail
      }
    }
  } catch {
    // Ignore storage access errors
  }
  return fromMemory
}

export function triggerProjectScope(detail: ScopeSelectionDetail) {
  window.dispatchEvent(new CustomEvent<ScopeSelectionDetail>('legacya:select-scope', { detail }))
  const el = document.getElementById('contact')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    return
  }

  pendingScopeSelection = detail
  try {
    window.sessionStorage.setItem(PENDING_SCOPE_STORAGE_KEY, JSON.stringify(detail))
  } catch {
    // Ignore storage access errors
  }
  navigate('/#contact')
}

export function triggerProjectInspect(projectId: string) {
  window.dispatchEvent(new CustomEvent<string>('legacya:select-project', { detail: projectId }))
  navigate(`/work?project=${encodeURIComponent(projectId)}`)
}

export function triggerCreativeInspect(categoryOrId?: string) {
  if (categoryOrId) {
    window.dispatchEvent(new CustomEvent<string>('legacya:select-creative', { detail: categoryOrId }))
    navigate(`/work?creative=${encodeURIComponent(categoryOrId)}`)
    return
  }
  navigate('/work#creative-work')
}

export function triggerMotionInspect(motionId?: string) {
  if (motionId) {
    window.dispatchEvent(new CustomEvent<string>('legacya:select-motion', { detail: motionId }))
    navigate(`/work?motion=${encodeURIComponent(motionId)}#motion-work`)
    return
  }
  navigate('/work#motion-work')
}

// ── Feature flags ────────────────────────────────────────────────────────
// Stays false until the TODO(yoga) prices it gates are real and approved.
// Nothing behind it renders while it is false.
export const SHOW_PRICING = false

// Stays false until the motion animation source files in src/data/motionWork.ts
// are attached and approved. While false, #motion-work renders an honest
// preparation state and mount slot without any placeholder project claims.
export const SHOW_MOTION_WORK = false

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
    'Motion Animation',
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
