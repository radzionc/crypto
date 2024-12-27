import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { getAllTraders, updateTrader } from '../db/traders'
import { getAssetPrices } from '../../../lib/chain/price/utils/getAssetPrices'
import { traderConfig } from './config'
import { tradeAssetPriceProividerId } from '../entities/TradeAsset'

export const updatePrices = async () => {
  const traders = await getAllTraders()

  const assets = withoutDuplicates(
    traders.map(({ asset }) => tradeAssetPriceProividerId[asset]),
  )

  const priceRecord = await getAssetPrices({ ids: assets })

  return Promise.all(
    traders.map(async ({ id, prices: oldPrices, asset }) => {
      const price = priceRecord[tradeAssetPriceProividerId[asset]]

      const prices = [...oldPrices, price].slice(-traderConfig.longTermPeriod)

      return updateTrader(id, { prices })
    }),
  )
}
