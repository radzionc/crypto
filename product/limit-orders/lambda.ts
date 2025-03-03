import { AWSLambda } from '@sentry/serverless'

import { runLimitOrders } from './core/runLimitOrders'
import { getEnvVar } from './getEnvVar'

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

exports.handler = AWSLambda.wrapHandler(runLimitOrders)
