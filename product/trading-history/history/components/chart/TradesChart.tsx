import { ComponentWithValueProps } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { useAssetTimeseriesQuery } from '@lib/chain-ui/queries/useAssetTimeseriesQuery'
import {
  Trade,
  primaryTradeAssetPriceProviderId,
} from '../../../entities/Trade'
import { useMemo } from 'react'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { order } from '@lib/utils/array/order'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { hStack, VStack } from '@lib/ui/css/stack'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { tradesChartConfig } from './config'
import styled, { useTheme } from 'styled-components'
import { text } from '@lib/ui/text'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { LineChart } from '@lib/ui/charts/LineChart'
import { TradePoint } from './TradePoint'
import { toPercents } from '@lib/utils/toPercents'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getOppositeTrade } from '@lib/chain/utils/getOppositeTrade'
import { isGoodPrice } from '../../utils/isGoodPrice'

export type TradesChartProps = ComponentWithValueProps<Trade[]>

export const ChartContainer = styled.div`
  ${hStack()};
  position: relative;
  isolation: isolate;
`

export const YLabel = styled.p`
  ${text({
    size: 12,
    color: 'supporting',
  })}
`

export function TradesChart({ value: trades }: TradesChartProps) {
  const days = useMemo(() => {
    const [{ timestamp }] = order(trades, (trade) => trade.timestamp, 'asc')
    return Math.ceil(convertDuration(Date.now() - timestamp, 'ms', 'd'))
  }, [trades])

  const timeseriesQuery = useAssetTimeseriesQuery({
    id: primaryTradeAssetPriceProviderId,
    days,
  })

  const { colors } = useTheme()

  return (
    <MatchQuery
      value={timeseriesQuery}
      success={(timeseries) => {
        if (timeseries.length < 2) return null

        const prices = timeseries.map((timepoint) => timepoint.value)

        const yLabels = generateYLabels({
          data: prices,
        })

        const normalized = normalizeDataArrays({
          trades: trades.map((trade) => trade.price),
          prices: timeseries.map((timepoint) => timepoint.value),
          yLabels,
        })

        const nextTradeType = getOppositeTrade(trades[0].type)
        const color = isGoodPrice({
          trades,
          tradeType: nextTradeType,
          price: getLastItem(timeseries).value,
        })
          ? colors.success
          : colors.alert

        return (
          <ElementSizeAware
            render={({ setElement, size }) => (
              <VStack gap={4} ref={setElement}>
                <ChartContainer>
                  <ChartYAxis
                    expectedLabelWidth={tradesChartConfig.expectedLabelWidth}
                    renderLabel={(index) => {
                      return <YLabel key={index}>{yLabels[index]}</YLabel>
                    }}
                    data={normalized.yLabels}
                  />
                  <VStack
                    style={{
                      position: 'relative',
                      minHeight: tradesChartConfig.chartHeight,
                    }}
                    fullWidth
                  >
                    {size && (
                      <LineChart
                        dataPointsConnectionKind="sharp"
                        fillKind={'gradient'}
                        data={normalized.prices}
                        width={
                          size.width - tradesChartConfig.expectedLabelWidth
                        }
                        height={tradesChartConfig.chartHeight}
                        color={color}
                      />
                    )}
                    <ChartHorizontalGridLines data={normalized.yLabels} />
                    {trades.map((trade) => (
                      <TradePoint
                        key={trade.hash}
                        style={{
                          left: toPercents(
                            (trade.timestamp - timeseries[0].timestamp) /
                              (getLastItem(timeseries).timestamp -
                                timeseries[0].timestamp),
                          ),
                          top: toPercents(
                            1 - normalized.trades[trades.indexOf(trade)],
                          ),
                        }}
                        value={trade}
                      />
                    ))}
                  </VStack>
                </ChartContainer>
              </VStack>
            )}
          />
        )
      }}
    />
  )
}
