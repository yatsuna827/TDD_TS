import { type Currency, type Money, money } from './money'

export type Sum = {
  augend: Expression
  addend: Expression
  __tag: 'Sum'
}

export type Expression = Money<Currency> | Sum

const sum = (augend: Expression, addend: Expression): Sum => ({ augend, addend, __tag: 'Sum' })

type MultRet<E extends Expression> = E extends Money<infer T> ? Money<T> : Sum
export const times = <E extends Expression>(exp: E, multiplier: number): MultRet<E> => {
  if (exp.__tag === 'Money') {
    const { amount, currency } = exp
    return money(amount * multiplier, currency) as MultRet<E>
  } else {
    const { augend, addend } = exp
    return sum(times(augend, multiplier), times(addend, multiplier)) as MultRet<E>
  }
}

export const plus = (first: Expression, ...rest: [Expression, ...Expression[]]): Expression => {
  const [second, ...r] = rest
  const s = sum(first, second)
  return r.length == 0 ? s : plus(s, ...(r as [Expression, ...Expression[]])) // これはTSの推論力不足を補うための仕方のないas
}
