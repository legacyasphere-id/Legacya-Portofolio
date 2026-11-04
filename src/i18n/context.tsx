import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { en, type Dictionary } from './en'
import { id } from './id'

export type Lang = 'en' | 'id'

const STORAGE_KEY = 'legacya-lang'

function getInitialLanguage(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'id') {
      return saved
    }
  } catch {
    // Storage access blocked or unavailable
  }

  if (typeof navigator !== 'undefined' && navigator.language) {
    if (navigator.language.toLowerCase().startsWith('id')) {
      return 'id'
    }
  }

  return 'en'
}

interface LanguageContextValue {
  lang: Lang
  setLang: (next: Lang) => void
  toggleLang: () => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLanguage)

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage access blocked or unavailable
    }
  }

  const toggleLang = () => {
    setLang(lang === 'en' ? 'id' : 'en')
  }

  const t = lang === 'id' ? id : en

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
  }, [lang, t])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useT(): LanguageContextValue {
  return useContext(LanguageContext)
}
