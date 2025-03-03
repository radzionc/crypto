import TelegramBot from 'node-telegram-bot-api'

import { getEnvVar } from '../getEnvVar'

const bot = new TelegramBot(getEnvVar('TELEGRAM_BOT_TOKEN'), { polling: true })

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  console.log(`Chat ID: ${chatId}`)
  bot.sendMessage(chatId, `Your Chat ID is: ${chatId}`)
})

console.log('Bot is running. Send any message to the bot on Telegram.')
