import { en } from '../i18n/en.ts'
import { id } from '../i18n/id.ts'
import type { Lang } from '../i18n/context.tsx'

export type ServiceCategoryId =
  | 'digital-systems'
  | 'advertising-assets'
  | 'motion-animation'
  | 'cinematic-video'
  | 'combined-engagement'

export const SERVICE_CATEGORY_IDS: ServiceCategoryId[] = [
  'digital-systems',
  'advertising-assets',
  'motion-animation',
  'cinematic-video',
  'combined-engagement',
]

export interface ServiceOption {
  id: ServiceCategoryId
  label: string
  shortLabel: string
  summary: string
  objectives: string[]
}

function getDict(lang: Lang = 'en') {
  return lang === 'id' ? id : en
}

export function getServiceOptions(lang: Lang = 'en'): ServiceOption[] {
  const dict = getDict(lang)
  return SERVICE_CATEGORY_IDS.map((serviceId) => {
    const item = dict.inquiry.serviceOptions[serviceId]
    return {
      id: serviceId,
      label: item.label,
      shortLabel: item.shortLabel,
      summary: item.summary,
      objectives: [...item.objectives],
    }
  })
}

export function getTimelineOptions(lang: Lang = 'en'): readonly string[] {
  return getDict(lang).inquiry.timelineOptions
}

export const SERVICE_OPTIONS: ServiceOption[] = getServiceOptions('en')

export const TIMELINE_OPTIONS = en.inquiry.timelineOptions

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

export function resolveServiceId(serviceLabelOrId: string): ServiceCategoryId {
  const normalized = serviceLabelOrId.trim().toLowerCase()
  for (const serviceId of SERVICE_CATEGORY_IDS) {
    if (serviceId === normalized) return serviceId
    const enOpt = en.inquiry.serviceOptions[serviceId]
    const idOpt = id.inquiry.serviceOptions[serviceId]
    if (
      enOpt.label.toLowerCase() === normalized ||
      enOpt.shortLabel.toLowerCase() === normalized ||
      idOpt.label.toLowerCase() === normalized ||
      idOpt.shortLabel.toLowerCase() === normalized
    ) {
      return serviceId
    }
  }
  return 'digital-systems'
}

export function resolveObjectiveIndex(
  serviceId: ServiceCategoryId,
  objectiveText?: string,
): number {
  if (!objectiveText) return 0
  const normalized = objectiveText.trim().toLowerCase()
  const enObjs = en.inquiry.serviceOptions[serviceId].objectives
  const idObjs = id.inquiry.serviceOptions[serviceId].objectives
  const enIdx = enObjs.findIndex((o) => o.toLowerCase() === normalized)
  if (enIdx !== -1) return enIdx
  const idIdx = idObjs.findIndex((o) => o.toLowerCase() === normalized)
  if (idIdx !== -1) return idIdx
  return 0
}

export function getObjectivesForService(
  serviceLabelOrId: string,
  lang: Lang = 'en',
): string[] {
  const serviceId = resolveServiceId(serviceLabelOrId)
  return [...getDict(lang).inquiry.serviceOptions[serviceId].objectives]
}

export function resolveServiceLabel(
  serviceLabelOrId: string,
  lang: Lang = 'en',
): string {
  const serviceId = resolveServiceId(serviceLabelOrId)
  return getDict(lang).inquiry.serviceOptions[serviceId].label
}

export function validateInquiryInput(
  input: Pick<InquiryFormInput, 'name' | 'contactInfo'>,
  lang: Lang = 'en',
): ValidationResult {
  const v = getDict(lang).inquiry.validation
  if (!input.name.trim()) {
    return {
      valid: false,
      error: v.missingName,
    }
  }
  const contact = input.contactInfo.trim()
  if (!contact) {
    return {
      valid: false,
      error: v.missingContact,
    }
  }
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
  const isPhone = /^[+\d][\d\s\-()]{6,}$/.test(contact)
  if (!isEmail && !isPhone) {
    return {
      valid: false,
      error: v.invalidContact,
    }
  }
  return { valid: true, error: null }
}

export function composeInquiryBrief(
  input: InquiryFormInput,
  lang: Lang = 'en',
): string {
  const b = getDict(lang).inquiry.brief
  const lines = [
    b.greeting,
    ``,
    b.intro,
    `• ${b.name}: ${input.name.trim() || b.notSpecified}`,
    `• ${b.company}: ${input.company.trim() || b.notSpecified}`,
    `• ${b.contact}: ${input.contactInfo.trim() || b.notSpecified}`,
    `• ${b.service}: ${input.serviceCategory}`,
    `• ${b.objective}: ${input.objective}`,
    input.referenceWork ? `• ${b.referenceWork}: ${input.referenceWork}` : null,
    `• ${b.timeline}: ${input.timeline}`,
    input.notes.trim() ? `• ${b.notes}: ${input.notes.trim()}` : null,
  ].filter(Boolean)

  return lines.join('\n')
}
