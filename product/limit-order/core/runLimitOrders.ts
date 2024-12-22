import { match } from '@lib/utils/match'
import { getAssetPrices } from '../../../lib/chain/price/utils/getAssetPrices'
import { deleteLimitOrder, getAllLimitOrders } from '../db/limitOrders'
import { sendSwapNotification } from './sendSwapNotification'
import { swapErc20Tokens } from '../../../lib/chain/evm/erc20/swapErc20Tokens'
import { getSecret } from '../getSercret'
import { getEnvVar } from '../getEnvVar'
import { Address } from 'viem'
import { polygon } from 'viem/chains'

export const runLimitOrders = async () => {
  const items = await getAllLimitOrders()

  const assets = items.map((item) => item.asset)

  const assetPrices = await getAssetPrices({ ids: assets })

  await Promise.all(
    items.map(async ({ id, condition, asset, targetPrice, swap }) => {
      const price = assetPrices[asset]
      const isConditionMet = match(condition, {
        more: () => price > targetPrice,
        less: () => price < targetPrice,
      })

      if (isConditionMet) {
        const zeroXApiKey = await getSecret('zeroXApiKey')

        await swapErc20Tokens({
          zeroXApiKey,
          accountAddress: getEnvVar('ACCOUNT_ADDRESS') as Address,
          chain: polygon,
          from: swap.from,
          to: swap.to,
        })

        await sendSwapNotification({
          swap,
          asset,
          price,
        })

        return deleteLimitOrder(id)
      }
    }),
  )
}
