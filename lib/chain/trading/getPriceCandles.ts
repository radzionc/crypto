import { Milliseconds } from '@lib/utils/time/types'

import { PriceCandle } from './PriceCandle'

type GetPriceCandlesInput = {
  assetId: string
  candleDuration: Milliseconds
  startTime: Milliseconds
}

export const getPriceCandles = async (): Promise<PriceCandle> => {}
