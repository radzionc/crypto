import { TradeType } from '@lib/chain/types/TradeType'

export const tradeAssets = ['ETH', 'WETH'] as const
export type TradeAsset = (typeof tradeAssets)[number]

export const cashAssets = ['USDC', 'USDT'] as const
export type CashAsset = (typeof cashAssets)[number]

export const primaryTradeAssetPriceProviderId = 'ethereum'

export type Trade = {
  amount: number
  asset: TradeAsset
  cashAsset: CashAsset
  price: number
  type: TradeType

  timestamp: number
  hash: string
}
