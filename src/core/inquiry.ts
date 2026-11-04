export type ServiceCategoryId =
  | 'digital-systems'
  | 'advertising-assets'
  | 'cinematic-video'
  | 'combined-engagement'

export interface ServiceOption {
  id: ServiceCategoryId
  label: string
  shortLabel: string
  summary: string
  objectives: string[]
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'digital-systems',
    label: 'Digital Experiences & Business Systems',
    shortLabel: 'Digital & Business Systems',
    summary:
      'Websites, customer portals, internal tools and workflow automation.',
    objectives: [
      'Launch or modernize a company website & digital customer experience',
      'Replace manual spreadsheets with a connected internal business system',
      'Simplify repetitive daily workflows & customer inquiry handling',
      'Unify sales, stock, or operations into one central dashboard',
    ],
  },
  {
    id: 'advertising-assets',
    label: 'Advertising & Campaign Assets',
    shortLabel: 'Advertising & Campaign Assets',
    summary:
      'Campaign key visuals, product imagery and social ad creatives.',
    objectives: [
      'Develop visual concepts and campaign imagery for an upcoming product launch',
      'Create high-impact product and promotional visuals for digital advertising',
      'Produce cohesive social media advertising assets for a campaign',
      'Establish visual direction and campaign materials to grow brand awareness',
    ],
  },
  {
    id: 'cinematic-video',
    label: 'Cinematic Video & Visual Production',
    shortLabel: 'Cinematic Video & Production',
    summary:
      'Short product films, vertical reels and motion storyboards.',
    objectives: [
      'Produce a cinematic advertising video or product promotional film',
      'Create short-form campaign videos and cinematic social media reels',
      'Develop a visual brand story or launch film for a product',
      'Explore visual storyboards and motion concepts for a campaign',
    ],
  },
  {
    id: 'combined-engagement',
    label: 'Combined Brand, Creative & Digital Engagement',
    shortLabel: 'Combined Studio Partnership',
    summary:
      'Website or internal tool plus launch visuals and video in one scope.',
    objectives: [
      'Launch a brand or product with both a website and campaign visuals',
      'Refresh digital presence alongside coordinated advertising & video assets',
      'Partner on ongoing digital improvements and seasonal campaign production',
    ],
  },
]

export const TIMELINE_OPTIONS = [
  'Immediate (Ready to start within 1 to 2 weeks)',
  'Within 30 Days',
  '1 to 3 Months (Planning upcoming launch or quarter)',
  'Flexible / Exploring options & scope',
] as const

export interface InquiryFormInput {
  serviceCategory: string
  objective: string
  timeline: string
  referenceWork?: string
  name: string
  company: string
  contactInfo: string
  notes: string
}

export interface ValidationResult {
  valid: boolean
  error: string | null
}

export function getObjectivesForService(serviceLabelOrId: string): string[] {
  const found = SERVICE_OPTIONS.find(
    (s) =>
      s.id === serviceLabelOrId ||
      s.label.toLowerCase() === serviceLabelOrId.toLowerCase() ||
      s.shortLabel.toLowerCase() === serviceLabelOrId.toLowerCase(),
  )
  return found ? found.objectives : SERVICE_OPTIONS[0].objectives
}

export function resolveServiceLabel(serviceLabelOrId: string): string {
  const found = SERVICE_OPTIONS.find(
    (s) =>
      s.id === serviceLabelOrId ||
      s.label.toLowerCase() === serviceLabelOrId.toLowerCase() ||
      s.shortLabel.toLowerCase() === serviceLabelOrId.toLowerCase(),
  )
  return found ? found.label : SERVICE_OPTIONS[0].label
}

export function validateInquiryInput(input: Pick<InquiryFormInput, 'name' | 'contactInfo'>): ValidationResult {
  if (!input.name.trim()) {
    return {
      valid: false,
      error: 'Please enter your name so I know how to address you.',
    }
  }
  const contact = input.contactInfo.trim()
  if (!contact) {
    return {
      valid: false,
      error: 'Please provide your email or WhatsApp number so I can reply.',
    }
  }
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
  const isPhone = /^[+\d][\d\s\-()]{6,}$/.test(contact)
  if (!isEmail && !isPhone) {
    return {
      valid: false,
      error: 'Please enter a valid email address (e.g. name@company.com) or phone/WhatsApp number.',
    }
  }
  return { valid: true, error: null }
}

export function composeInquiryBrief(input: InquiryFormInput): string {
  const lines = [
    `Hello Yoga (Legacya Sphere),`,
    ``,
    `I would like to discuss a project with you:`,
    `• Name: ${input.name.trim() || 'Not specified'}`,
    `• Business / Brand: ${input.company.trim() || 'Not specified'}`,
    `• Contact (Email / WhatsApp): ${input.contactInfo.trim() || 'Not specified'}`,
    `• Service of Interest: ${input.serviceCategory}`,
    `• Primary Objective: ${input.objective}`,
    input.referenceWork ? `• Reference Work: ${input.referenceWork}` : null,
    `• Desired Timeline: ${input.timeline}`,
    input.notes.trim() ? `• Project Context & Goals: ${input.notes.trim()}` : null,
  ].filter(Boolean)

  return lines.join('\n')
}
