import { type Currency, type Money, money } from './money'
import type { Unit, Eq } from './utilityTypes'

type Sum = {
  augend: Expression
  addend: Expression
  __tag: 'Sum'
}

export type Expression = Money<'CHF'> | Money<'USD'> | Sum

type SumRet<E1 extends Expression, E2 extends Expression> = Eq<E1, E2> extends true
  ? E1 extends Money<infer T>
    ? Unit<T, Currency> extends true
      ? Money<T>
      : Expression
    : Expression
  : Expression

export const add = <E1 extends Expression, E2 extends Expression>(augend: E1, addend: E2): SumRet<E1, E2> => {
  if (augend.__tag === 'Money' && addend.__tag === 'Money' && augend.currency == addend.currency) {
    if (augend.currency === 'CHF') return money(augend.amount + addend.amount, augend.currency) as SumRet<E1, E2>
  }
  return { augend, addend, __tag: 'Sum' } as SumRet<E1, E2>
}

type MultRet<E extends Expression> = E extends Money<infer T> ? Money<T> : Expression
export const times = <E extends Expression>(exp: E, multiplier: number): MultRet<E> => {
  if (exp.__tag === 'Money') {
    const { amount, currency } = exp
    return money(amount * multiplier, currency) as MultRet<E>
  } else {
    const { augend, addend } = exp
    return add(times(augend, multiplier), times(addend, multiplier)) as MultRet<E>
  }
}

export const plus = (first: Expression, ...rest: [Expression, ...Expression[]]): Expression => {
  const [second, ...r] = rest
  const s = add(first, second)
  return r.length == 0 ? s : plus(s, ...(r as [Expression, ...Expression[]])) // これはTSの推論力不足を補うための仕方のないas
}

type CMoney<T extends Currency> = Unit<T, Currency> extends true ? Money<T> : never
const s = <T extends Currency>(m1: CMoney<T>, m2: CMoney<T>): Money<T> => {
  return money(m1.amount + m2.amount, m1.currency)
}

const d1 = money(1, 'USD')
const d2 = money(2, 'USD')

const a = s(d1, d2)
