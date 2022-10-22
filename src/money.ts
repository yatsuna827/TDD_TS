type Currency = 'USD' | 'CHF'

type Money<T extends Currency> = {
  amount: number
  currency: T
}

export const doller = (amount: number): Money<'USD'> => ({ amount, currency: 'USD' })
export const franc = (amount: number): Money<'CHF'> => ({ amount, currency: 'CHF' })
export const times = <T extends Currency>(money: Money<T>, multiplier: number): Money<T> => ({ amount: money.amount * multiplier, currency: money.currency })
