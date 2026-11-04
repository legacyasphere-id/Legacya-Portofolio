import type { Project } from '../types/project'
import { en } from '../i18n/en'
import { id } from '../i18n/id'
import type { Lang } from '../i18n/context'
import { asset } from '../utils/asset'

type ProjectKey = keyof typeof en.projects

interface ProjectBase {
  id: ProjectKey
  category: Project['category']
  engagement: Project['engagement']
  status: Project['status']
  featured: boolean
  links: Project['links']
  screenshotSrcs: string[]
}

const PROJECT_BASES: ProjectBase[] = [
  {
    id: 'inventory-os',
    category: 'Digital Experiences & Business Systems',
    engagement: 'reference',
    status: 'live',
    featured: true,
    // TODO(yoga): add buildNotes, e.g. "Built in 3 weeks · React · role-based access".
    // Stack names are limited here: src/core/inquiry.test.ts bans developer jargon in this file.
    links: {
      live: 'https://mini-erp-frontend-tau.vercel.app/',
    },
    screenshotSrcs: [
      asset('img-16.webp'),
      asset('img-17.webp'),
      asset('img-18.webp'),
    ],
  },
  {
    id: 'ai-cv-screening',
    // TODO(yoga): confirm this wording. The product name still contains "Allure";
    // consider renaming it so it does not read as a client engagement.
    category: 'Digital Experiences & Business Systems',
    engagement: 'reference',
    status: 'live',
    featured: true,
    // TODO(yoga): add buildNotes, e.g. "Built in 3 weeks · React · role-based access".
    // Stack names are limited here: src/core/inquiry.test.ts bans developer jargon in this file.
    links: {
      live: 'https://ai-powered-cv-screening-platform-fo.vercel.app',
    },
    screenshotSrcs: [
      asset('img-19.webp'),
      asset('img-20.webp'),
    ],
  },
  {
    id: 'brightpath-dental',
    category: 'Digital Experiences & Business Systems',
    engagement: 'reference',
    status: 'live',
    featured: true,
    // TODO(yoga): add buildNotes, e.g. "Built in 3 weeks · React · role-based access".
    // Stack names are limited here: src/core/inquiry.test.ts bans developer jargon in this file.
    links: {
      live: 'https://brightpath-dental.vercel.app',
    },
    screenshotSrcs: [
      asset('img-21.webp'),
      asset('img-22.webp'),
      asset('img-23.webp'),
    ],
  },
  {
    id: 'legacya-pos',
    category: 'Digital Experiences & Business Systems',
    engagement: 'reference',
    status: 'live',
    featured: true,
    // TODO(yoga): add buildNotes, e.g. "Built in 3 weeks · React · role-based access".
    // Stack names are limited here: src/core/inquiry.test.ts bans developer jargon in this file.
    links: {
      live: 'https://legacya-pos-ui.vercel.app',
    },
    screenshotSrcs: [
      asset('img-06.webp'),
      asset('img-07.webp'),
      asset('img-08.webp'),
    ],
  },
]

export function getProjects(lang: Lang = 'en'): Project[] {
  const dict = lang === 'id' ? id : en
  return PROJECT_BASES.map((base) => {
    const copy = dict.projects[base.id]
    return {
      id: base.id,
      name: copy.name,
      tagline: copy.tagline,
      category: base.category,
      type: copy.type,
      industry: copy.industry,
      workClassification: copy.workClassification,
      engagement: base.engagement,
      status: base.status,
      featured: base.featured,
      caseStudy: { ...copy.caseStudy },
      deliverables: [...copy.deliverables],
      links: base.links,
      screenshots: base.screenshotSrcs.map((src, i) => ({
        src,
        alt: copy.screenshotAlts[i] ?? copy.name,
      })),
    }
  })
}

export const projects: Project[] = getProjects('en')
