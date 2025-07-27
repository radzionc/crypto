import { useAssetTimeseriesQuery } from '@lib/chain-ui/queries/useAssetTimeseriesQuery'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'

import { Trade, assetToPriceProviderId } from '../../../entities/Trade'

import { TradesChartContent } from './TradesChartContent'

export type TradesChartProps = {
  trades: Trade[]
}

export function TradesChart({ trades }: TradesChartProps) {
  const days = useMemo(() => {
    const firstTradeAt = Math.min(...trades.map(({ timestamp }) => timestamp))
    return Math.ceil(convertDuration(Date.now() - firstTradeAt, 'ms', 'd'))
  }, [trades])

  // Get price provider ID from the first trade's asset type
  // All trades will have the same asset type since they're filtered
  const priceProviderId =
    trades.length > 0 ? assetToPriceProviderId[trades[0].assetType] : 'ethereum'

  const timeseriesQuery = useAssetTimeseriesQuery({
    id: priceProviderId,
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
