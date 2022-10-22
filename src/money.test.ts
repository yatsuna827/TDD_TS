import { money, times, plus } from './money'
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
    const five = money(5, 'USD')
    expect(times(five, 2)).toEqual(money(10, 'USD'))
    expect(times(five, 3)).toEqual(money(15, 'USD'))
  })
  it('test Franc multiplication', () => {
    const five = money(5, 'CHF')
    expect(times(five, 2)).toEqual(money(10, 'CHF'))
    expect(times(five, 3)).toEqual(money(15, 'CHF'))
  })
  it('test simple addition', () => {
    const sum = plus(money(5, 'USD'), money(5, 'USD'))
    const reduced = reduce(sum, 'USD')
    expect(reduced).toEqual(money(10, 'USD'))
  })
  it('test multiple addition', () => {
    const sum = plus(money(5, 'USD'), money(6, 'USD'), money(7, 'USD'))
    const reduced = reduce(sum, 'USD')
    expect(reduced).toEqual(money(18, 'USD'))
  })
  it('reduce money', () => {
    const reduced = reduce(money(1, 'USD'), 'USD')
    expect(reduced).toEqual(money(1, 'USD'))
  })
  it('reduce money different currency', () => {
    const reduced = reduce(money(2, 'CHF'), 'USD')
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
