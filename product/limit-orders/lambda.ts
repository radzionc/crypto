import { AWSLambda } from '@sentry/serverless'
import { getEnvVar } from './getEnvVar'
import { runLimitOrders } from './core/runLimitOrders'

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

exports.handler = AWSLambda.wrapHandler(runLimitOrders)
