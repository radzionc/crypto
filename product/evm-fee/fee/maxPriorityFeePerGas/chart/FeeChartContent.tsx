import { gwei } from '@lib/chain/evm/utils/gwei'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { ChartLabel } from '@lib/ui/charts/ChartLabel'
import { ChartSlice } from '@lib/ui/charts/ChartSlice'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { LineChart } from '@lib/ui/charts/LineChart'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'
import { VStack } from '@lib/ui/css/stack'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { ValueProp } from '@lib/ui/props'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { useTheme } from 'styled-components'
import { formatUnits } from 'viem'

import { feePriorities, FeePriority } from '../core/FeePriority'
import { getFeePriorityColor } from '../utils/getFeePriorityColor'

import { feeChartConfig } from './config'

type FeeChartProps = ValueProp<Record<FeePriority, number[]>>

export const FeeChartContent = ({ value }: FeeChartProps) => {
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
          <VStack flexGrow gap={20} ref={setElement}>
            <ChartSlice yLabelsWidth={feeChartConfig.yLabelsWidth}>
              <ChartYAxis
                renderLabel={(index) => (
                  <ChartLabel key={index}>
                    {formatUnits(BigInt(yLabels[index]), gwei.decimals)}
                  </ChartLabel>
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
