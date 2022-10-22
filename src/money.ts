export type Currency = 'USD' | 'CHF'

export type Money<T extends Currency> = {
  amount: number
  currency: T
  __tag: 'Money'
}

export const money = <T extends Currency>(amount: number, currency: T): Money<T> => ({ amount, currency, __tag: 'Money' })
