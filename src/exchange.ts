import { type Currency, type Money, money } from './money'

type Rates = Record<`${Currency}:${Currency}`, number>
export type Exchange = <T extends Currency>(from: Money<Currency>, to: T) => Money<T>

export const toExchange: (rates: Rates) => Exchange = (rates) => (from, to) => {
  if (from.currency === to) return money(from.amount, to)

  const rate = rates[`${from.currency}:${to}`]
  return money(from.amount / rate, to)
}
