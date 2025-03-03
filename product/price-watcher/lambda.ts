import { AWSLambda } from '@sentry/serverless'

import { runPriceWatcher } from './core/runPriceWatcher'
import { getEnvVar } from './getEnvVar'

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

exports.handler = AWSLambda.wrapHandler(runPriceWatcher)
