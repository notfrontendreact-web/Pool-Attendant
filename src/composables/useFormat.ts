import { i18nState } from '../i18n'

export function formatPrice(price: number): string {
  const formatted = new Intl.NumberFormat('en-US').format(price)
  return i18nState.locale === 'fa' ? toPersianDigits(formatted) : formatted
}

export function toPersianDigits(input: string): string {
  const map = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return input.replace(/[0-9]/g, (d) => map[Number(d)])
}

export function formatPriceDisplay(price: number): string {
  const formatted = formatPrice(price)
  return i18nState.locale === 'fa' ? `${formatted} تومان` : `${formatted} Toman`
}
