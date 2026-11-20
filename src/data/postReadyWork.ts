import type { PostReadyWorkItem } from '../types/project'
import type { Lang } from '../i18n/context'
import { asset } from '../utils/asset'

interface PostReadyEntry {
  id: string
  /** Path relative to public/, resolved through asset() */
  imagePath: string
  brand: string
  en: {
    title: string
    alt: string
  }
  idCopy: {
    title: string
    alt: string
  }
}

/**
 * Post-ready brand concept cards for the home showcase.
 * Adding a new card is a one-entry addition below; the showcase row adapts
 * automatically to 2, 3, 4 or more entries.
 *
 * These are standalone brand concepts, separate from the raw visual campaign studies.
 *
 * TODO(yoga): Add Halyard Coastal once the updated overview (after caption B) is ready
 * (folder: 2026-11-19_LIFE02_Halyard_Coastal; do not publish overview_v1.png).
 * TODO(yoga): Add Vela once posted (new brand concept, not published yet).
 */
export const POST_READY_ENTRIES: PostReadyEntry[] = [
  {
    id: 'lanai-motion',
    imagePath: 'creative-work/lanai-motion-overview-v1.webp',
    brand: 'Lanai Motion',
    en: {
      title: 'Nine-slide sneaker lookbook carousel',
      alt: 'Lanai Motion nine-slide carousel overview showing a white leather sneaker with a neon heel tab across profile, flat-lay, heel, sole, macro toe-box and stair-step frames',
    },
    idCopy: {
      title: 'Carousel lookbook sneaker sembilan slide',
      alt: 'Ringkasan carousel sembilan slide Lanai Motion yang menampilkan sneaker kulit putih beraksen tab tumit neon dari sudut samping, flat-lay, tumit, sol, detail makro ujung sepatu dan langkah di tangga',
    },
  },
  {
    id: 'marea-watch',
    imagePath: 'creative-work/marea-watch-overview-v1.webp',
    brand: 'Marea Watch',
    en: {
      title: 'Seven-slide leather strap watch carousel',
      alt: 'Marea Watch seven-slide carousel overview showing a silver-dial watch with a brown leather strap across flat-lay, close-up dial and on-wrist shots with bold navy and coral typography',
    },
    idCopy: {
      title: 'Carousel jam tangan tali kulit tujuh slide',
      alt: 'Ringkasan carousel tujuh slide Marea Watch yang menampilkan jam tangan dial perak bertali kulit cokelat dalam bidikan datar, detail dial jarak dekat dan pemakaian di pergelangan tangan dengan tipografi biru tua dan koral',
    },
  },
]

export function getPostReadyWorkItems(lang: Lang = 'en'): PostReadyWorkItem[] {
  return POST_READY_ENTRIES.map((entry) => {
    const copy = lang === 'id' ? entry.idCopy : entry.en
    return {
      id: entry.id,
      brand: entry.brand,
      title: copy.title,
      alt: copy.alt,
      image: asset(entry.imagePath),
      engagement: 'concept',
    }
  })
}
