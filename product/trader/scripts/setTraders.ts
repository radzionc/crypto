import { deleteAllTraders, putTrader } from '../db/traders'
import { Trader } from '../entities/Trader'

const partialItems: Omit<Trader, 'id'>[] = [
  {
    prices: [],
    asset: 'weth',
    lastTrade: 'buy',
  },
]

const items: Trader[] = partialItems.map((value, index) => ({
  ...value,
  id: index.toString(),
}))

const setTraders = async () => {
  await deleteAllTraders()

  await Promise.all(items.map(putTrader))
}

setTraders()
