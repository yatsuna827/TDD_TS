import { money, type Money } from './money'
import { times, plus, add, type Expression } from './expression'
import { toExchange } from './exchange'
import { getReducer } from './reduce'

describe('Money', () => {
  const { reduce } = getReducer(
    toExchange({
      'CHF:USD': 2,
      'USD:CHF': 1 / 2,
      'USD:USD': 1,
      'CHF:CHF': 1,
    })
  )

  it('test multiplication', () => {
    const five: Money<'USD'> = money(5, 'USD')
    const ten: Money<'USD'> = times(five, 2)
    const fifteen: Money<'USD'> = times(five, 3)
    expect(ten).toEqual(money(10, 'USD'))
    expect(fifteen).toEqual(money(15, 'USD'))
  })
  it('test Franc multiplication', () => {
    const five: Money<'CHF'> = money(5, 'CHF')
    const ten: Money<'CHF'> = times(five, 2)
    const fifteen: Money<'CHF'> = times(five, 3)
    expect(ten).toEqual(money(10, 'CHF'))
    expect(fifteen).toEqual(money(15, 'CHF'))
  })
  it('test simple addition', () => {
    const sum: Money<'USD'> = add(money(5, 'USD'), money(5, 'USD'))
    expect(sum).toEqual(money(10, 'USD'))
  })
  it('test multiple addition', () => {
    const sum: Expression = plus(money(5, 'USD'), money(6, 'USD'), money(7, 'USD'))
    const reduced = reduce(sum, 'USD')
    expect(reduced).toEqual(money(18, 'USD'))
  })
  it('reduce money', () => {
    const reduced: Money<'USD'> = reduce(money(1, 'USD'), 'USD')
    expect(reduced).toEqual(money(1, 'USD'))
  })
  it('reduce money different currency', () => {
    const reduced: Money<'USD'> = reduce(money(2, 'CHF'), 'USD')
    expect(reduced).toEqual(money(1, 'USD'))
  })
  it('equality', () => {
    expect(money(5, 'USD')).toEqual(money(5, 'USD'))
    expect(money(5, 'USD')).not.toEqual(money(6, 'USD'))
    expect(money(5, 'CHF')).toEqual(money(5, 'CHF'))
    expect(money(5, 'CHF')).not.toEqual(money(6, 'CHF'))
    expect(money(5, 'CHF')).not.toEqual(money(5, 'USD'))
  })
})
