import { AWSLambda } from '@sentry/serverless'

import { runTraders } from './core/runTraders'
import { getEnvVar } from './getEnvVar'

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

exports.handler = AWSLambda.wrapHandler(runTraders)
