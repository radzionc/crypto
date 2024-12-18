import { EntityWithId } from '@lib/utils/entities/EntityWithId'

type PriceAlertCondition = 'more' | 'less'

export type PriceAlert = EntityWithId & {
  asset: string
  targetPrice: number
  condition: PriceAlertCondition
  isNotified: boolean
}
