import { TradeType } from '@lib/chain/types/TradeType'
import { getAverage } from '@lib/utils/math/getAverage'

import { Trader } from '../entities/Trader'

import { traderConfig } from './config'

export const getTradingSignal = ({
  prices,
  lastTrade,
}: Pick<Trader, 'prices' | 'lastTrade'>): TradeType | undefined => {
  if (prices.length < traderConfig.longTermPeriod) return

  const shortNow = getAverage(prices.slice(-traderConfig.shortTermPeriod))
  const longNow = getAverage(prices.slice(-traderConfig.longTermPeriod))

  const shortPrev = getAverage(
    prices.slice(-(traderConfig.shortTermPeriod + 1), -1),
  )
  const longPrev = getAverage(
    prices.slice(-(traderConfig.longTermPeriod + 1), -1),
  )

  const crossedUp = shortPrev <= longPrev && shortNow > longNow
  const crossedDown = shortPrev >= longPrev && shortNow < longNow

  if (crossedUp && lastTrade !== 'buy') return 'buy'
  if (crossedDown && lastTrade !== 'sell') return 'sell'
}
