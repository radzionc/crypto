import { AWSLambda } from '@sentry/serverless'
import { getEnvVar } from './getEnvVar'
import { runPriceWatcher } from './core/runPriceWatcher'

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

exports.handler = AWSLambda.wrapHandler(runPriceWatcher)
