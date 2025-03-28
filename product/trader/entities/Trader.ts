import { TradeType } from '@lib/chain/types/TradeType'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'

import { TradeAsset } from './TradeAsset'

export type Trader = EntityWithId & {
  prices: number[]
  asset: TradeAsset
  lastTrade: TradeType
}
