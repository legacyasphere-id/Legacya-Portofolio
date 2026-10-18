import type { Project } from '../types/project'
import { asset } from '../utils/asset'

export const projects: Project[] = [
  {
    id: 'inventory-os',
    name: 'InventoryOS',
    tagline: 'Multi-Role Warehouse & Stock Operations ERP',
    type: 'Custom Operations ERP',
    industry: 'Warehouse & Logistics',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'Multi-role warehouse teams relied on disconnected spreadsheets for stock tracking, causing recurring inventory discrepancies, delayed reorder decisions, and zero real-time visibility between warehouse staff and purchasing managers.',
      thinkingProcess:
        'Mapped operational data flows before designing a single screen: products → inventory movements → aggregated stock state. Defined strict schema constraints and database transaction boundaries first so stock accuracy is enforced at the database layer rather than patched in the UI.',
      aiRole:
        'Co-engineered with Claude to architect the Prisma transactional schema, audit JWT role boundaries for security gaps, and optimize vendor chunk splitting—reducing initial client bundle payload from 829 KB to 162 KB (-80%).',
      architectureNote:
        'products → inventory_movements → aggregated stock state. Express + Prisma API over PostgreSQL (Supabase). Every inbound or outbound stock movement updates currentQty inside an atomic Prisma transaction to eliminate concurrent update race conditions.',
      technicalExecution:
        'Role-based JWT authentication with bcrypt hashing and protected routes across client and API layers. Atomic stock ledger via Prisma transactions. Multi-line purchase orders with a full draft → confirmed → partial → received lifecycle, supplier directory, low-stock threshold alerts, and valuation analytics.',
      outcome:
        'Deployed in production with automated CI/CD on every commit. Gives warehouse operators and purchasing leads a single source of truth with atomic stock accuracy, role-enforced permissions, and real-time low-stock alerting.',
    },
    techStack: {
      frontend: 'React · TypeScript · TanStack Query',
      backend: 'Node.js · Express · Prisma ORM',
      database: 'PostgreSQL (Supabase)',
      auth: 'JWT · Role-Based Access Control',
      deploy: 'Vercel · GitHub Actions CI/CD',
    },
    stack: ['React', 'TypeScript', 'TanStack Query', 'Express', 'Prisma', 'PostgreSQL', 'Vercel'],
    links: {
      github: 'https://github.com/legacyasphere-id/MINI-ERP',
      live: 'https://mini-erp-frontend-tau.vercel.app/',
    },
    screenshots: [
      {
        src: asset('img-16.webp'),
        alt: 'InventoryOS executive dashboard showing inventory valuation KPIs, stock movement trends, and category distribution',
      },
      {
        src: asset('img-17.webp'),
        alt: 'InventoryOS master stock ledger with real-time SKU search, category filtering, and unit valuation',
      },
      {
        src: asset('img-18.webp'),
        alt: 'InventoryOS automated alerts center highlighting low-stock SKUs and reorder thresholds',
      },
    ],
  },
  {
    id: 'ai-cv-screening',
    name: 'Allure AI Talent Engine',
    tagline: 'Deterministic AI Candidate Extraction & Scoring Platform',
    type: 'AI Decision & Recruitment System',
    industry: 'HR & Talent Operations',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'HR teams at Allure Industries manually reviewed hundreds of unstructured resumes per role—an slow, inconsistent process that made it impossible to audit or justify why one applicant ranked above another.',
      thinkingProcess:
        'Strictly separated unstructured data extraction from candidate evaluation. The LLM parses messy CVs into normalized JSON schemas, while a deterministic, weighted mathematical formula computes the score—ensuring hiring rankings never suffer from model hallucination or drift.',
      aiRole:
        'Used Claude to formalize the deterministic scoring rubric (Skills 40% / Experience 30% / Education 20% / Domain Fit 10%) and engineer strict schema-bound prompts that confine Gemini 1.5 Flash strictly to entity extraction.',
      architectureNote:
        'CV Upload → Gemini 1.5 Flash Structured Extraction → Field Normalization → Deterministic Weighted Scorer → Auditable Ranking Table. Backed by Supabase PostgreSQL and Deno Edge Functions for low-latency serverless execution.',
      technicalExecution:
        'React + TypeScript analytics workspace with Recharts radar comparisons, Supabase Edge Functions (Deno) for asynchronous CV parsing and candidate-to-job matching, per-candidate explainability breakdowns, and instant CSV/JSON reporting exports.',
      outcome:
        'Cuts initial candidate screening time from hours to seconds while delivering 100% reproducible, bias-auditable candidate rankings with visual radar comparisons and exportable hiring audit trails.',
    },
    techStack: {
      frontend: 'React · TypeScript · Recharts',
      backend: 'Supabase Edge Functions (Deno)',
      database: 'Supabase PostgreSQL',
      automation: 'Gemini 1.5 Flash · Deterministic Scorer',
      deploy: 'Vercel',
    },
    stack: ['React', 'TypeScript', 'Supabase Edge', 'Deno', 'Gemini', 'Recharts', 'Vercel'],
    links: {
      github:
        'https://github.com/legacyasphere-id/AI-Powered-CV-Screening-Platform-for-Allure-Industries',
      live: 'https://ai-powered-cv-screening-platform-fo.vercel.app',
    },
    screenshots: [
      {
        src: asset('img-19.webp'),
        alt: 'Allure AI Talent Engine dashboard with recruitment KPIs, top ranked applicants, and Top-3 multi-axis radar comparison',
      },
      {
        src: asset('img-20.webp'),
        alt: 'Allure AI Talent Engine structured job criteria and deterministic candidate score breakdown table',
      },
    ],
  },
  {
    id: 'brightpath-dental',
    name: 'BrightPath Patient & Lead OS',
    tagline: 'Bilingual RAG Patient Assistant & Automated Intake Pipeline',
    type: 'AI Customer Portal & Lead Automation',
    industry: 'Healthcare & Clinics',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'Healthcare clinics lose high-intent patient inquiries outside operating hours when prospective patients cannot get immediate, accurate answers about treatments, pricing, and doctor availability without calling the front desk.',
      thinkingProcess:
        'Architected around the complete patient conversion lifecycle: instant clinical Q&A → structured intent capture → automated staff dispatch. Grounded the AI assistant strictly in verified clinic documentation (RAG) and wired dual-path lead capture into an automated notification pipeline.',
      aiRole:
        'Co-engineered the GPT-4o RAG retrieval pipeline over clinic knowledge documents, implemented Next.js 15 after() non-blocking webhook dispatch for Vercel serverless reliability, and structured the Make.com to Gmail dispatch scenario.',
      architectureNote:
        'Next.js 15 App Router → /api/chat (GPT-4o + Supabase pgvector RAG) & /api/leads (Supabase persistence + non-blocking Make.com webhook via next/server after()) → Instant Front-Desk Gmail Dispatch. Includes /admin portal for drag-and-drop Knowledge Base updates.',
      technicalExecution:
        'GPT-4o RAG assistant grounded on 5 clinical knowledge domains (procedures, transparent pricing, specialists, insurance, FAQ) with automatic Bahasa Indonesia and English language detection, unified booking + chat lead capture, and self-service admin document management.',
      outcome:
        'Delivers 24/7 bilingual patient consultation and zero-latency front-desk lead notifications, turning passive website traffic into booked clinical appointments with full administrative control over AI knowledge.',
    },
    techStack: {
      frontend: 'Next.js 15 · TypeScript · Tailwind CSS',
      backend: 'Supabase PostgreSQL + Auth · OpenAI GPT-4o RAG',
      automation: 'Make.com Webhook · Gmail Dispatch',
      deploy: 'Vercel',
    },
    stack: ['Next.js 15', 'TypeScript', 'Supabase', 'OpenAI GPT-4o', 'Make.com', 'Tailwind CSS', 'Vercel'],
    links: {
      github: 'https://github.com/legacyasphere-id/brightpath-dental',
      live: 'https://brightpath-dental.vercel.app',
    },
    screenshots: [
      {
        src: asset('img-21.webp'),
        alt: 'BrightPath Dental patient portal hero with instant appointment booking and AI clinical assistant launch',
      },
      {
        src: asset('img-22.webp'),
        alt: 'BrightPath Dental bilingual RAG AI assistant answering patient treatment and pricing questions in real time',
      },
      {
        src: asset('img-23.webp'),
        alt: 'BrightPath Dental structured clinical services and specialist treatment catalog',
      },
    ],
  },
  {
    id: 'legacya-pos',
    name: 'Legacya POS & Kitchen OS',
    tagline: 'Real-Time Multi-Role Restaurant Operations Platform',
    type: 'Realtime POS & Fulfillment System',
    industry: 'Food & Beverage',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'Restaurant operators struggled with paper tickets and disconnected cashier registers, causing kitchen bottlenecks, missed order modifications, and delayed end-of-day revenue reconciliation.',
      thinkingProcess:
        'Decomposed restaurant operations into three synchronized role environments—Order Intake (Cashier), Production Queue (Kitchen Display System), and Executive Telemetry (Owner)—while decoupling payment state from fulfillment state so cash and digital orders flow seamlessly.',
      aiRole:
        'Used Claude to audit Supabase Row-Level Security (RLS) policies, resolve custom JWT role claim resolution across the 3 operational personas, and validate the Supabase Realtime WebSocket subscription lifecycle.',
      architectureNote:
        'Owner / Cashier / Kitchen personas governed by Supabase PostgreSQL RLS. Separate order.status (fulfillment) and order.payment_status (settlement) state machines enforced via server-side PostgreSQL RPCs (place_order, pay_order_cash) with live Supabase Realtime broadcast to kitchen displays.',
      technicalExecution:
        'Nine dedicated operational screens built in React + Vite with Recharts revenue telemetry, live kitchen ticket timers, status filtering, thermal receipt generation, and database-enforced multi-role security.',
      outcome:
        'Unifies front-of-house cashier intake, real-time kitchen ticket orchestration, and owner revenue analytics into a single zero-refresh operational platform across 9 production screens.',
    },
    techStack: {
      frontend: 'React · Vite · Recharts · Tailwind CSS',
      backend: 'Supabase PostgreSQL · Server RPCs',
      realtime: 'Supabase Realtime WebSockets',
      auth: 'Row-Level Security (RLS) · 3 Personas',
      deploy: 'Vercel',
    },
    stack: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Supabase Realtime', 'PostgreSQL RLS', 'Vercel'],
    links: {
      github: 'https://github.com/legacyasphere-id/Legacya-Pos-Ui',
      live: 'https://legacya-pos-ui.vercel.app',
    },
    screenshots: [
      {
        src: asset('img-06.webp'),
        alt: 'Legacya POS cashier terminal with live order builder, table assignment, and thermal receipt preview',
      },
      {
        src: asset('img-07.webp'),
        alt: 'Legacya POS owner analytics dashboard displaying daily revenue KPIs, category performance, and order volume',
      },
      {
        src: asset('img-08.webp'),
        alt: 'Legacya POS real-time Kitchen Display System (KDS) with active prep timers and fulfillment state transitions',
      },
    ],
  },
]
