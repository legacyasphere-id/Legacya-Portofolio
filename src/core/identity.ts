/**
 * Identity System — single source of truth for all portfolio identity,
 * narrative tone, and brand copy. All data layers import from here.
 */

export const identity = {
  // ── Core identity ──────────────────────────────────────────────────────
  role:        'AI-Native Builder & Product Engineer',
  title:       'AI-Native Builder & Product Engineer',
  tagline:     'System-first. AI-native. Every stage co-engineered.',
  description: 'Operational software systems built AI-native — from architecture to deployment, with Claude as co-engineer at every stage.',
  coreMessage: "I don't build features. I build systems. AI is my co-engineer.",

  // ── Public-facing identity badges ─────────────────────────────────────
  badges: [
    'AI-Native Founder',
    'AI-Native System Builder',
    'Product System Thinker',
  ] as const,

  // ── Personal ──────────────────────────────────────────────────────────
  name:         'Yoga Pratama Effendi',
  company:      'Legacya Sphere',
  location:     'Bekasi, Indonesia',
  timezone:     'GMT+7',
  availability: 'Available for selective engagements',
  languages:    ['English', 'Bahasa Indonesia'] as const,

  // ── Social / contact ──────────────────────────────────────────────────
  social: {
    email:    'legacyasphere@gmail.com',
    github:   'https://github.com/legacyasphere-id',
    linkedin: 'https://www.linkedin.com/in/yoga-pratamaeffendi-59b376245',
    fiverr:   'https://www.fiverr.com/yogapratama',
  },

  // ── Assets ────────────────────────────────────────────────────────────
  assets: {
    photo: '/img-04.webp',
    logo:  '/img-15.webp',
  },

  // ── Execution layer classification ────────────────────────────────────
  // Stack is framed as execution tooling, NOT as identity attributes.
  executionLayers: {
    tools:      ['React', 'TypeScript', 'Vue.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    coEngineer: ['Claude', 'Claude Code', 'GPT', 'Gemini', 'n8n'],
    deployment: ['Vercel', 'GitHub', 'Cloudflare'],
  },

  // ── Project narrative tone (applied consistently to all case studies) ─
  narrativeTone: {
    problem:           'system-level — what process or data flow was broken at scale',
    thinkingProcess:   'AI-assisted reasoning — how the system was deconstructed before coding',
    aiRole:            'co-engineer framing — Claude as architecture + review partner, not a shortcut',
    architecture:      'data flow first — entities, roles, boundaries, then tech choices',
    technicalExecution:'implementation precision — RLS, state management, schema constraints',
    outcome:           'impact / operational result — what changed for the user or team',
  },

  // ── Founder OS system text ────────────────────────────────────────────
  founderOS: {
    name:    'Founder OS',
    version: '2.0',
    tagline: 'The OS beneath every system I ship.',
    systemDescription:
      'An operating system for building products — not a portfolio. Principles, workflows, and tools organized as a coherent execution machine.',
  },
} as const

export type Identity = typeof identity
