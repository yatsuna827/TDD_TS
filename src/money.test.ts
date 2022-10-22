import { doller, times } from './money'

describe('Money', () => {
  it('test multiplication', () => {
    const five = doller(5)
    expect(times(five, 2)).toEqual(doller(10))
    expect(times(five, 3)).toEqual(doller(15))
  })
  it('equality', () => {
    expect(doller(5)).toEqual(doller(5))
  })
})
