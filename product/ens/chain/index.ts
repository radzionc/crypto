import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { sepolia, mainnet } from 'viem/chains'

export const chains = [sepolia, mainnet] as const

export const chainIds = chains.map((c) => c.id)

export type ChainId = (typeof chainIds)[number]

export const getChain = (chainId: number) =>
  shouldBePresent(findBy(chains, 'id', chainId))
