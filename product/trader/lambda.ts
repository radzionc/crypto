import { AWSLambda } from '@sentry/serverless'
import { getEnvVar } from './getEnvVar'
import { runTraders } from './core/runTraders'

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

exports.handler = AWSLambda.wrapHandler(runTraders)
