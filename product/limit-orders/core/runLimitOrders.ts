import { match } from '@lib/utils/match'
import { getAssetPrices } from '../../../lib/chain/price/utils/getAssetPrices'
import { deleteLimitOrder, getAllLimitOrders } from '../db/limitOrders'
import { sendSwapNotification } from './sendSwapNotification'
import { swapErc20Token } from '../../../lib/chain/evm/erc20/swapErc20Token'
import { getSecret } from '../getSercret'
import { getEnvVar } from '../getEnvVar'
import { Address } from 'viem'
import { limitOrderAssetAddress } from '../entities/LimitOrderAsset'
import { polygon } from 'viem/chains'
import { getErc20Balance } from '../../../lib/chain/evm/erc20/getErc20Balance'
import { recordMap } from '@lib/utils/record/recordMap'

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

      if (!isConditionMet) {
        return
      }

      const zeroXApiKey = await getSecret('zeroXApiKey')

      const accountAddress = getEnvVar('ACCOUNT_ADDRESS') as Address

      const amount = await getErc20Balance({
        chain: polygon,
        address: limitOrderAssetAddress[swap.from],
        accountAddress,
      })

      await swapErc20Token({
        zeroXApiKey,
        accountAddress,
        destinationAddress: getEnvVar<Address>('WITHDRAWAL_ADDRESS'),
        amount,
        chain: polygon,
        ...recordMap(swap, (asset) => limitOrderAssetAddress[asset]),
      })

      await sendSwapNotification({
        swap,
        asset,
        price,
      })

      return deleteLimitOrder(id)
    }),
  )
}
