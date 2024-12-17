type VariableName = 'TELEGRAM_BOT_TOKEN' | 'TELEGRAM_BOT_CHAT_ID' | 'SENTRY_KEY'

export const getEnvVar = (name: VariableName): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
