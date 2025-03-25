import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { mainnet, bsc, avalanche, base } from 'viem/chains'

export const chains = [mainnet, bsc, avalanche, base] as const

export type ChainId = (typeof chains)[number]['id']

export const getChain = (chainId: number) =>
  shouldBePresent(findBy(chains, 'id', chainId))
