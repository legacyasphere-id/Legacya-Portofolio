import { asset } from '../utils/asset'

export interface ScopeSelectionDetail {
  tier?: string
  systemType?: string
  bottleneck?: string
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

export const identity = {
  // ── Core identity ──────────────────────────────────────────────────────
  title:          'AI-Native Business Systems Studio',
  positioning:    'AI-Native Business Systems Studio',
  tagline:        'Helping companies transform manual operations into scalable business systems.',
  description:    'Legacya Sphere designs and builds business operating systems, internal platforms, dashboards, automation workflows, and digital infrastructure that help companies operate more efficiently.',
  brandStatement: 'Legacya Sphere helps companies transform manual operations into scalable business systems.',
  coreMessage:    "Most businesses don't need more tools. They need better systems.",

  // ── Public-facing identity badges ─────────────────────────────────────
  badges: [
    'AI-Native Systems Studio',
    'Custom Operations Architecture',
    'Deterministic AI Engineering',
  ] as const,

  // ── Personal / Founder ────────────────────────────────────────────────
  name:         'Yoga Pratama Effendi',
  company:      'Legacya Sphere',
  location:     'Bekasi, Indonesia',
  timezone:     'GMT+7',
  availability: 'Accepting Q4/Q1 B2B System Builds',
  languages:    ['English', 'Bahasa Indonesia'] as const,

  // ── Social / contact ──────────────────────────────────────────────────
  social: {
    email:    'legacyasphere@gmail.com',
    whatsapp: '6285156862140',
    github:   'https://github.com/legacyasphere-id',
    linkedin: 'https://www.linkedin.com/in/yoga-pratamaeffendi-59b376245',
    fiverr:   'https://www.fiverr.com/yogapratama',
  },

  // ── Assets ────────────────────────────────────────────────────────────
  assets: {
    photo: asset('img-04.webp'),
    logo:  asset('img-15.webp'),
  },

  // ── Execution layer classification ────────────────────────────────────
  executionLayers: {
    tools:      ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    coEngineer: ['Claude', 'Claude Code', 'GPT-4o', 'Gemini', 'n8n', 'Make.com'],
    deployment: ['Vercel', 'GitHub Actions CI/CD', 'Docker'],
  },

  // ── Studio operating system text ──────────────────────────────────────
  founderOS: {
    name:    'Legacya Operating Standard',
    version: '2.0',
    tagline: 'The architectural standard beneath every system we ship.',
    systemDescription:
      'Data-first modeling, deterministic AI boundaries, and production-grade access control built so businesses own their operational infrastructure outright.',
  },
}

export type Identity = typeof identity
