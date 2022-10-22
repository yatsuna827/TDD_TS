import { type Currency, type Expression, type Money, money } from './money'
import { type Exchange } from './exchange'

type Reduce = <T extends Currency>(exp: Expression, currency: T) => Money<T>
type Reducer = {
  reduce: Reduce
}

const reduce = <T extends Currency>(exp: Expression, currency: T, exchange: Exchange): Money<T> => {
  if (exp.__tag == 'Money') {
    return exchange(exp, currency)
  } else {
    const { augend, addend } = exp
    const { amount: a } = reduce(augend, currency, exchange)
    const { amount: b } = reduce(addend, currency, exchange)

    return money(a + b, currency)
  }
}

export const getReducer = (exchange: Exchange): Reducer => ({
  reduce: (exp, currency) => reduce(exp, currency, exchange),
})
