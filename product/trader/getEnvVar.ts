type VariableName =
  | 'TRADERS_TABLE_NAME'
  | 'SENTRY_KEY'
  | 'SECRETS'
  | 'TELEGRAM_BOT_CHAT_ID'

export const getEnvVar = <T extends string>(name: VariableName): T => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value as T
}
