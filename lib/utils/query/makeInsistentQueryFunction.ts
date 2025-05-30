import { attempt } from '../attempt'
import { sleep } from '../sleep'

import { couldBeTooManyRequestsError } from './couldBeTooManyRequestsError'

type QueryFunction = (...args: any[]) => Promise<any>

interface MakeInsistentQueryFunctionParams<V extends QueryFunction> {
  maxRetries?: number
  delay?: number
  shouldRetry?: (err: unknown) => boolean
  query: V
}

export const makeInsistentQueryFunction = <V extends QueryFunction>({
  maxRetries = 20,
  delay = 2000,
  shouldRetry = couldBeTooManyRequestsError,
  query,
}: MakeInsistentQueryFunctionParams<V>): V => {
  let retryAttempt = 0
  let disableRequestsUntil: undefined | number = undefined

  const insistentQuery: V = (async (...args: any[]) => {
    const now = Date.now()
    if (disableRequestsUntil && now < disableRequestsUntil) {
      await sleep(disableRequestsUntil - now)

      return insistentQuery(...args)
    }

    const { data, error } = await attempt(query(...args))

    if (error) {
      disableRequestsUntil = Date.now() + delay
      retryAttempt += 1

      if (retryAttempt < maxRetries && shouldRetry(error)) {
        return insistentQuery(...args)
      }

      throw error
    }

    retryAttempt = 0

    return data
  }) as V

  return insistentQuery
}
