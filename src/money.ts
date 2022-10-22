type Currency = 'USD' | 'CHF'

type Money<T extends Currency> = {
  amount: number
  currency: T
}

const money = <T extends Currency>(amount: number, currency: T): Money<T> => ({ amount, currency })
export const doller = (amount: number): Money<'USD'> => money(amount, 'USD')
export const franc = (amount: number): Money<'CHF'> => money(amount, 'CHF')
export const times = <T extends Currency>({ amount, currency }: Money<T>, multiplier: number): Money<T> => money(amount * multiplier, currency)
export const plus = (augend: Money<any>, addend: Money<any>): Money<any> => money(augend.amount + addend.amount, augend.currency)
