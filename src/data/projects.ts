import type { Project } from '../types/project'
import { asset } from '../utils/asset'

export const projects: Project[] = [
  {
    id: 'inventory-os',
    name: 'InventoryOS',
    tagline: 'Full-Stack Inventory Management System',
    type: 'Mini ERP · Full-Stack',
    industry: 'Warehouse · Logistics',
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
        'Live on Vercel with real auth, atomic stock movements, purchase orders, suppliers, alerts, and analytics, CI running on every push. The audit ranks it the strongest full-stack engineering asset.',
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
      { src: asset('img-16.webp'), alt: 'InventoryOS, dashboard with KPI cards and stock value chart' },
      { src: asset('img-17.webp'), alt: 'InventoryOS, stock list table with SKU and category filters' },
      { src: asset('img-18.webp'), alt: 'InventoryOS, alerts center with low-stock notifications' },
    ],
  },
  {
    id: 'ai-cv-screening',
    name: 'AI-CV Screening',
    tagline: 'AI-Powered CV Screening for Allure Industries',
    type: 'AI Screening Platform',
    industry: 'HR Tech',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'Allure Industries screened CVs by hand, slow, inconsistent, and impossible to justify why one candidate ranked above another.',
      thinkingProcess:
        'Separated extraction from judgment: let the LLM read messy CVs into structured fields, but keep ranking on a fixed, auditable formula so hiring decisions never depend on model whim.',
      aiRole:
        'Claude shaped the deterministic scoring rubric and the prompt boundary that keeps Gemini limited to extraction and normalization, never the ranking decision.',
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
      { src: asset('img-19.webp'), alt: 'AI-CV Screening, candidate dashboard with KPI cards, ranked top candidates, and a Top-3 score-comparison radar' },
      { src: asset('img-20.webp'), alt: 'AI-CV Screening, job requirements and the ranked all-candidates table with skill matches and final scores' },
    ],
  },
  {
    id: 'brightpath-dental',
    name: 'BrightPath Dental',
    tagline: 'AI-Powered Clinic Site for BrightPath Dental (Indonesia)',
    type: 'Portfolio Demo · AI Chat · Lead Capture',
    industry: 'Healthcare',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'A dental clinic in Indonesia had no digital presence, no way for patients to learn about services, book appointments, or get answers outside of a phone call.',
      thinkingProcess:
        'Designed around the patient journey first: answer questions → capture intent → notify the clinic. AI chat handles discovery, the lead form captures commitment, and Make.com + Gmail closes the loop automatically.',
      aiRole:
        'Claude co-engineered the full system, GPT-4o RAG chat trained on clinic KB, next/server after() fix for Vercel webhook reliability, and Make.com Gmail scenario with live variable pills. Built across 4 phases in one week.',
      architectureNote:
        'Next.js 15 App Router frontend. /api/chat (GPT-4o + Supabase RAG) and /api/leads (Supabase insert + Make.com webhook via after()). Admin panel at /admin for KB document upload. Make.com webhook → Gmail for automated lead notifications.',
      technicalExecution:
        'GPT-4o chatbot with RAG over 5 clinic KB documents (services, pricing, doctors, FAQ). Bahasa Indonesia auto-detection. Lead capture from both chat and booking form into Supabase. next/server after() ensures Make.com webhook fires after Vercel serverless return. Admin panel with drag & drop KnowledgeUpload.',
      outcome:
        'Built and shipped in one week: live AI chat, automated lead email pipeline, and admin KB management, all running in production on Vercel. A fictional-clinic portfolio piece demonstrating full-stack, production-grade AI system delivery.',
    },
    techStack: {
      frontend: 'Next.js 15 · TypeScript · Tailwind CSS',
      backend: 'Supabase PostgreSQL + Auth · OpenAI GPT-4o',
      automation: 'Make.com · Gmail API',
      deploy: 'Vercel',
    },
    stack: ['Next.js 15', 'TypeScript', 'Supabase', 'OpenAI', 'Make.com', 'Tailwind CSS', 'Vercel'],
    links: {
      github: 'https://github.com/legacyasphere-id/brightpath-dental',
      live: 'https://brightpath-dental.vercel.app',
    },
    screenshots: [
      { src: asset('img-21.webp'), alt: "BrightPath Dental, clinic homepage hero with 'Book an Appointment' and 'Ask our AI' calls-to-action" },
      { src: asset('img-22.webp'), alt: 'BrightPath Dental, AI assistant section with sample patient questions and instant Bahasa Indonesia / English answers' },
      { src: asset('img-23.webp'), alt: 'BrightPath Dental, services overview grid (check-ups, whitening, implants, orthodontics, root canal, pediatric)' },
    ],
  },
  {
    id: 'legacya-pos',
    name: 'Legacya POS',
    tagline: 'Restaurant Operations Platform',
    type: 'POS · 9 Screens · 3 Roles',
    industry: 'Food & Beverage',
    status: 'live',
    featured: false,
    caseStudy: {
      problem:
        'Restaurant operators ran cashier ops, kitchen coordination, and revenue analytics across fragmented manual processes, no unified real-time view.',
      thinkingProcess:
        'Decomposed restaurant ops into three core subsystems, order intake (cashier), production (kitchen display), and analytics, and split payment from fulfillment so cash orders still flow through the kitchen queue.',
      aiRole:
        'Claude reviewed the Supabase RLS policies and the auth_role resolution that was wrongly reading the JWT role claim, and validated the Realtime order-queue subscription model.',
      architectureNote:
        'Owner / Cashier / Kitchen roles on a live Supabase backend. order.status drives fulfillment; a separate order.payment_status axis tracks payment. place_order and pay_order_cash RPCs enforce server-side logic; the kitchen queue polls and subscribes to Realtime changes.',
      technicalExecution:
        'React + Vite frontend with Recharts analytics. Supabase PostgreSQL with RLS and Realtime. Live order list with status filters, an elapsed cooking timer, and a thermal-receipt preview. Auth, menu, cashier, orders, and kitchen are wired to the backend.',
      outcome:
        'Nine operational screens across three personas with a live Supabase backend, Realtime kitchen queue, RLS-enforced access, and a split payment/fulfillment flow replacing fragmented manual processes.',
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
      { src: asset('img-06.webp'), alt: 'Legacya POS, cashier screen with live order list' },
      { src: asset('img-07.webp'), alt: 'Legacya POS, analytics dashboard with revenue KPIs' },
      { src: asset('img-08.webp'), alt: 'Legacya POS, kitchen display with live order tickets' },
    ],
  },
]
