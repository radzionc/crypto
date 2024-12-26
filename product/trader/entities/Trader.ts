import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { TradeAsset } from './TradeAsset'

export type TradeType = 'buy' | 'sell'

export type Trader = EntityWithId & {
  prices: number[]
  asset: TradeAsset
  lastTrade: TradeType
}
