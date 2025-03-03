import { match } from '@lib/utils/match'

import { getAssetPrices } from '../../../lib/chain/price/utils/getAssetPrices'
import { getAllPriceAlerts, updatePriceAlert } from '../db/priceAlerts'

import { sendPriceChangeAlert } from './sendPriceChangeAlert'

export const runPriceWatcher = async () => {
  const items = await getAllPriceAlerts()

  const assets = items.map((item) => item.asset)

  const assetPrices = await getAssetPrices({ ids: assets })

  await Promise.all(
    items.map(async ({ id, isNotified, condition, asset, targetPrice }) => {
      const price = assetPrices[asset]
      const isConditionMet = match(condition, {
        more: () => price > targetPrice,
        less: () => price < targetPrice,
      })

      if (isConditionMet && !isNotified) {
        await sendPriceChangeAlert({ price, asset })

        return updatePriceAlert(id, {
          isNotified: true,
        })
      } else if (!isConditionMet && isNotified) {
        return updatePriceAlert(id, {
          isNotified: false,
        })
      }
    }),
  )
}
