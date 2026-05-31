import type { FounderOSConfig } from '../types/os'
import { principles } from './principles'
import { identity } from './identity'

export const founderOS: FounderOSConfig = {
  name:    identity.founderOS.name,
  version: identity.founderOS.version,
  tagline: identity.founderOS.tagline,
  principles,
  workflow: [
    {
      step:        1,
      title:       'Problem Deconstruction',
      description: 'Break the problem into data entities, user roles, and system boundaries before writing a line of code.',
      aiRole:      'Claude drafts the PRD and maps system boundaries.',
      tools:       ['Claude', 'Miro'],
    },
    {
      step:        2,
      title:       'AI Architecture Design',
      description: 'Design the database schema, API contracts, and data flows. All agreed before implementation starts.',
      aiRole:      'Claude reviews schema for normalization issues, missing constraints, and security gaps.',
      tools:       ['Claude', 'dbdiagram.io'],
    },
    {
      step:        3,
      title:       'AI-Assisted Implementation',
      description: 'Backend and frontend built in parallel. AI reviews every significant PR before merge.',
      aiRole:      'Claude Code provides agentic coding, inline review, and catches logic bugs before production.',
      tools:       ['Claude Code', 'GitHub', 'Supabase'],
    },
    {
      step:        4,
      title:       'Deploy & Iterate',
      description: 'Ship to production, monitor, and iterate with data. Post-launch analysis drives the next cycle.',
      aiRole:      'Claude analyzes performance bottlenecks and proposes optimization strategies.',
      tools:       ['Vercel', 'Claude', 'Supabase Analytics'],
    },
  ],
  snapshot: {
    currentFocus: [
      { label: 'InventoryOS v2',        detail: 'Multi-tenant backend with Supabase RLS',  status: 'active' },
      { label: 'Founder OS Portfolio',  detail: `${identity.role} · React + TypeScript`,   status: 'active' },
    ],
    activeLearning: [
      { label: 'TypeScript Strict Mode',  detail: 'Types as AI communication layer',        status: 'active' },
      { label: 'Claude Code Workflows',   detail: 'Agentic CLI development patterns',       status: 'active' },
      { label: 'PostgreSQL Optimization', detail: 'Index strategies + EXPLAIN ANALYZE',     status: 'active' },
    ],
    tools: [
      { name: 'Claude',      role: 'Architecture + Code Review',   tier: 'primary'   },
      { name: 'Claude Code', role: 'AI-Native CLI Development',    tier: 'primary'   },
      { name: 'Supabase',    role: 'Backend + Database',           tier: 'primary'   },
      { name: 'Vercel',      role: 'Deployment',                   tier: 'primary'   },
      { name: 'n8n',         role: 'Automation',                   tier: 'secondary' },
    ],
    projectActivity: [
      { project: 'InventoryOS',     phase: 'v2 multi-tenant',      status: 'building'   },
      { project: 'Legacya POS',     phase: 'backend integration',  status: 'iterating'  },
      { project: 'Hybrid Dashboard',phase: 'production',           status: 'deployed'   },
      { project: 'daenuna.co',      phase: 'production',           status: 'deployed'   },
    ],
  },
}
