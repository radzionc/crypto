import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'

import { ChainId } from '../core/chains'

export const { provider: SourceChainIdProvider, useState: useSourceChainId } =
  getStateProviderSetup<ChainId>('sourceChainId')
