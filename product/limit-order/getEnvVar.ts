type VariableName =
  | 'ACCOUNT_ADDRESS'
  | 'LIMIT_ORDERS_TABLE_NAME'
  | 'SENTRY_KEY'
  | 'SECRETS'

export const getEnvVar = (name: VariableName): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
