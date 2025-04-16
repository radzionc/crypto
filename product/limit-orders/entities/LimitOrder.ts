import { IdProp } from '@lib/utils/entities/props'
import { TransferDirection } from '@lib/utils/TransferDirection'

import { LimitOrderAsset } from './LimitOrderAsset'

type LimitOrderCondition = 'more' | 'less'

export type LimitOrder = IdProp & {
  asset: LimitOrderAsset
  condition: LimitOrderCondition
  targetPrice: number
  swap: Record<TransferDirection, LimitOrderAsset>
}
