import { getAverage } from '@lib/utils/math/getAverage'
import { Trader, TradeType } from '../entities/Trader'
import { traderConfig } from './config'
import { getSecret } from '../getSercret'
import {
  cashAsset,
  tradeAssetAddress,
  tradeChain,
} from '../entities/TradeAsset'
import { getErc20Balance } from '../../../lib/chain/evm/erc20/getErc20Balance'
import { limitOrderAssetAddress } from '../../limit-orders/entities/LimitOrderAsset'
import { privateKeyToAddress } from 'viem/accounts'
import { swapErc20Token } from '../../../lib/chain/evm/erc20/swapErc20Token'
import { recordMap } from '@lib/utils/record/recordMap'
import { updateTrader } from '../db/traders'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { sendTradeNotification } from './sendTradeNotification'

// Moving Average Crossover Strategy
export const runTrader = async ({ prices, asset, lastTrade, id }: Trader) => {
  const shortTermAverage = getAverage(
    prices.slice(-traderConfig.shortTermPeriod),
  )
  const longTermAverage = getAverage(prices.slice(-traderConfig.longTermPeriod))

  if (shortTermAverage === longTermAverage) {
    return
  }

  const tradeType: TradeType =
    shortTermAverage > longTermAverage ? 'buy' : 'sell'

  if (tradeType === lastTrade) {
    return
  }

  const zeroXApiKey = await getSecret('zeroXApiKey')

  const privateKey = await getSecret<`0x${string}`>('accountPrivateKey')

  const from = tradeType === 'buy' ? cashAsset : asset
  const to = from === cashAsset ? asset : cashAsset

  const amount = await getErc20Balance({
    chain: tradeChain,
    address: limitOrderAssetAddress[from],
    accountAddress: privateKeyToAddress(privateKey),
  })

  await swapErc20Token({
    zeroXApiKey,
    privateKey,
    amount,
    chain: tradeChain,
    ...recordMap({ from, to }, (asset) => tradeAssetAddress[asset]),
  })

  await sendTradeNotification({
    asset,
    price: getLastItem(prices),
    tradeType,
  })

  await updateTrader(id, { lastTrade: tradeType })
}
