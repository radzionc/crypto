import {
  getAssetTimeseries,
  maxLimit,
} from '@lib/chain/price/utils/binance/getAssetTimeseries'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'

import { traderConfig } from '../core/config'
import { printSimulationState } from '../core/simulate/printSimulationState'
import { simulateTraderRun } from '../core/simulate/simulateTraderRun'
import { SimulationState } from '../core/simulate/SimulationState'

const asset = 'eth'

const startingCashAmount = 100

const durationUnit = 'h'
const interval = 1

const main = async () => {
  const startTime =
    Date.now() - convertDuration(interval * maxLimit, durationUnit, 'ms')

  const pricePoints = await getAssetTimeseries({
    id: asset,
    limit: maxLimit,
    interval: `${interval}${durationUnit}`,
    startTime,
  })

  console.log(`Starting simulation on ${pricePoints.length} price points`)

  let state: SimulationState = {
    lastTrade: 'sell',
    amount: startingCashAmount,
  }

  printSimulationState({
    state,
    timestamp: startTime,
    price: pricePoints[0].value,
  })

  const simulationIterations = pricePoints.length - traderConfig.longTermPeriod

  range(simulationIterations).forEach((iteration) => {
    const prices = pricePoints.slice(
      iteration,
      iteration + traderConfig.longTermPeriod,
    )

    state = simulateTraderRun({
      state,
      prices,
    })
  })

  printSimulationState({
    state,
    timestamp: getLastItem(pricePoints).timestamp,
    price: getLastItem(pricePoints).value,
  })
}

main()
