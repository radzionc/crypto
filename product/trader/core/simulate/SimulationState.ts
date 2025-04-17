import { TradeType } from '@lib/chain/types/TradeType'

export type SimulationState = {
  lastTrade: TradeType
  amount: number
}
