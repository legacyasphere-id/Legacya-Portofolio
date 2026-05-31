import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'inventory-os',
    name: 'InventoryOS',
    tagline: 'Operational Inventory Management System',
    type: 'Mini ERP · 9 Screens',
    status: 'live',
    featured: true,
    caseStudy: {
      problem:
        'Multi-role warehouse teams relied on manual spreadsheets for stock tracking, causing inventory discrepancies, delayed reorder decisions, and zero visibility across roles.',
      thinkingProcess:
        'Mapped data flows first: products → movements → aggregated stock state. Defined role boundaries (admin vs staff) at the schema level before writing UI. PostgreSQL constraints were designed to prevent concurrent update race conditions before the frontend existed.',
      aiRole:
        'Claude designed the PostgreSQL schema, reviewed RLS policies for security gaps, and architectured the React Query + Zustand state split. Used as a code review layer on every PR before merge.',
      architecture:
        'products → inventory_movements → aggregated stock state. RLS policies per role (admin / staff). React Query for server state, Zustand for ephemeral UI state. PostgreSQL transactions + constraints prevent concurrent SKU update races.',
      technicalExecution:
        'Supabase RLS enforces role-based access at the database layer. React Query manages server state with optimistic updates. Zustand handles ephemeral UI state. PostgreSQL transactions prevent race conditions when multiple staff update the same SKU simultaneously.',
      outcome:
        'Deployed across 9 production screens with real-time stock tracking, alert system, and analytics. Eliminated manual stock sheets and measurably reduced inventory discrepancy in warehouse operations.',
    },
    architecture: {
      frontend: 'React + Zustand + React Query + Recharts',
      backend: 'Supabase · PostgreSQL · RLS · Auth',
      deploy: 'Vercel · GitHub CI/CD · Realtime',
    },
    stack: ['React', 'Zustand', 'React Query', 'Recharts', 'Supabase', 'PostgreSQL', 'Vercel'],
    links: {
      github: 'https://github.com/legacyasphere-id',
      live: 'https://mini-erp-frontend-tau.vercel.app/alerts',
    },
    screenshots: [
      { src: '/img-16.webp', alt: 'InventoryOS — dashboard with KPI cards and stock value chart' },
      { src: '/img-17.webp', alt: 'InventoryOS — stock list table with SKU and category filters' },
      { src: '/img-18.webp', alt: 'InventoryOS — alerts center with low-stock notifications' },
    ],
  },
  {
    id: 'legacya-pos',
    name: 'Legacya POS UI',
    tagline: 'Restaurant Operations Platform',
    type: 'Dashboard · POS · 9 Screens',
    status: 'live',
    featured: false,
    caseStudy: {
      problem:
        'Restaurant operators ran cashier ops, kitchen coordination, and revenue analytics across fragmented manual processes — no unified real-time view.',
      thinkingProcess:
        'Decomposed restaurant ops into 3 core subsystems: order intake (cashier), production (kitchen display), and analytics (revenue/menu intelligence). Designed the data model for each before building any screen.',
      aiRole:
        'Claude helped design the component hierarchy for the 9-screen system and reviewed the recharts data transformation layer to ensure accurate revenue aggregations.',
      architecture:
        '3 subsystems: order intake (cashier) → production queue (kitchen display) → analytics layer (revenue / menu intelligence). Shared order state flows top-down; analytics reads from a derived aggregation layer.',
      technicalExecution:
        'React frontend with Recharts for analytics. AI-powered insights embedded across screens. Kitchen display system with live order tickets. Menu intelligence layer for item-level analytics.',
      outcome:
        'Deployed 9 operational screens covering cashier workflow, kitchen display, revenue analytics, and menu intelligence. Replaced fragmented manual processes with a unified platform.',
    },
    architecture: {
      frontend: 'React + Recharts',
      deploy: 'Vercel',
    },
    stack: ['React', 'Tailwind CSS', 'Recharts', 'Vercel'],
    links: {
      github: 'https://github.com/legacyasphere-id',
      live: 'https://legacya-pos-ui.vercel.app/dashboard',
    },
    screenshots: [
      { src: '/img-06.webp', alt: 'Legacya POS UI — cashier screen with live order list' },
      { src: '/img-07.webp', alt: 'Legacya POS UI — analytics dashboard with revenue KPIs' },
      { src: '/img-08.webp', alt: 'Legacya POS UI — kitchen display with live order tickets' },
    ],
  },
  {
    id: 'hybrid-dashboard',
    name: 'Hybrid Dashboard',
    tagline: 'Studio Operations Dashboard',
    type: 'Dashboard · Studio Ops',
    status: 'live',
    featured: false,
    caseStudy: {
      problem:
        'Small studio teams needed a single-screen operational view — revenue tracking, task management, and project status — without paying for enterprise SaaS.',
      thinkingProcess:
        'Identified the minimum viable data set: revenue trend, task queue, project status, AI assistant. Designed localStorage-based state to keep it zero-backend and instantly deployable.',
      aiRole:
        'Claude reviewed the SVG chart architecture and helped design the localStorage state schema for persistence without a backend dependency.',
      architecture:
        'Single-module state object in localStorage. SVG charts drawn directly from state — no library. Component boundaries: KPI panel, task queue, project tracker, AI assistant each own a slice of state.',
      technicalExecution:
        'Pure Tailwind CSS + Vanilla JS with SVG charts rendered inline. localStorage state management. Zero dependencies, zero backend. Deployed as a static site.',
      outcome:
        'Studio operations dashboard with real-time revenue chart, KPI cards, persistent task manager, and project tracker. Zero SaaS cost, full ownership.',
    },
    architecture: {
      frontend: 'Tailwind CSS + Vanilla JS',
      deploy: 'GitHub Pages',
    },
    stack: ['Tailwind CSS', 'Vanilla JS', 'SVG Charts'],
    links: {
      github: 'https://github.com/legacyasphere-id/Hybrid-Dashboard',
      live: 'https://legacyasphere-id.github.io/Hybrid-Dashboard/',
    },
    screenshots: [
      { src: '/img-09.webp', alt: 'Hybrid Dashboard — KPI metric cards and revenue chart' },
      { src: '/img-10.webp', alt: 'Hybrid Dashboard — revenue trend and task list' },
      { src: '/img-11.webp', alt: 'Hybrid Dashboard — project tracker and activity feed' },
    ],
  },
  {
    id: 'daenuna',
    name: 'daenuna.co',
    tagline: 'Artisan E-Commerce Platform',
    type: 'E-Commerce · Order Management',
    status: 'live',
    featured: false,
    caseStudy: {
      problem:
        'A handmade crochet brand ran all orders via Instagram DMs — chaotic, unscalable, and impossible to track. No structured catalog, no order flow.',
      thinkingProcess:
        'The core problem was friction between product discovery and order placement. Designed a guided catalog flow that mirrors physical browsing and routes completed orders to WhatsApp — matching the brand\'s existing communication channel.',
      aiRole:
        'Claude helped structure the bilingual copy and reviewed the WhatsApp order integration flow for UX clarity.',
      architecture:
        'Linear catalog funnel: category browse → product detail → order form → WhatsApp deep-link with pre-filled order data. No backend — order state is passed entirely through URL parameters.',
      technicalExecution:
        'Semantic HTML5 + Vanilla JS static site. WhatsApp order integration with pre-filled message templates. Bilingual (EN/ID) brand storytelling. Deployed as static site for zero server costs.',
      outcome:
        'Replaced chaotic social DM orders with structured catalog flow. Measurably reduced order processing friction for a high-repeat-purchase artisan brand.',
    },
    architecture: {
      frontend: 'Semantic HTML5 + Vanilla JS',
      deploy: 'GitHub Pages',
    },
    stack: ['Semantic HTML5', 'Vanilla JS', 'Static Deploy'],
    links: {
      github: 'https://github.com/legacyasphere-id/Daenuna.co',
      live: 'https://legacyasphere-id.github.io/Daenuna.co/',
    },
    screenshots: [
      { src: '/daenuna-hero.jpg', alt: 'daenuna.co — hero section' },
      { src: '/daenuna-story.jpg', alt: 'daenuna.co — brand story section' },
      { src: '/daenuna-order.jpg', alt: 'daenuna.co — order flow' },
    ],
  },
]
