import { Trade } from '../../../entities/Trade'
import { TimePoint } from '@lib/utils/entities/TimePoint'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/css/stack'
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
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { ChartXAxis } from '@lib/ui/charts/ChartXAxis'
import { format } from 'date-fns'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const ChartSlice = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${toSizeUnit(tradesChartConfig.yLabelsWidth)} 1fr;
`

export const YLabel = styled.p`
  ${text({
    size: 12,
    color: 'supporting',
  })}
`

export const XLabel = styled.p`
  ${text({
    size: 12,
    color: 'supporting',
    nowrap: true,
  })}
`

interface TradesChartContentProps {
  trades: Trade[]
  timeseries: TimePoint[]
}

export function TradesChartContent({
  trades,
  timeseries,
}: TradesChartContentProps) {
  const { colors } = useTheme()
  const prices = timeseries.map((timepoint) => timepoint.value)
  const yLabels = generateYLabels({ data: prices })

  const normalized = normalizeDataArrays({
    trades: trades.map((trade) => trade.price),
    prices: timeseries.map((timepoint) => timepoint.value),
    yLabels,
  })

  const color = isGoodPrice({
    trades,
    tradeType: getOppositeTrade(trades[0].type),
    price: getLastItem(timeseries).value,
  })
    ? colors.success
    : colors.alert

  const timeInterval = {
    start: timeseries[0].timestamp,
    end: getLastItem(timeseries).timestamp,
  }

  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <VStack gap={20} ref={setElement}>
          <ChartSlice>
            <ChartYAxis
              expectedLabelWidth={tradesChartConfig.yLabelsWidth}
              renderLabel={(index) => (
                <YLabel key={index}>{yLabels[index]}</YLabel>
              )}
              data={normalized.yLabels}
            />
            <VStack
              style={{
                position: 'relative',
              }}
              fullWidth
            >
              {size && (
                <LineChart
                  dataPointsConnectionKind="sharp"
                  fillKind={'gradient'}
                  data={normalized.prices}
                  width={size.width - tradesChartConfig.yLabelsWidth}
                  height={tradesChartConfig.chartHeight}
                  color={color}
                />
              )}
              <ChartHorizontalGridLines data={normalized.yLabels} />
              {trades.map((trade, index) => (
                <TradePoint
                  key={trade.hash}
                  style={{
                    left: toPercents(
                      (trade.timestamp - timeInterval.start) /
                        getIntervalDuration(timeInterval),
                    ),
                    top: toPercents(1 - normalized.trades[index]),
                  }}
                  value={trade}
                />
              ))}
            </VStack>
          </ChartSlice>
          <ChartSlice>
            <div />
            {size && (
              <ChartXAxis
                dataSize={timeseries.length}
                containerWidth={size.width - tradesChartConfig.yLabelsWidth}
                expectedLabelHeight={tradesChartConfig.xLabelsHeight}
                expectedLabelWidth={tradesChartConfig.xLabelsWidth}
                labelsMinDistance={tradesChartConfig.xLabelsMinDistance}
                renderLabel={(index) => (
                  <XLabel>
                    {format(timeseries[index].timestamp, 'MMM yyyy')}
                  </XLabel>
                )}
              />
            )}
          </ChartSlice>
        </VStack>
      )}
    />
  )
}
