import { match } from '@lib/utils/match'
import { recordMap } from '@lib/utils/record/recordMap'
import { privateKeyToAddress } from 'viem/accounts'

import { getErc20Balance } from '../../../lib/chain/evm/erc20/getErc20Balance'
import { swapErc20Token } from '../../../lib/chain/evm/erc20/swapErc20Token'
import { getAssetPrices } from '../../../lib/chain/price/utils/getAssetPrices'
import { deleteLimitOrder, getAllLimitOrders } from '../db/limitOrders'
import {
  limitOrderAssetAddress,
  limitOrderChain,
} from '../entities/LimitOrderAsset'
import { getSecret } from '../getSercret'

import { sendSwapNotification } from './sendSwapNotification'

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

      const privateKey = await getSecret<`0x${string}`>('accountPrivateKey')

      const amount = await getErc20Balance({
        chain: limitOrderChain,
        address: limitOrderAssetAddress[swap.from],
        accountAddress: privateKeyToAddress(privateKey),
      })

      await swapErc20Token({
        zeroXApiKey,
        privateKey,
        amount,
        chain: limitOrderChain,
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
