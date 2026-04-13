import type { PriceJson } from '../../../../api/types'

/**
 * PriceJson 객체를 사람이 읽기 좋은 문자열로 변환한다.
 * @example formatPrice({ amount: 4.5, currency: 'USD', unit: 'yd' }) → "USD 4.50 / yd"
 */
export const formatPrice = (price: PriceJson | null | undefined): string => {
  if (!price) return '—'
  return `${price.currency} ${price.amount.toFixed(2)} / ${price.unit}`
}

/**
 * Item의 단가(Decimal + unit string)를 표시 문자열로 변환한다.
 * @example formatItemPrice(4.5, 'USD/yd') → "USD 4.50 / yd"
 */
export const formatItemPrice = (price: number, unit: string): string => {
  const [currency, u] = unit.split('/')
  return `${currency} ${price.toFixed(2)} / ${u ?? unit}`
}

/** 원가 합계를 USD 기준으로 포맷한다. */
export const formatTotalCost = (amount: number): string =>
  `USD ${amount.toFixed(2)}`
