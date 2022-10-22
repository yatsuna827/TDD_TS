type Currency = 'USD' | 'CHF'

type Money<T extends Currency> = {
  amount: number
  currency: T
  __tag: 'Money'
}

type Sum = {
  augend: Expression
  addend: Expression
  __tag: 'Sum'
}

type Expression = Money<Currency> | Sum

const money = <T extends Currency>(amount: number, currency: T): Money<T> => ({ amount, currency, __tag: 'Money' })
const sum = (augend: Expression, addend: Expression): Sum => ({ augend, addend, __tag: 'Sum' })
export const doller = (amount: number): Money<'USD'> => money(amount, 'USD')
export const franc = (amount: number): Money<'CHF'> => money(amount, 'CHF')
export const times = <T extends Currency>({ amount, currency }: Money<T>, multiplier: number): Money<T> => money(amount * multiplier, currency)
export const plus = (first: Expression, ...rest: [Expression, ...Expression[]]): Expression => {
  const [second, ...r] = rest
  const s = sum(first, second)
  return r.length == 0 ? s : plus(s, ...(r as [Expression, ...Expression[]])) // これはTSの推論力不足を補うための仕方のないas
}

export const reduce = <T extends Currency>(exp: Expression, currency: T): Money<T> => {
  if (exp.__tag == 'Money') {
    return { ...exp, currency }
  } else {
    const { augend, addend } = exp
    const { amount: a } = reduce(augend, currency)
    const { amount: b } = reduce(addend, currency)

    return money(a + b, currency)
  }
}
