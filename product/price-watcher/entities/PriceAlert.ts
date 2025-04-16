import { IdProp } from '@lib/utils/entities/props'

type PriceAlertCondition = 'more' | 'less'

export type PriceAlert = IdProp & {
  asset: string
  targetPrice: number
  condition: PriceAlertCondition
  isNotified: boolean
}
