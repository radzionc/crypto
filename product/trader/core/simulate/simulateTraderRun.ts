import { getLastItem } from '@lib/utils/array/getLastItem'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { TimePoint } from '@lib/utils/entities/TimePoint'
import { match } from '@lib/utils/match'

import { getTradingSignal } from '../getTradingSignal'

import { formatTime } from './formatTime'
import { printSimulationState } from './printSimulationState'
import { SimulationState } from './SimulationState'

type Input = {
  state: SimulationState
  prices: TimePoint[]
}

export const simulateTraderRun = ({
  state,
  prices,
}: Input): SimulationState => {
  const tradeType = getTradingSignal({
    prices: prices.map((price) => price.value),
    ...state,
  })

  if (!tradeType) {
    return state
  }

  const price = getLastItem(prices)

  console.log(
    `[${formatTime(price.timestamp)}] ${capitalizeFirstLetter(tradeType)}ing at price $${price.value.toFixed(2)}`,
  )

  const newState = {
    lastTrade: tradeType,
    amount: match(tradeType, {
      buy: () => state.amount / price.value,
      sell: () => state.amount * price.value,
    }),
  }

  printSimulationState({
    state: newState,
    price: price.value,
    timestamp: price.timestamp,
  })

  return newState
}
