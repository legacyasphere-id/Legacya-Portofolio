import { useEffect, useState } from 'react'

export type RoutePath = '/' | '/work'

export interface RouteState {
  route: RoutePath
  pathname: string
  search: string
  hash: string
  navType: 'initial' | 'push' | 'pop'
  savedScrollY?: number
}

export function getBaseUrl(): string {
  if (
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    typeof import.meta.env.BASE_URL === 'string' &&
    import.meta.env.BASE_URL.length > 0
  ) {
    return import.meta.env.BASE_URL
  }
  return '/'
}

/**
 * Strips the configured Vite base path (e.g. `/` or `/Legacya-Portofolio/`)
 * from a URL pathname and normalizes trailing slashes.
 */
export function stripBasePath(
  pathname: string,
  baseUrl: string = getBaseUrl(),
): string {
  const basePrefix = baseUrl.replace(/\/+$/, '')
  let clean = pathname.startsWith('/') ? pathname : `/${pathname}`

  if (basePrefix.length > 0) {
    if (clean === basePrefix || clean === `${basePrefix}/`) {
      return '/'
    }
    if (clean.startsWith(`${basePrefix}/`)) {
      clean = clean.slice(basePrefix.length)
    }
  }

  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.replace(/\/+$/, '') || '/'
  }

  return clean || '/'
}

/**
 * Maps any browser pathname to one of the supported routes (`/` or `/work`).
 * Any unknown path falls back to the home page (`/`).
 */
export function resolveRoute(
  pathname: string,
  baseUrl: string = getBaseUrl(),
): RoutePath {
  return stripBasePath(pathname, baseUrl) === '/work' ? '/work' : '/'
}

/**
 * Prefixes an app-internal target (such as `/`, `/work`, `/#about`, or
 * `/work?project=inventory-os`) with the active Vite base path.
 */
export function withBasePath(
  to: string,
  baseUrl: string = getBaseUrl(),
): string {
  const basePrefix = baseUrl.replace(/\/+$/, '')
  if (to.startsWith('#')) {
    return `${basePrefix}/${to}`
  }
  const normalized = to.startsWith('/') ? to : `/${to}`
  return `${basePrefix}${normalized}`
}

function readWindowRoute(
  navType: RouteState['navType'] = 'initial',
  savedScrollY?: number,
): RouteState {
  if (typeof window === 'undefined') {
    return {
      route: '/',
      pathname: '/',
      search: '',
      hash: '',
      navType,
    }
  }
  return {
    route: resolveRoute(window.location.pathname),
    pathname: stripBasePath(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash,
    navType,
    savedScrollY,
  }
}

type RouteListener = (state: RouteState) => void
const listeners = new Set<RouteListener>()
let popstateBound = false

function ensurePopstateListener() {
  if (popstateBound || typeof window === 'undefined') return
  popstateBound = true
  window.addEventListener('popstate', (e: PopStateEvent) => {
    const savedScrollY =
      e.state && typeof e.state.scrollY === 'number'
        ? (e.state.scrollY as number)
        : undefined
    const nextState = readWindowRoute('pop', savedScrollY)
    listeners.forEach((fn) => fn(nextState))
  })
}

export function navigate(to: string) {
  if (typeof window === 'undefined') return
  ensurePopstateListener()

  try {
    window.history.replaceState(
      { ...(window.history.state || {}), scrollY: window.scrollY },
      '',
    )
  } catch {
    // Ignore history state errors
  }

  const targetHref = withBasePath(to)
  window.history.pushState({ scrollY: 0 }, '', targetHref)

  const nextState = readWindowRoute('push')
  listeners.forEach((fn) => fn(nextState))
}

export function useRoute(): RouteState {
  const [state, setState] = useState<RouteState>(() => readWindowRoute('initial'))

  useEffect(() => {
    ensurePopstateListener()
    const listener: RouteListener = (next) => setState(next)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return state
}
