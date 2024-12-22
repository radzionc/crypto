import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { TransferDirection } from '@lib/utils/TransferDirection'
import { LimitOrderAsset } from './LimitOrderAsset'

type LimitOrderCondition = 'more' | 'less'

export type LimitOrder = EntityWithId & {
  asset: LimitOrderAsset
  condition: LimitOrderCondition
  targetPrice: number
  swap: Record<TransferDirection, LimitOrderAsset>
}
