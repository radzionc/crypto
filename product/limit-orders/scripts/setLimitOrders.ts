import { deleteAllLimitOrders, putLimitOrder } from '../db/limitOrders'
import { LimitOrder } from '../entities/LimitOrder'

const partialItems: Omit<LimitOrder, 'id'>[] = [
  {
    asset: 'weth',
    condition: 'more',
    targetPrice: 3800,
    swap: {
      from: 'weth',
      to: 'usdc',
    },
  },
]

const items: LimitOrder[] = partialItems.map((value, index) => ({
  ...value,
  id: index.toString(),
}))

const setLimitOrders = async () => {
  await deleteAllLimitOrders()

  await Promise.all(items.map(putLimitOrder))
}

setLimitOrders()
