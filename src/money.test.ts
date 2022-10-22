import { doller, times } from './money'

describe('Money', () => {
  it('test multiplication', () => {
    const five = doller(5)
    const ten = times(five, 2)
    expect(ten).toEqual(doller(10))
  })
})
