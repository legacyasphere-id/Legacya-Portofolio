/// <reference types="vite/client" />

export const asset = (path: string): string => {
  const base =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    typeof import.meta.env.BASE_URL === 'string'
      ? import.meta.env.BASE_URL
      : '/'
  return `${base}${path.replace(/^\//, '')}`
}
