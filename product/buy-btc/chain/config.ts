import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { mainnet, bsc, avalanche } from 'viem/chains'

export const chains = [mainnet, bsc, avalanche] as const

export type ChainId = (typeof chains)[number]['id']

export const getChain = (chainId: number) =>
  shouldBePresent(findBy(chains, 'id', chainId))

export const thorChainIds = ['ETH', 'BSC', 'AVAX'] as const

export type ThorChainId = (typeof thorChainIds)[number]

export const thorChainRecord: Record<ThorChainId, ChainId> = {
  ETH: mainnet.id,
  BSC: bsc.id,
  AVAX: avalanche.id,
}

type AssetInfo = {
  decimals: number
  symbol: string
  name: string
}

export const btc: AssetInfo = {
  decimals: 8,
  symbol: 'BTC',
  name: 'Bitcoin',
}
