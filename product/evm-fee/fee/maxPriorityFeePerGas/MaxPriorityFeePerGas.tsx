import { useFeeHistory } from 'wagmi'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { feePriorities, feePriorityPercentiles } from './core/FeePriority'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { arraysToRecord } from '@lib/utils/array/arraysToRecord'
import { FeeChart } from './chart/FeeChart'

export const MaxPriorityFeePerGas = () => {
  const query = useFeeHistory({
    blockCount: 10,
    rewardPercentiles: feePriorities.map((key) => feePriorityPercentiles[key]),
  })

  return (
    <MatchQuery
      value={query}
      success={({ reward }) => {
        const timeseries = shouldBePresent(reward).reduce(
          (acc, curr) => {
            return acc.map((value, index) => [...value, Number(curr[index])])
          },
          feePriorities.map(() => [] as number[]),
        )
        return <FeeChart value={arraysToRecord(feePriorities, timeseries)} />
      }}
    />
  )
}
