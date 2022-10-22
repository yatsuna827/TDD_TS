import { type Currency, type Money, money } from './money'

export type Sum = {
  augend: Expression
  addend: Expression
  __tag: 'Sum'
}

export type Expression = Money<Currency> | Sum

const sum = (augend: Expression, addend: Expression): Sum => ({ augend, addend, __tag: 'Sum' })
export const times = <T extends Currency>({ amount, currency }: Money<T>, multiplier: number): Money<T> => money(amount * multiplier, currency)
export const plus = (first: Expression, ...rest: [Expression, ...Expression[]]): Expression => {
  const [second, ...r] = rest
  const s = sum(first, second)
  return r.length == 0 ? s : plus(s, ...(r as [Expression, ...Expression[]])) // これはTSの推論力不足を補うための仕方のないas
}
