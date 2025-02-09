import { feePriorityPercentiles } from '../maxPriorityFeePerGas/core/FeePriority'

import { useFeeHistory } from 'wagmi'
import { feePriorities } from '../maxPriorityFeePerGas/core/FeePriority'
import { useTransformQueryData } from '@lib/ui/query/hooks/useTransformQueryData'
import { GetFeeHistoryReturnType } from 'viem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { arraysToRecord } from '@lib/utils/array/arraysToRecord'

export type PriorityFeeTimeseries = Record<
  (typeof feePriorities)[number],
  bigint[]
>

const transform = ({
  reward,
}: GetFeeHistoryReturnType): PriorityFeeTimeseries =>
  arraysToRecord(
    feePriorities,
    shouldBePresent(reward).reduce(
      (acc, curr) => {
        return acc.map((value, index) => [...value, curr[index]])
      },
      feePriorities.map(() => [] as bigint[]),
    ),
  )

export const usePriorityFeeTimeseriesQuery = () => {
  const query = useFeeHistory({
    blockCount: 10,
    rewardPercentiles: feePriorities.map((key) => feePriorityPercentiles[key]),
  })

  return useTransformQueryData(query, transform)
}
