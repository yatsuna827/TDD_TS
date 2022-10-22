type Money = {
  amount: number
}

export const doller = (amount: number): Money => ({ amount })
export const franc = (amount: number): Money => ({ amount })
export const times = (money: Money, multiplier: number): Money => doller(money.amount * multiplier)
