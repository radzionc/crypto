import { order } from '@lib/utils/array/order'
import { TimePoint } from '@lib/utils/entities/TimePoint'
import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { withoutUndefinedFields } from '@lib/utils/record/withoutUndefinedFields'

export type TimeInterval =
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '8h'
  | '12h'
  | '1d'
  | '3d'
  | '1w'
  | '1M'

export type GetAssetTimeseriesInput = {
  id: string
  startTime: number
  endTime?: number
  interval: TimeInterval
  limit?: number
}

type KlineData = [
  number, // Open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Ignore
]

const baseUrl = 'https://api.binance.com/api/v3/klines'

export const maxLimit = 1000

export const getAssetTimeseries = async ({
  id,
  startTime,
  endTime,
  interval,
  limit = maxLimit,
}: GetAssetTimeseriesInput): Promise<TimePoint[]> => {
  const symbol = `${id.toUpperCase()}USDT`

  const url = addQueryParams(
    baseUrl,
    withoutUndefinedFields({
      symbol,
      interval,
      startTime,
      endTime,
      limit,
    }),
  )

  const klines = await queryUrl<KlineData[]>(url.toString())

  return order(
    klines.map((kline) => ({
      timestamp: kline[6],
      value: parseFloat(kline[4]),
    })),
    (o) => o.timestamp,
    'asc',
  )
}
