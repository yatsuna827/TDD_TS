import { doller, franc, times, plus } from './money'

describe('Money', () => {
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
    expect(sum).toEqual(doller(10))
  })
  it('equality', () => {
    expect(doller(5)).toEqual(doller(5))
    expect(doller(5)).not.toEqual(doller(6))
    expect(franc(5)).toEqual(franc(5))
    expect(franc(5)).not.toEqual(franc(6))
    expect(franc(5)).not.toEqual(doller(5))
  })
})
