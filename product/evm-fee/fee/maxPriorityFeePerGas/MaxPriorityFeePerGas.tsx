import { useFeeHistory } from 'wagmi'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { feePriorities, feePriorityPercentiles } from './core/FeePriority'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { arraysToRecord } from '@lib/utils/array/arraysToRecord'
import { FeeChart } from './chart/FeeChart'
import { VStack } from '@lib/ui/css/stack'
import { PriorityOptions } from './options/PriorityOptions'
import { FeeSection } from '../FeeSection'

export const MaxPriorityFeePerGas = () => {
  const query = useFeeHistory({
    blockCount: 10,
    rewardPercentiles: feePriorities.map((key) => feePriorityPercentiles[key]),
  })

  return (
    <FeeSection title="maxPriorityFeePerGas">
      <MatchQuery
        value={query}
        success={({ reward }) => {
          const timeseries = shouldBePresent(reward).reduce(
            (acc, curr) => {
              return acc.map((value, index) => [...value, Number(curr[index])])
            },
            feePriorities.map(() => [] as number[]),
          )

          const averages = feePriorities.reduce(
            (acc, priority, index) => {
              const values = timeseries[index]
              const average =
                values.reduce((sum, val) => sum + val, 0) / values.length
              return { ...acc, [priority]: average }
            },
            {} as Record<(typeof feePriorities)[number], number>,
          )

          return (
            <VStack gap={40}>
              <PriorityOptions value={averages} />
              <FeeChart value={arraysToRecord(feePriorities, timeseries)} />
            </VStack>
          )
        }}
      />
    </FeeSection>
  )
}
