import { TradeType } from '@lib/chain/types/TradeType'
import { IdProp } from '@lib/utils/entities/props'

import { TradeAsset } from './TradeAsset'

export type Trader = IdProp & {
  prices: number[]
  asset: TradeAsset
  lastTrade: TradeType
}
