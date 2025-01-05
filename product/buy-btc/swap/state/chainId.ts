import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'

export const { provider: ChainIdProvider, useState: useChainIdState } =
  getStateProviderSetup<number>('chainId')
