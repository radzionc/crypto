import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { ChainId } from '../../chain/config'

export const { provider: SourceChainIdProvider, useState: useSourceChainId } =
  getStateProviderSetup<ChainId>('sourceChainId')
