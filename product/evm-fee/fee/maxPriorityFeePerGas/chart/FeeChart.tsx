import { Spinner } from '@lib/ui/loaders/Spinner'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { recordMap } from '@lib/utils/record/recordMap'

import { usePriorityFeeTimeseriesQuery } from '../../queries/usePriorityFeeTimeseriesQuery'

import { FeeChartContent } from './FeeChartContent'

export const FeeChart = () => {
  const query = usePriorityFeeTimeseriesQuery()

  return (
    <MatchQuery
      value={query}
      pending={() => <Spinner />}
      success={(value) => {
        return (
          <FeeChartContent
            value={recordMap(value, (array) => array.map(Number))}
          />
        )
      }}
    />
  )
}
