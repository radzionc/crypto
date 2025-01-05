import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'

export const { provider: ChainIdProvider, useState: useChainId } =
  getStateProviderSetup<number>('chainId')
