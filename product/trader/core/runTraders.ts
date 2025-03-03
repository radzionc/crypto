import { getAllTraders } from '../db/traders'

import { traderConfig } from './config'
import { runTrader } from './runTrader'
import { updatePrices } from './updatePrices'

export const runTraders = async () => {
  await updatePrices()

  const traders = await getAllTraders()

  const tradersWithPrices = traders.filter(
    ({ prices }) => prices.length >= traderConfig.longTermPeriod,
  )

  return Promise.all(tradersWithPrices.map(runTrader))
}
