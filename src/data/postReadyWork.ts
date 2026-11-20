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
 */
export const POST_READY_ENTRIES: PostReadyEntry[] = [
  {
    // TODO(yoga): Swap in the newer Halyard Coastal overview (with caption B) once finalized.
    id: 'halyard-coastal',
    imagePath: 'creative-work/halyard-coastal-carousel-v1.webp',
    brand: 'Halyard Coastal',
    en: {
      title: 'Nine-slide coastal duffel bag carousel',
      alt: 'Halyard Coastal nine-slide carousel showing a navy waxed canvas duffel bag with rope handles and brass eyelets across pier, coastal rock, boat, dock and macro texture frames',
    },
    idCopy: {
      title: 'Carousel tas duffel pesisir sembilan slide',
      alt: 'Carousel sembilan slide Halyard Coastal yang menampilkan tas duffel kanvas biru tua bertali tambang dan lubang kancing kuningan di dermaga, batu karang, perahu, dan detail tekstur makro',
    },
  },
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
  {
    id: 'vela',
    imagePath: 'creative-work/vela-bottle-carousel-v1.webp',
    brand: 'Vela',
    en: {
      title: 'Six-slide matte black bottle carousel',
      alt: 'Vela six-slide carousel showing a matte black bottle with a steel cap and carry loop across sunlit concrete, condensation macro, court-side still life and athletic lifestyle frames',
    },
    idCopy: {
      title: 'Carousel botol hitam matte enam slide',
      alt: 'Carousel enam slide Vela yang menampilkan botol hitam matte bertutup baja dengan tali jinjing dalam bidikan beton pagi, detail embun makro, sisi lapangan dan potret olahraga',
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
