import { i18nState } from '../i18n'
import { translations } from '../i18n/translations'

interface SeoOptions {
  titleFa?: string
  titleEn?: string
  descriptionFa?: string
  descriptionEn?: string
  image?: string
  type?: string
}

function ensureMeta(attr: 'name' | 'property', key: string): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  return el
}

function ensureLink(rel: string): HTMLLinkElement {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  return el
}

function ensureScript(type: string): HTMLScriptElement {
  let el = document.head.querySelector<HTMLScriptElement>(`script[type="${type}"]`)
  if (!el) {
    el = document.createElement('script')
    el.setAttribute('type', type)
    document.head.appendChild(el)
  }
  return el
}

export function updateSeo(options: SeoOptions) {
  const locale = i18nState.locale
  const t = translations[locale]

  const title = locale === 'fa' ? (options.titleFa ?? t.siteName as string) : (options.titleEn ?? t.siteName as string)
  const description = locale === 'fa'
    ? (options.descriptionFa ?? 'استخر‌بان مرجع تخصصی فروش لوازم و تجهیزات استخر و شنا با کیفیت تضمینی و قیمت مناسب.')
    : (options.descriptionEn ?? 'PoolHub is your trusted source for premium pool and swimming equipment with guaranteed quality and fair prices.')

  document.title = title

  ensureMeta('name', 'description').content = description
  ensureMeta('name', 'keywords').content = locale === 'fa'
    ? 'لوازم استخر, تجهیزات استخر, عینک شنا, مایو, پمپ تصفیه, نظافت استخر, استخر بان'
    : 'pool equipment, swimming gear, swim goggles, swimwear, pool pump, pool cleaning, pool supplies'

  ensureMeta('property', 'og:title').content = title
  ensureMeta('property', 'og:description').content = description
  ensureMeta('property', 'og:type').content = options.type ?? 'website'
  ensureMeta('property', 'og:site_name').content = t.siteName as string

  if (options.image) {
    ensureMeta('property', 'og:image').content = options.image
  }

  ensureLink('canonical').href = window.location.href

  ensureMeta('name', 'twitter:card').content = 'summary_large_image'
  ensureMeta('name', 'twitter:title').content = title
  ensureMeta('name', 'twitter:description').content = description

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: t.siteName,
    description,
    url: window.location.origin,
  }
  ensureScript('application/ld+json').textContent = JSON.stringify(jsonLd)
}

export function updateProductSeo(productName: string, description: string, image: string) {
  ensureMeta('property', 'og:type').content = 'product'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description,
    image,
    brand: { '@type': 'Brand', name: 'PoolHub' },
  }
  ensureScript('application/ld+json').textContent = JSON.stringify(jsonLd)
}
