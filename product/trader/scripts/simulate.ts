import { TimePoint } from '@lib/utils/entities/TimePoint'
import { queryUrl } from '@lib/utils/query/queryUrl'

const SYMBOL = 'ETHUSDT'
const DATA_POINTS = 200
const INTERVAL = '15m'

type BinanceKline = [
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

async function fetchBinanceData(
  startTime: number,
  endTime: number,
): Promise<TimePoint[]> {
  const baseUrl = 'https://api.binance.com/api/v3/klines'
  const url = new URL(baseUrl)

  url.searchParams.append('symbol', SYMBOL)
  url.searchParams.append('interval', INTERVAL)
  url.searchParams.append('startTime', Math.floor(startTime).toString())
  url.searchParams.append('endTime', Math.floor(endTime).toString())
  url.searchParams.append('limit', '1000')

  console.log('Requesting URL:', url.toString())

  try {
    const klines = await queryUrl<BinanceKline[]>(url.toString())
    return klines.map((kline) => ({
      timestamp: kline[0],
      value: parseFloat(kline[4]), // Using close price
    }))
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Binance API error: ${error.message}\nURL: ${url.toString()}`,
      )
    }
    throw error
  }
}

function parseDate(dateStr: string): Date {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    throw new Error(
      `Invalid date format: ${dateStr}. Please use YYYY-MM-DD format.`,
    )
  }
  return date
}

async function main() {
  try {
    // Get command line arguments or use defaults
    const args = process.argv.slice(2)
    const startDateStr = args[0] || '2024-03-01' // Default to a recent past date

    // Parse the start date
    const startDate = parseDate(startDateStr)
    const intervalMs = 15 * 60 * 1000 // 15 minutes in milliseconds
    const endDate = new Date(startDate.getTime() + DATA_POINTS * intervalMs)

    // Ensure we're not requesting future data
    const now = new Date()
    if (startDate > now || endDate > now) {
      throw new Error(
        'Cannot fetch future data. Please specify a past date range.',
      )
    }

    console.log(`Fetching ${DATA_POINTS} price points with 15-minute intervals`)
    console.log(`Start date: ${startDate.toISOString()}`)
    console.log(`End date: ${endDate.toISOString()}`)

    const timePoints = await fetchBinanceData(
      startDate.getTime(),
      endDate.getTime(),
    )

    if (timePoints.length === 0) {
      throw new Error('No data returned from Binance API')
    }

    // Sort points chronologically and take exactly what we need
    const processedPoints = timePoints
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(0, DATA_POINTS)

    console.log('\nPrice Points:')
    processedPoints.forEach((point) => {
      const date = new Date(point.timestamp)
      console.log(`${date.toISOString()}: $${point.value.toFixed(2)}`)
    })

    console.log(`\nTotal points collected: ${processedPoints.length}`)

    if (processedPoints.length < DATA_POINTS) {
      console.warn(
        `\nWarning: Only collected ${processedPoints.length} points out of ${DATA_POINTS} requested`,
      )
    }
  } catch (error) {
    console.error('Error fetching price data:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    console.log('\nUsage: npx tsx scripts/getPriceData.ts [YYYY-MM-DD]')
    console.log('Example: npx tsx scripts/getPriceData.ts 2024-01-01')
  }
}

main()
