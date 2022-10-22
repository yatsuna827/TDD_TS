import { doller, franc, times, plus, reduce, getExchanger } from './money'

describe('Money', () => {
  const bank = getExchanger({
    'CHF:USD': 2,
    'USD:CHF': 1 / 2,
    'USD:USD': 1,
    'CHF:CHF': 1,
  })

  it('test multiplication', () => {
    const five = doller(5)
    expect(times(five, 2)).toEqual(doller(10))
    expect(times(five, 3)).toEqual(doller(15))
  })
  it('test Franc multiplication', () => {
    const five = franc(5)
    expect(times(five, 2)).toEqual(franc(10))
    expect(times(five, 3)).toEqual(franc(15))
  })
  it('test simple addition', () => {
    const sum = plus(doller(5), doller(5))
    const reduced = reduce(sum, 'USD', bank)
    expect(reduced).toEqual(doller(10))
  })
  it('test multiple addition', () => {
    const sum = plus(doller(5), doller(6), doller(7))
    const reduced = reduce(sum, 'USD', bank)
    expect(reduced).toEqual(doller(18))
  })
  it('reduce money', () => {
    const reduced = reduce(doller(1), 'USD', bank)
    expect(reduced).toEqual(doller(1))
  })
  it('reduce money different currency', () => {
    const reduced = reduce(franc(2), 'USD', bank)
    expect(reduced).toEqual(doller(1))
  })
  it('equality', () => {
    expect(doller(5)).toEqual(doller(5))
    expect(doller(5)).not.toEqual(doller(6))
    expect(franc(5)).toEqual(franc(5))
    expect(franc(5)).not.toEqual(franc(6))
    expect(franc(5)).not.toEqual(doller(5))
  })
})
