import { TradeType } from '@lib/chain/types/TradeType'

export const tradeAssets = ['ETH', 'WETH', 'WBTC', 'cbBTC'] as const
export type TradeAsset = (typeof tradeAssets)[number]

export const cashAssets = ['USDC', 'USDT'] as const
export type CashAsset = (typeof cashAssets)[number]

export type AssetType = 'ETH' | 'BTC'

export const assetToPriceProviderId: Record<AssetType, string> = {
  ETH: 'ethereum',
  BTC: 'bitcoin',
}

export const tradeAssetToAssetType: Record<TradeAsset, AssetType> = {
  ETH: 'ETH',
  WETH: 'ETH',
  WBTC: 'BTC',
  cbBTC: 'BTC',
}

export type Trade = {
  amount: number
  asset: TradeAsset
  cashAsset: CashAsset
  price: number
  type: TradeType
  assetType: AssetType

  timestamp: number
  hash: string
}
