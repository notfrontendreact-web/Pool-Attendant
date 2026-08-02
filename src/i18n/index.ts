import { reactive, computed } from 'vue'
import { translations, type Locale } from './translations'

interface I18nState {
  locale: Locale
}

const state = reactive<I18nState>({
  locale: 'fa',
})

export function setLocale(locale: Locale) {
  state.locale = locale
  document.documentElement.lang = locale
  document.documentElement.dir = translations[locale].dir as string
}

export function toggleLocale() {
  setLocale(state.locale === 'fa' ? 'en' : 'fa')
}

export function t(key: string): string {
  const keys = key.split('.')
  let result: unknown = translations[state.locale]
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  return typeof result === 'string' ? result : key
}

export function useI18n() {
  return {
    locale: computed(() => state.locale),
    t,
    setLocale,
    toggleLocale,
  }
}

export { state as i18nState }
