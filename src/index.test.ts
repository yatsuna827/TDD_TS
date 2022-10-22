import {greet} from "../src/index"

describe('greet', () => {
  it('', () => {
    const response = greet()
    expect(response).toBe("hello")
  })
})