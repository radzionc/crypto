import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { FiatCurrency } from '../FiatCurrency'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { TimePoint } from '@lib/utils/entities/TimePoint'

export type GetAssetTimeseriesInput = {
  id: string
  fiatCurrency?: FiatCurrency
  days?: number
}

type Response = {
  prices: [number, number][] // [timestamp, price]
}

const baseUrl = 'https://api.coingecko.com/api/v3/coins'

export const getAssetTimeseries = async ({
  id,
  fiatCurrency = 'usd',
  days = 365,
}: GetAssetTimeseriesInput): Promise<TimePoint[]> => {
  const url = addQueryParams(`${baseUrl}/${id}/market_chart`, {
    vs_currency: fiatCurrency,
    days: days.toString(),
  })

  const result = await queryUrl<Response>(url)

  return result.prices.map(([timestamp, price]) => ({
    timestamp,
    value: price,
  }))
}
