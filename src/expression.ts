import { type Currency, type Money, money } from './money'
import type { Unit, Eq } from './utilityTypes'

export type Sum = {
  augend: Expression
  addend: Expression
  __tag: 'Sum'
}

export type Expression = Money<Currency> | Sum

type SumRet<E1 extends Expression, E2 extends Expression> = Eq<E1, E2> extends true
  ? E1 extends Money<infer T>
    ? Unit<T, Currency> extends true
      ? Money<T>
      : Sum
    : Sum
  : Sum

export const add = <E1 extends Expression, E2 extends Expression>(augend: E1, addend: E2): SumRet<E1, E2> => {
  if (augend.__tag === 'Money' && addend.__tag === 'Money' && augend.currency == addend.currency) {
    return money(augend.amount + addend.amount, augend.currency) as SumRet<E1, E2>
  }
  return { augend, addend, __tag: 'Sum' } as SumRet<E1, E2>
}

type MultRet<E extends Expression> = E extends Money<infer T> ? Money<T> : Sum
export const times = <E extends Expression>(exp: E, multiplier: number): MultRet<E> => {
  if (exp.__tag === 'Money') {
    const { amount, currency } = exp
    return money(amount * multiplier, currency) as MultRet<E>
  } else {
    const { augend, addend } = exp
    return add(times(augend, multiplier), times(addend, multiplier)) as MultRet<E>
  }
}

export const plus = (first: Expression, ...rest: [Expression, ...Expression[]]): Sum => {
  const [second, ...r] = rest
  const s = add(first, second)
  return r.length == 0 ? s : plus(s, ...(r as [Expression, ...Expression[]])) // これはTSの推論力不足を補うための仕方のないas
}
