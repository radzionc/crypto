import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { mainnet, bsc, avalanche } from 'viem/chains'

export const chains = [mainnet, bsc, avalanche] as const

export const getChain = (chainId: number) =>
  shouldBePresent(findBy(chains, 'id', chainId))
