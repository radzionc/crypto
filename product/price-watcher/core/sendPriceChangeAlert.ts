import { getEnvVar } from '../getEnvVar'
import TelegramBot from 'node-telegram-bot-api'

type Input = {
  price: number
  asset: string
}

export const sendPriceChangeAlert = async ({ price, asset }: Input) => {
  const bot = new TelegramBot(getEnvVar('TELEGRAM_BOT_TOKEN'))

  const message = `${asset} price: ${price}`

  return bot.sendMessage(getEnvVar('TELEGRAM_BOT_CHAT_ID'), message)
}
