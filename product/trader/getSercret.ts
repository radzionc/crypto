import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { memoizeAsync } from '@lib/utils/memoizeAsync'
import { assertField } from '@lib/utils/record/assertField'

import { getEnvVar } from './getEnvVar'

type SecretName = 'accountPrivateKey' | 'zeroXApiKey' | 'telegramBotToken'

const getSecrets = memoizeAsync(async () => {
  const client = new SecretsManagerClient({})
  const command = new GetSecretValueCommand({ SecretId: getEnvVar('SECRETS') })
  const { SecretString } = await client.send(command)

  return shouldBePresent(SecretString)
})

export const getSecret = async <T = string>(name: SecretName): Promise<T> => {
  const secrets = await getSecrets()

  return assertField(JSON.parse(secrets), name)
}
