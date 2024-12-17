import { AWSLambda } from '@sentry/serverless'
import { getEnvVar } from './getEnvVar'

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

exports.handler = AWSLambda.wrapHandler(() => {
  console.log('running handler')
})
