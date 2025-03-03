import { mainnet, bsc, avalanche } from 'viem/chains'

import { ChainId } from './chains'

export const thorChainIds = ['ETH', 'BSC', 'AVAX'] as const

export type ThorChainId = (typeof thorChainIds)[number]

export const thorChainRecord: Record<ThorChainId, ChainId> = {
  ETH: mainnet.id,
  BSC: bsc.id,
  AVAX: avalanche.id,
}
