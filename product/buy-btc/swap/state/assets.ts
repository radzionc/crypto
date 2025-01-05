import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { Asset } from '../../chain/Asset'

export const { provider: AssetsProvider, useState: useAssets } =
  getStateProviderSetup<Asset[]>('assets')
