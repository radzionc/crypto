import { TradeType } from '@lib/chain/types/TradeType'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { isOneOf } from '@lib/utils/array/isOneOf'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  Alchemy,
  AssetTransfersCategory,
  SortingOrder,
  Network,
} from 'alchemy-sdk'

import {
  CashAsset,
  cashAssets,
  Trade,
  TradeAsset,
  tradeAssets,
} from '../../entities/Trade'

type Input = {
  address: string
  alchemy: Alchemy
  network: Network
}

const maxSwapTime = convertDuration(5, 'min', 'ms')
const minTradeValue = 1000 // Filter out trades less than $1k

export const getTrades = async ({ address, alchemy, network }: Input) => {
  const { transfers: fromTransfers } = await alchemy.core.getAssetTransfers({
    fromAddress: address,
    category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
    withMetadata: true,
    order: SortingOrder.ASCENDING,
  })

  if (isEmpty(fromTransfers)) {
    return []
  }

  // BASE network doesn't support INTERNAL category
  const toCategories = [
    AssetTransfersCategory.EXTERNAL,
    AssetTransfersCategory.ERC20,
  ]

  if (network !== Network.BASE_MAINNET) {
    toCategories.push(AssetTransfersCategory.INTERNAL)
  }

  const { transfers: toTransfers } = await alchemy.core.getAssetTransfers({
    toAddress: address,
    category: toCategories,
    withMetadata: true,
    order: SortingOrder.ASCENDING,
  })

  const trades = withoutUndefined(
    fromTransfers.map(({ asset, metadata, value, hash }) => {
      const tradeAsset = isOneOf(asset, tradeAssets)
      const cashAsset = isOneOf(asset, cashAssets)

      if (!tradeAsset && !cashAsset) {
        return
      }

      const tradeType: TradeType = tradeAsset ? 'sell' : 'buy'

      const timestamp = new Date(metadata.blockTimestamp).getTime()

      const receiveTransfer = toTransfers.find((transfer) => {
        const time = new Date(transfer.metadata.blockTimestamp).getTime()
        if (time < timestamp || time - timestamp > maxSwapTime) {
          return false
        }

        return match(tradeType, {
          buy: () => isOneOf(transfer.asset, tradeAssets),
          sell: () => isOneOf(transfer.asset, cashAssets),
        })
      })

      if (!receiveTransfer) {
        return
      }

      const fromAmount = shouldBePresent(value)
      const toAmount = shouldBePresent(receiveTransfer.value)

      const trade: Trade = {
        asset: match(tradeType, {
          buy: () => receiveTransfer.asset as TradeAsset,
          sell: () => asset as TradeAsset,
        }),
        cashAsset: match(tradeType, {
          buy: () => asset as CashAsset,
          sell: () => receiveTransfer.asset as CashAsset,
        }),
        amount: match(tradeType, {
          buy: () => toAmount,
          sell: () => fromAmount,
        }),
        price: match(tradeType, {
          buy: () => fromAmount / toAmount,
          sell: () => toAmount / fromAmount,
        }),
        type: tradeType,

        timestamp,
        hash,
      }

      return trade
    }),
  )

  // Filter out trades with cash value less than $1k
  return trades.filter((trade) => {
    const cashValue = trade.amount * trade.price
    return cashValue >= minTradeValue
  })
}
