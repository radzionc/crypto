import { deleteAllLimitOrders, putLimitOrder } from '../db/limitOrders'
import { LimitOrder } from '../entities/LimitOrder'

const partialItems: Omit<LimitOrder, 'id'>[] = [
  {
    asset: 'weth',
    condition: 'less',
    targetPrice: 3300,
    swap: {
      from: 'usdc',
      to: 'weth',
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
