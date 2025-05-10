import { match } from '@lib/utils/match'
import { Milliseconds } from '@lib/utils/time/types'

import { formatTime } from './formatTime'
import { SimulationState } from './SimulationState'

type PrintSimulationStateInput = {
  state: SimulationState
  price: number
  timestamp: Milliseconds
}

export const printSimulationState = ({
  state,
  price,
  timestamp,
}: PrintSimulationStateInput) => {
  const amountInUsd = match(state.lastTrade, {
    buy: () => state.amount * price,
    sell: () => state.amount,
  })

  console.log(
    `[${formatTime(timestamp)}] Current amount in USD: $${amountInUsd.toFixed(2)}`,
  )
}
