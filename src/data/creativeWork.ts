import type { CreativeWorkItem } from '../types/project'
import { en } from '../i18n/en'
import { id } from '../i18n/id'
import type { Lang } from '../i18n/context'
import { asset } from '../utils/asset'

type CreativeItemKey = keyof typeof en.creativeItems

interface CreativeItemBase {
  id: CreativeItemKey
  category: CreativeWorkItem['category']
  engagement: CreativeWorkItem['engagement']
  paletteHex: {
    primary: string
    secondary: string
    accent: string
  }
  aspectRatio: CreativeWorkItem['aspectRatio']
  mediaType: CreativeWorkItem['mediaType']
  videoUrl?: string
  previewImage: string
}

const CREATIVE_ITEM_BASES: CreativeItemBase[] = [
  {
    id: 'hanasui-cosmetic-campaign',
    category: 'Advertising & Campaign Assets',
    engagement: 'concept',
    paletteHex: {
      primary: '#7D4B3E',
      secondary: '#DFCBB8',
      accent: '#B57B6C',
    },
    aspectRatio: '4:3',
    mediaType: 'uploaded-media',
    previewImage: asset('creative-work/hanasui-product-ad.webp'),
  },
  {
    id: 'artisan-burger-campaign',
    category: 'Advertising & Campaign Assets',
    engagement: 'concept',
    paletteHex: {
      primary: '#14110F',
      secondary: '#E59A38',
      accent: '#B84A1E',
    },
    aspectRatio: '4:3',
    mediaType: 'uploaded-media',
    previewImage: asset('creative-work/burger-campaign.webp'),
  },
  {
    id: 'late-cold-brew-campaign',
    category: 'Advertising & Campaign Assets',
    engagement: 'concept',
    paletteHex: {
      primary: '#231C18',
      secondary: '#F3ECE1',
      accent: '#20334F',
    },
    aspectRatio: '9:16',
    mediaType: 'uploaded-media',
    previewImage: asset('creative-work/cold-brew-campaign.webp'),
  },
  {
    id: 'hanasui-cosmetic-commercial-video',
    category: 'Cinematic Video & Visual Production',
    engagement: 'concept',
    paletteHex: {
      primary: '#6E3E32',
      secondary: '#EAD9C8',
      accent: '#B57B6C',
    },
    aspectRatio: '9:16',
    mediaType: 'uploaded-media',
    videoUrl: asset('creative-work/cosmetic-commercial.mp4'),
    previewImage: asset('creative-work/cosmetic-poster.webp'),
  },
  {
    id: 'ethereal-bloom-perfume-commercial',
    category: 'Cinematic Video & Visual Production',
    engagement: 'concept',
    paletteHex: {
      primary: '#1E3824',
      secondary: '#F4F6EC',
      accent: '#C5A654',
    },
    aspectRatio: '9:16',
    mediaType: 'uploaded-media',
    videoUrl: asset('creative-work/perfume-commercial.mp4'),
    previewImage: asset('creative-work/perfume-poster.webp'),
  },
  {
    id: 'artisan-burger-commercial-video',
    category: 'Cinematic Video & Visual Production',
    engagement: 'concept',
    paletteHex: {
      primary: '#1A130E',
      secondary: '#E59A38',
      accent: '#4A7C36',
    },
    aspectRatio: '9:16',
    mediaType: 'uploaded-media',
    videoUrl: asset('creative-work/burger-commercial.mp4'),
    previewImage: asset('creative-work/burger-poster.webp'),
  },
]

export function getCreativeWorkItems(lang: Lang = 'en'): CreativeWorkItem[] {
  const dict = lang === 'id' ? id : en
  return CREATIVE_ITEM_BASES.map((base) => {
    const copy = dict.creativeItems[base.id]
    return {
      id: base.id,
      title: copy.title,
      brandOrConcept: copy.brandOrConcept,
      category: base.category,
      format: copy.format,
      classification: 'Conceptual Campaign Study',
      engagement: base.engagement,
      availabilityStatus: 'Available Now',
      objective: copy.objective,
      creativeDirection: copy.creativeDirection,
      deliverables: [...copy.deliverables],
      intendedValue: copy.intendedValue,
      palette: {
        ...base.paletteHex,
        label: copy.paletteLabel,
      },
      aspectRatio: base.aspectRatio,
      mediaType: base.mediaType,
      videoUrl: base.videoUrl,
      previewImage: base.previewImage,
      storyboardFrames: copy.storyboardFrames.map((f) => ({ ...f })),
    }
  })
}

export const CREATIVE_WORK_ITEMS: CreativeWorkItem[] = getCreativeWorkItems('en')
