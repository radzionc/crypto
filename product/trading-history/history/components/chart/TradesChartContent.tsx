import { Trade } from '../../../entities/Trade'
import { TimePoint } from '@lib/utils/entities/TimePoint'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/css/stack'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { tradesChartConfig } from './config'
import { useTheme } from 'styled-components'
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
import { ChartLabel } from './ChartLabel'
import { ChartSlice } from './ChartSlice'

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
      render={({ setElement, size }) => {
        const contentWidth = size
          ? size.width - tradesChartConfig.yLabelsWidth
          : undefined

        return (
          <VStack gap={20} ref={setElement}>
            <ChartSlice>
              <ChartYAxis
                renderLabel={(index) => (
                  <ChartLabel key={index}>{yLabels[index]}</ChartLabel>
                )}
                data={normalized.yLabels}
              />
              <VStack
                style={{
                  position: 'relative',
                }}
                fullWidth
              >
                {contentWidth && (
                  <LineChart
                    dataPointsConnectionKind="sharp"
                    fillKind={'gradient'}
                    data={normalized.prices}
                    width={contentWidth}
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
              {contentWidth && (
                <ChartXAxis
                  dataSize={timeseries.length}
                  containerWidth={contentWidth}
                  expectedLabelHeight={tradesChartConfig.xLabelsHeight}
                  expectedLabelWidth={tradesChartConfig.xLabelsWidth}
                  labelsMinDistance={tradesChartConfig.xLabelsMinDistance}
                  renderLabel={(index) => (
                    <ChartLabel key={index}>
                      {format(timeseries[index].timestamp, 'MMM yyyy')}
                    </ChartLabel>
                  )}
                />
              )}
            </ChartSlice>
          </VStack>
        )
      }}
    />
  )
}
