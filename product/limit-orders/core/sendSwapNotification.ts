import { TransferDirection } from '@lib/utils/TransferDirection'
import TelegramBot from 'node-telegram-bot-api'

import { LimitOrderAsset } from '../entities/LimitOrderAsset'
import { getEnvVar } from '../getEnvVar'
import { getSecret } from '../getSercret'

type Input = {
  swap: Record<TransferDirection, LimitOrderAsset>
  asset: LimitOrderAsset
  price: number
}

export const sendSwapNotification = async ({ price, asset, swap }: Input) => {
  const token = await getSecret('telegramBotToken')
  const bot = new TelegramBot(token)

  const message = `Executed a swap from ${swap.from} to ${swap.to} at ${asset} price of ${price}`

  return bot.sendMessage(getEnvVar('TELEGRAM_BOT_CHAT_ID'), message)
}
