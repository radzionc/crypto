import { memoize } from '@lib/utils/memoize'
import { Alchemy, Network } from 'alchemy-sdk'

type Input = {
  network: Network
  apiKey: string
}

export const getAlchemyClient = memoize(
  ({ network, apiKey }: Input) => new Alchemy({ apiKey, network }),
  ({ network, apiKey }) => `${network}-${apiKey}`,
)
