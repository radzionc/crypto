type VariableName =
  | 'ZEROX_API_KEY'
  | 'ACCOUNT_PRIVATE_KEY'
  | 'ACCOUNT_ADDRESS'
  | 'LIMIT_ORDERS_TABLE_NAME'

export const getEnvVar = (name: VariableName): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
