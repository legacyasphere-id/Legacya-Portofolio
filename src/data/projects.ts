import type { Project } from '../types/project'
import { asset } from '../utils/asset'

export const projects: Project[] = [
  {
    id: 'inventory-os',
    name: 'InventoryOS',
    tagline: 'Warehouse, Stock & Purchasing Management System',
    category: 'Digital Experiences & Business Systems',
    type: 'Internal Business Operations System',
    industry: 'Warehouse & Distribution',
    workClassification: 'Self-initiated reference build · Live demo',
    status: 'live',
    featured: true,
    caseStudy: {
      challenge:
        'Growing warehouse and distribution teams often rely on disconnected spreadsheets to track inventory. This leads to stock count errors, delayed restocking decisions, and a lack of clear visibility between warehouse staff and purchasing managers.',
      solution:
        'A centralized, easy-to-use web system where warehouse staff, managers, and purchasing leads work from the same live stock records. Every incoming delivery, outgoing order, and supplier purchase order is tracked in one place with clear role permissions.',
      intendedValue:
        'Helps distribution businesses prevent costly stockouts, reduce manual counting mistakes, and give leadership an instant, reliable view of inventory value and daily stock movement.',
      highlights:
        'Multi-team role access · Complete purchase order tracking · Automatic low-stock alerts & valuation reports',
    },
    deliverables: [
      'Executive dashboard showing total inventory value, stock movement trends, and category breakdowns',
      'Central product and stock catalog with instant search, filtering, and supplier tracking',
      'End-to-end purchase order workflow from draft request to received stock confirmation',
      'Automated low-stock warning center so purchasing teams know exactly when to reorder',
    ],
    // TODO(yoga): add buildNotes, e.g. "Built in 3 weeks · React · role-based access".
    // Stack names are limited here: src/core/inquiry.test.ts bans developer jargon in this file.
    links: {
      live: 'https://mini-erp-frontend-tau.vercel.app/',
    },
    screenshots: [
      {
        src: asset('img-16.webp'),
        alt: 'InventoryOS executive overview showing total stock value, daily movement trends, and product category breakdown',
      },
      {
        src: asset('img-17.webp'),
        alt: 'InventoryOS master product catalog with instant stock search, category filtering, and unit valuation',
      },
      {
        src: asset('img-18.webp'),
        alt: 'InventoryOS low-stock alert center highlighting items that have reached their reorder threshold',
      },
    ],
  },
  {
    id: 'ai-cv-screening',
    name: 'Allure Talent Evaluation System',
    // TODO(yoga): confirm this wording. The product name still contains "Allure";
    // consider renaming it so it does not read as a client engagement.
    tagline: 'Recruitment screening concept built around a real hiring workflow',
    category: 'Digital Experiences & Business Systems',
    type: 'Custom Business Tool & Workflow Automation',
    industry: 'Human Resources & Recruitment',
    workClassification: 'Self-initiated reference build · Live demo',
    status: 'live',
    featured: true,
    caseStudy: {
      challenge:
        'Hiring teams reviewing hundreds of resumes per job opening spend days reading differently formatted documents by hand, making it slow to shortlist qualified applicants and difficult to compare candidates fairly.',
      solution:
        'An intelligent recruitment workspace that automatically organizes incoming resumes into a clean, consistent profile format and evaluates each candidate against the clear job criteria set by the hiring manager.',
      intendedValue:
        'Reduces initial resume review time from hours to moments while giving hiring managers a clear, transparent comparison of top applicants and exportable evaluation summaries.',
      highlights:
        'Consistent applicant evaluation · Visual side-by-side candidate comparisons · Exportable hiring summaries',
    },
    deliverables: [
      'Recruitment dashboard summarizing open roles, total applicants, and top-matching candidates',
      'Automated resume reader that turns varied applicant files into clean, comparable profiles',
      'Clear, transparent scoring breakdown across skills, relevant experience, education, and role fit',
      'Side-by-side visual comparison charts and one-click summary exports for hiring reviews',
    ],
    // TODO(yoga): add buildNotes, e.g. "Built in 3 weeks · React · role-based access".
    // Stack names are limited here: src/core/inquiry.test.ts bans developer jargon in this file.
    links: {
      live: 'https://ai-powered-cv-screening-platform-fo.vercel.app',
    },
    screenshots: [
      {
        src: asset('img-19.webp'),
        alt: 'Allure Talent Evaluation System dashboard showing applicant summaries and top-3 candidate comparison chart',
      },
      {
        src: asset('img-20.webp'),
        alt: 'Allure Talent Evaluation System job criteria setup and transparent candidate evaluation breakdown',
      },
    ],
  },
  {
    id: 'brightpath-dental',
    name: 'BrightPath Clinic Website & Patient Portal',
    tagline: '24/7 Patient Inquiry Assistant & Appointment Booking Experience',
    category: 'Digital Experiences & Business Systems',
    type: 'Business Website & Customer Experience',
    industry: 'Healthcare & Dental Clinics',
    workClassification: 'Self-initiated reference build · Live demo',
    status: 'live',
    featured: true,
    caseStudy: {
      challenge:
        'Clinics and service businesses frequently lose prospective customers outside business hours when visitors cannot get immediate, trustworthy answers about treatments, pricing, and doctor availability without calling the front desk.',
      solution:
        'A modern, welcoming clinic website paired with a round-the-clock virtual patient assistant trained strictly on the clinic’s official treatment guide and pricing, connected directly to appointment booking and instant front-desk email alerts.',
      intendedValue:
        'Helps clinics serve prospective patients in both English and Bahasa Indonesia at any hour, turning website visitors into confirmed appointment requests while saving front-desk staff time.',
      highlights:
        '24/7 bilingual patient Q&A (EN / ID) · Seamless online appointment requests · Instant front-desk notifications',
    },
    deliverables: [
      'Modern, mobile-friendly clinic website presenting treatments, specialist profiles, and transparent pricing',
      '24/7 bilingual patient assistant that answers common questions accurately using verified clinic information',
      'Streamlined online appointment request form connected to automatic front-desk staff notifications',
      'Simple management view allowing clinic staff to update treatment guides and FAQs anytime',
    ],
    // TODO(yoga): add buildNotes, e.g. "Built in 3 weeks · React · role-based access".
    // Stack names are limited here: src/core/inquiry.test.ts bans developer jargon in this file.
    links: {
      live: 'https://brightpath-dental.vercel.app',
    },
    screenshots: [
      {
        src: asset('img-21.webp'),
        alt: 'BrightPath Dental modern clinic website hero with direct appointment booking and patient assistant access',
      },
      {
        src: asset('img-22.webp'),
        alt: 'BrightPath Dental virtual patient assistant answering treatment and pricing questions clearly',
      },
      {
        src: asset('img-23.webp'),
        alt: 'BrightPath Dental treatment catalog and specialist directory designed for patient clarity',
      },
    ],
  },
  {
    id: 'legacya-pos',
    name: 'Legacya Restaurant & Kitchen System',
    tagline: 'Connected Cashier, Kitchen Display & Daily Sales Platform',
    category: 'Digital Experiences & Business Systems',
    type: 'Custom Operations & Point-of-Sale System',
    industry: 'Food & Beverage · Hospitality',
    workClassification: 'Self-initiated reference build · Live demo',
    status: 'live',
    featured: true,
    caseStudy: {
      challenge:
        'Restaurants and cafes relying on handwritten paper tickets and standalone cash registers face frequent kitchen bottlenecks, missed order notes, and slow end-of-day sales reconciliation.',
      solution:
        'A connected restaurant operations platform linking three dedicated workspaces: the front-counter cashier screen, the live kitchen preparation display, and the owner’s daily sales dashboard, so every order flows smoothly from table to kitchen.',
      intendedValue:
        'Eliminates lost paper tickets, keeps kitchen preparation organized during peak hours, and gives restaurant owners real-time visibility into daily revenue and best-selling menu items.',
      highlights:
        '9 tailored operational screens · Connected Cashier, Kitchen & Owner views · Live order preparation timers',
    },
    deliverables: [
      'Fast front-of-house cashier terminal with table selection, menu modifiers, and receipt printing preview',
      'Live Kitchen Display screen showing active orders, preparation timers, and ready-to-serve status',
      'Owner business dashboard tracking daily sales revenue, popular menu categories, and order volume',
      'Dedicated staff views so cashiers, kitchen crew, and managers each see the exact screen they need',
    ],
    // TODO(yoga): add buildNotes, e.g. "Built in 3 weeks · React · role-based access".
    // Stack names are limited here: src/core/inquiry.test.ts bans developer jargon in this file.
    links: {
      live: 'https://legacya-pos-ui.vercel.app',
    },
    screenshots: [
      {
        src: asset('img-06.webp'),
        alt: 'Legacya Restaurant System cashier terminal with order builder, table assignment, and receipt preview',
      },
      {
        src: asset('img-07.webp'),
        alt: 'Legacya Restaurant System owner dashboard displaying daily revenue, category performance, and order volume',
      },
      {
        src: asset('img-08.webp'),
        alt: 'Legacya Restaurant System live kitchen display showing active order tickets and preparation timers',
      },
    ],
  },
]
