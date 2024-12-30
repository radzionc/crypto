import { getEnvVar } from '../getEnvVar'
import TelegramBot from 'node-telegram-bot-api'
import { getSecret } from '../getSercret'
import { TradeAsset } from '../entities/TradeAsset'
import { match } from '@lib/utils/match'
import { TradeType } from '@lib/chain/types/TradeType'

type Input = {
  asset: TradeAsset
  price: number
  tradeType: TradeType
}

export const sendTradeNotification = async ({
  asset,
  price,
  tradeType,
}: Input) => {
  const token = await getSecret('telegramBotToken')
  const bot = new TelegramBot(token)

  const action = match(tradeType, {
    buy: () => 'Bought',
    sell: () => 'Sold',
  })

  const message = `${action} ${asset} at price of ${price}`

  return bot.sendMessage(getEnvVar('TELEGRAM_BOT_CHAT_ID'), message)
}
