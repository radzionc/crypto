import { useTransformQueryData } from '@lib/ui/query/hooks/useTransformQueryData'
import { bigintAverage } from '@lib/utils/math/bigint/bigintAverage'
import { recordMap } from '@lib/utils/record/recordMap'

import {
  PriorityFeeTimeseries,
  usePriorityFeeTimeseriesQuery,
} from './usePriorityFeeTimeseriesQuery'

const transform = (timeseries: PriorityFeeTimeseries) =>
  recordMap(timeseries, bigintAverage)

export const usePriorityFeesQuery = () => {
  const query = usePriorityFeeTimeseriesQuery()

  return useTransformQueryData(query, transform)
}
