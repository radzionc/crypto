import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { TradeAsset } from './TradeAsset'
import { TradeType } from '@lib/chain/types/TradeType'

export type Trader = EntityWithId & {
  prices: number[]
  asset: TradeAsset
  lastTrade: TradeType
}
