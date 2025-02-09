import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/css/stack'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { useTheme } from 'styled-components'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { LineChart } from '@lib/ui/charts/LineChart'
import { ComponentWithValueProps } from '@lib/ui/props'
import { feePriorities, FeePriority } from '../core/FeePriority'
import { feeChartConfig } from './config'
import { ChartSlice } from './ChartSlice'
import { ChartLabel } from './ChartLabel'
import { getFeePriorityColor } from '../utils/getFeePriorityColor'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'

type FeeChartProps = ComponentWithValueProps<Record<FeePriority, number[]>>

export const FeeChart = ({ value }: FeeChartProps) => {
  const theme = useTheme()
  const yLabels = generateYLabels({ data: Object.values(value).flat() })

  const normalized = normalizeDataArrays({
    ...value,
    yLabels,
  })

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const contentWidth = size
          ? size.width - feeChartConfig.yLabelsWidth
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
                  minHeight: feeChartConfig.chartHeight,
                }}
                fullWidth
              >
                {contentWidth &&
                  feePriorities.map((key) => {
                    const data = normalized[key]
                    return (
                      <TakeWholeSpaceAbsolutely key={key}>
                        <LineChart
                          key={key}
                          dataPointsConnectionKind="sharp"
                          fillKind={'gradient'}
                          data={data}
                          width={contentWidth}
                          height={feeChartConfig.chartHeight}
                          color={getFeePriorityColor(theme, key)}
                        />
                      </TakeWholeSpaceAbsolutely>
                    )
                  })}
                <ChartHorizontalGridLines data={normalized.yLabels} />
              </VStack>
            </ChartSlice>
          </VStack>
        )
      }}
    />
  )
}
