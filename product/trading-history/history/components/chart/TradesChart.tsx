import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { useAssetTimeseriesQuery } from '@lib/chain-ui/queries/useAssetTimeseriesQuery'
import {
  Trade,
  primaryTradeAssetPriceProviderId,
} from '../../../entities/Trade'
import { useMemo } from 'react'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { TradesChartContent } from './TradesChartContent'

export type TradesChartProps = {
  trades: Trade[]
}

export function TradesChart({ trades }: TradesChartProps) {
  const days = useMemo(() => {
    const firstTradeAt = Math.min(...trades.map(({ timestamp }) => timestamp))
    return Math.ceil(convertDuration(Date.now() - firstTradeAt, 'ms', 'd'))
  }, [trades])

  const timeseriesQuery = useAssetTimeseriesQuery({
    id: primaryTradeAssetPriceProviderId,
    days,
  })

  return (
    <MatchQuery
      value={timeseriesQuery}
      success={(timeseries) => {
        if (timeseries.length < 2) return null
        return <TradesChartContent trades={trades} timeseries={timeseries} />
      }}
    />
  )
}
