import { TradeType } from '@lib/chain/types/TradeType'
import { Trade } from '../../entities/Trade'
import { match } from '@lib/utils/match'

type Input = {
  trades: Trade[]
  tradeType: TradeType
  price: number
}

export const isGoodPrice = ({ trades, tradeType, price }: Input) => {
  const [{ type }] = trades

  const oppositeTradeIndex = trades.findIndex((t) => t.type !== type)
  const relevantTrades = trades.slice(0, oppositeTradeIndex)

  const prices = relevantTrades.map((t) => t.price)

  const relevantPrice =
    type === 'buy' ? Math.max(...prices) : Math.min(...prices)

  return match(tradeType, {
    buy: () => price < relevantPrice,
    sell: () => price > relevantPrice,
  })
}
