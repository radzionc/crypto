import { getErrorMessage } from '@lib/utils/getErrorMessage'

export const isWrongAlchemyApiKey = (error: unknown) =>
  getErrorMessage(error).includes('authenticated')
