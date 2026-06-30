import { asset } from '../utils/asset'

export interface WorkItem {
  id: string
  name: string
  type: string
  summary: string
  stack: string
  status: 'live' | 'in-dev'
  live?: string
  github: string
  /** Real screenshot, when one exists in /public. */
  image?: { src: string; alt: string }
  /** Branded gradient fallback for projects without a screenshot yet. */
  gradient?: string
}

/**
 * Curated featured set — the strongest work per the Legacya Sphere audit.
 * Copy and stacks verified against the Notion repo overview (2026-06).
 */
export const work: WorkItem[] = [
  {
    id: 'inventory-os',
    name: 'InventoryOS',
    type: 'Full-Stack Inventory System',
    summary:
      'Real database, JWT auth, atomic stock movements, and a full purchase-order lifecycle — production-grade full-stack engineering.',
    stack: 'React · TypeScript · Express · Prisma · PostgreSQL',
    status: 'live',
    live: 'https://mini-erp-frontend-tau.vercel.app/',
    github: 'https://github.com/legacyasphere-id/MINI-ERP',
    image: {
      src: asset('img-16.webp'),
      alt: 'InventoryOS — dashboard with KPI cards and stock value chart',
    },
  },
  {
    id: 'ai-cv-screening',
    name: 'AI-CV Screening',
    type: 'AI Screening Platform',
    summary:
      'Extracts CV data with Gemini, then ranks candidates on a 100% deterministic formula — the LLM never touches the decision, so results stay auditable.',
    stack: 'React · TypeScript · Supabase Edge · Gemini',
    status: 'live',
    live: 'https://ai-powered-cv-screening-platform-fo.vercel.app',
    github:
      'https://github.com/legacyasphere-id/AI-Powered-CV-Screening-Platform-for-Allure-Industries',
    gradient: 'linear-gradient(135deg, #26384A 0%, #33475B 55%, #B8956A 140%)',
  },
  {
    id: 'sphere-os',
    name: 'Sphere OS',
    type: 'Business Operating System',
    summary:
      'CRM, projects, proposals, finance, and an AI assistant sharing one dataset instead of five disconnected SaaS tools.',
    stack: 'Laravel 12 · Vue 3 · TypeScript · PostgreSQL',
    status: 'in-dev',
    live: 'https://sphere-os-virid.vercel.app',
    github: 'https://github.com/legacyasphere-id/Sphere-Os',
    gradient: 'linear-gradient(135deg, #1C2A38 0%, #33475B 60%, #5A7088 130%)',
  },
  {
    id: 'legacya-pos',
    name: 'Legacya POS',
    type: 'Restaurant POS · 9 Screens',
    summary:
      'Owner, cashier, and kitchen roles on a live Supabase backend — Realtime order queue, RLS, and split payment/fulfillment flow.',
    stack: 'React · Supabase · RLS · Realtime',
    status: 'live',
    live: 'https://legacya-pos-ui.vercel.app',
    github: 'https://github.com/legacyasphere-id/Legacya-Pos-Ui',
    image: {
      src: asset('img-06.webp'),
      alt: 'Legacya POS — cashier screen with live order list',
    },
  },
]
