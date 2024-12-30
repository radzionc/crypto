import { Alchemy, AssetTransfersCategory, SortingOrder } from 'alchemy-sdk'
import { isEmpty } from '@lib/utils/array/isEmpty'
import {
  CashAsset,
  cashAssets,
  Trade,
  TradeAsset,
  tradeAssets,
  TradeType,
} from '../../entities/Trade'
import { isOneOf } from '@lib/utils/array/isOneOf'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { match } from '@lib/utils/match'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'

type Input = {
  address: string
  alchemy: Alchemy
}

const maxSwapTime = convertDuration(5, 'min', 'ms')

export const getTrades = async ({ address, alchemy }: Input) => {
  const { transfers: fromTransfers } = await alchemy.core.getAssetTransfers({
    fromAddress: address,
    category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
    withMetadata: true,
    order: SortingOrder.ASCENDING,
  })

  if (isEmpty(fromTransfers)) {
    return []
  }

  const { transfers: toTransfers } = await alchemy.core.getAssetTransfers({
    toAddress: address,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.INTERNAL,
    ],
    withMetadata: true,
    order: SortingOrder.ASCENDING,
  })

  return withoutUndefined(
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
}
