import type { Project } from '../types/project'
import { asset } from '../utils/asset'

export const projects: Project[] = [
  {
    id: 'inventory-os',
    name: 'InventoryOS',
    tagline: 'Full-Stack Inventory Management System',
    type: 'Mini ERP · Full-Stack',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'Multi-role warehouse teams relied on manual spreadsheets for stock tracking, causing inventory discrepancies, delayed reorder decisions, and zero visibility across roles.',
      thinkingProcess:
        'Mapped data flows first: products → movements → aggregated stock state. Defined the schema and transaction boundaries before any UI, so stock integrity was guaranteed at the database layer rather than patched in the frontend.',
      aiRole:
        'Claude designed the Prisma schema and transaction boundaries, reviewed the JWT auth flow for gaps, and guided the vendor-chunk bundle optimization that cut initial JS from 829 KB to 162 KB.',
      architectureNote:
        'products → inventory_movements → aggregated stock state. Express + Prisma API over PostgreSQL (Supabase-hosted). Every movement updates currentQty inside a single Prisma transaction to prevent concurrent-update races.',
      technicalExecution:
        'JWT auth with bcrypt hashing and protected routes on both layers. Atomic stock movements via Prisma transactions. Multi-line purchase orders with a draft → confirmed → partial → received lifecycle. Full API: products, movements, orders, suppliers, analytics, users.',
      outcome:
        'Live on Vercel with real auth, atomic stock movements, purchase orders, suppliers, alerts, and analytics — CI running on every push. The audit ranks it the strongest full-stack engineering asset.',
    },
    techStack: {
      frontend: 'React + TypeScript + TanStack Query',
      backend: 'Express + Prisma + PostgreSQL',
      auth: 'JWT + bcrypt',
      deploy: 'Vercel · GitHub CI/CD',
    },
    stack: ['React', 'TypeScript', 'TanStack Query', 'Express', 'Prisma', 'PostgreSQL', 'Vercel'],
    links: {
      github: 'https://github.com/legacyasphere-id/MINI-ERP',
      live: 'https://mini-erp-frontend-tau.vercel.app/',
    },
    screenshots: [
      { src: asset('img-16.webp'), alt: 'InventoryOS — dashboard with KPI cards and stock value chart' },
      { src: asset('img-17.webp'), alt: 'InventoryOS — stock list table with SKU and category filters' },
      { src: asset('img-18.webp'), alt: 'InventoryOS — alerts center with low-stock notifications' },
    ],
  },
  {
    id: 'ai-cv-screening',
    name: 'AI-CV Screening',
    tagline: 'AI-Powered CV Screening for Allure Industries',
    type: 'AI Screening Platform',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'Allure Industries screened CVs by hand — slow, inconsistent, and impossible to justify why one candidate ranked above another.',
      thinkingProcess:
        'Separated extraction from judgment: let the LLM read messy CVs into structured fields, but keep ranking on a fixed, auditable formula so hiring decisions never depend on model whim.',
      aiRole:
        'Claude shaped the deterministic scoring rubric and the prompt boundary that keeps Gemini limited to extraction and normalization — never the ranking decision.',
      architectureNote:
        'CV upload → Gemini extraction (skills, experience, education) → normalization → deterministic scorer (Skill 40 / Experience 30 / Education 20 / Bonus 10). Supabase stores candidates, jobs, matches, and submissions.',
      technicalExecution:
        'React + TypeScript frontend, Supabase Edge Functions (Deno) for process-cv and match-candidates, Gemini 1.5 Flash for extraction only. Demo mode runs with five sample CVs and no backend.',
      outcome:
        'MVP shipped on Vercel with a radar-chart dashboard, per-candidate explainability, and JSON/CSV export. Ranking is 100% reproducible and bias-auditable. The audit rates it the best B2B monetization candidate.',
    },
    techStack: {
      frontend: 'React + TypeScript + Recharts',
      backend: 'Supabase Edge Functions (Deno)',
      database: 'Supabase PostgreSQL',
      deploy: 'Vercel',
    },
    stack: ['React', 'TypeScript', 'Supabase Edge', 'Deno', 'Gemini', 'Recharts', 'Vercel'],
    links: {
      github:
        'https://github.com/legacyasphere-id/AI-Powered-CV-Screening-Platform-for-Allure-Industries',
      live: 'https://ai-powered-cv-screening-platform-fo.vercel.app',
    },
    screenshots: [
      { src: asset('img-19.webp'), alt: 'AI-CV Screening — candidate dashboard with KPI cards, ranked top candidates, and a Top-3 score-comparison radar' },
      { src: asset('img-20.webp'), alt: 'AI-CV Screening — job requirements and the ranked all-candidates table with skill matches and final scores' },
    ],
  },
  {
    id: 'sphere-os',
    name: 'Sphere OS',
    tagline: 'Unified Business OS for Founders',
    type: 'Business Operating System',
    status: 'in-progress',
    featured: true,
    caseStudy: {
      problem:
        'Founders and small teams run on five disconnected SaaS tools — CRM here, projects there, finance in a spreadsheet — with no shared source of truth.',
      thinkingProcess:
        'Modeled one shared dataset first, then layered modules on top, so CRM, projects, proposals, and finance read and write the same entities instead of syncing copies between tools.',
      aiRole:
        'Claude reviewed the module boundaries and the Laravel migration set, and helped compile all 16 migrations into a single Supabase-compatible restore script for zero-Docker recreation.',
      architectureNote:
        'Laravel 12 API + Vue 3 SPA over one relational core. Modules: CRM · Projects · Proposals · Finance · Knowledge Base · AI Assistant. Runs on MySQL 8 (Docker) or Supabase PostgreSQL.',
      technicalExecution:
        'Laravel 12 (PHP) backend, Vue 3 + TypeScript + Pinia frontend, Vite build, Tailwind v4. Docker Compose brings up API + frontend + Nginx + MySQL in one command; Playwright E2E included.',
      outcome:
        'Live demo deployed on Vercel. Unifies six business functions on one dataset, replacing the five-tool sprawl most small studios juggle. Active development toward beta.',
    },
    techStack: {
      frontend: 'Vue 3 + TypeScript + Pinia',
      backend: 'Laravel 12 · MySQL / Supabase',
      deploy: 'Vercel · Docker Compose',
    },
    stack: ['Laravel 12', 'Vue 3', 'TypeScript', 'Pinia', 'PostgreSQL', 'Docker', 'Playwright'],
    links: {
      github: 'https://github.com/legacyasphere-id/Sphere-Os',
      live: 'https://sphere-os-virid.vercel.app',
    },
    screenshots: [],
  },
  {
    id: 'legacya-pos',
    name: 'Legacya POS',
    tagline: 'Restaurant Operations Platform',
    type: 'POS · 9 Screens · 3 Roles',
    status: 'live',
    featured: false,
    caseStudy: {
      problem:
        'Restaurant operators ran cashier ops, kitchen coordination, and revenue analytics across fragmented manual processes — no unified real-time view.',
      thinkingProcess:
        'Decomposed restaurant ops into three core subsystems — order intake (cashier), production (kitchen display), and analytics — and split payment from fulfillment so cash orders still flow through the kitchen queue.',
      aiRole:
        'Claude reviewed the Supabase RLS policies and the auth_role resolution that was wrongly reading the JWT role claim, and validated the Realtime order-queue subscription model.',
      architectureNote:
        'Owner / Cashier / Kitchen roles on a live Supabase backend. order.status drives fulfillment; a separate order.payment_status axis tracks payment. place_order and pay_order_cash RPCs enforce server-side logic; the kitchen queue polls and subscribes to Realtime changes.',
      technicalExecution:
        'React + Vite frontend with Recharts analytics. Supabase PostgreSQL with RLS and Realtime. Live order list with status filters, an elapsed cooking timer, and a thermal-receipt preview. Auth, menu, cashier, orders, and kitchen are wired to the backend.',
      outcome:
        'Nine operational screens across three personas with a live Supabase backend — Realtime kitchen queue, RLS-enforced access, and a split payment/fulfillment flow replacing fragmented manual processes.',
    },
    techStack: {
      frontend: 'React + Vite + Recharts',
      backend: 'Supabase · PostgreSQL · RLS',
      realtime: 'Supabase Realtime',
      deploy: 'Vercel',
    },
    stack: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Supabase', 'PostgreSQL', 'Vercel'],
    links: {
      github: 'https://github.com/legacyasphere-id/Legacya-Pos-Ui',
      live: 'https://legacya-pos-ui.vercel.app',
    },
    screenshots: [
      { src: asset('img-06.webp'), alt: 'Legacya POS — cashier screen with live order list' },
      { src: asset('img-07.webp'), alt: 'Legacya POS — analytics dashboard with revenue KPIs' },
      { src: asset('img-08.webp'), alt: 'Legacya POS — kitchen display with live order tickets' },
    ],
  },
]
