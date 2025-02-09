import { recordMap } from '@lib/utils/record/recordMap'
import {
  PriorityFeeTimeseries,
  usePriorityFeeTimeseriesQuery,
} from './usePriorityFeeTimeseriesQuery'
import { getAverage } from '@lib/utils/math/getAverage'
import { useTransformQueryData } from '@lib/ui/query/hooks/useTransformQueryData'

const transform = (timeseries: PriorityFeeTimeseries) =>
  recordMap(timeseries, getAverage)

export const usePriorityFeesQuery = () => {
  const query = usePriorityFeeTimeseriesQuery()

  return useTransformQueryData(query, transform)
}
