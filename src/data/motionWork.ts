import type { MotionWorkItem } from '../types/project'
import type { Lang } from '../i18n/context'
import { SHOW_MOTION_WORK } from '../core/identity'

/**
 * Motion animation showcase items for `#motion-work` on `/work`.
 *
 * TODO(yoga): Attach the real motion animation source files (MP4/WebM loops or
 * interactive canvas/Lottie mounts) and approved titles/descriptions here, then
 * flip `SHOW_MOTION_WORK = true` in `src/core/identity.ts`.
 *
 * All paths must go through `asset('...')` from `../utils/asset`.
 */
const MOTION_WORK_ITEMS_EN: MotionWorkItem[] = [
  // TODO(yoga): Add motion animation item 1 (id, title, subtitle, format, sourceUrl, posterImage, deliverables, notes)
]

const MOTION_WORK_ITEMS_ID: MotionWorkItem[] = [
  // TODO(yoga): Add Indonesian copy for motion animation item 1 matching MOTION_WORK_ITEMS_EN
]

export function getMotionWorkItems(lang: Lang = 'en'): MotionWorkItem[] {
  if (!SHOW_MOTION_WORK) {
    return []
  }
  return lang === 'id' ? MOTION_WORK_ITEMS_ID : MOTION_WORK_ITEMS_EN
}
